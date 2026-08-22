"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { cn } from "@/lib/cn";
import { createClient } from "@/lib/supabase/client";
import type { SightingTagValue } from "@/lib/supabase/database.types";
import { formatRelativeTime } from "@/lib/relativeTime";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Chip } from "@/components/ui/Chip";
import { StepProgress } from "@/components/spot/StepProgress";

type Stage = "photo" | "location" | "matches" | "details" | "confirmation";

const STAGES: Stage[] = ["photo", "location", "matches", "details", "confirmation"];

const STAGE_LABELS: Record<Stage, string> = {
  photo: "Photo",
  location: "Location",
  matches: "Matches",
  details: "Details",
  confirmation: "Confirmation",
};

const SIGHTING_PHOTOS_BUCKET = "cat-sightings";
const CANDIDATE_MATCH_LIMIT = 5;

interface PhotoState {
  file: File | null;
  previewUrl: string | null;
}

type LocationStatus = "idle" | "requesting" | "granted" | "denied" | "unavailable";

interface LocationState {
  status: LocationStatus;
  coords: { latitude: number; longitude: number } | null;
}

interface CatMatch {
  id: string;
  name: string;
  area: string | null;
  lastSeen: string;
}

// Shape of the candidate-matches query below. The hand-written Database type
// has no Relationships metadata for Supabase-js to infer this from, so it's
// asserted explicitly instead of relying on inference.
interface CatMatchRow {
  id: string;
  nickname: string | null;
  sightings: { area_name: string | null; observed_at: string }[];
}

// No AI/image matching yet (out of scope this sprint) — this is a plain
// "recently added cats" list standing in for real matching, so someone has
// a real cat_id to select against rather than a hardcoded mock. Reads don't
// need auth: cats/sightings are publicly SELECT-able for active cats.
async function loadCandidateMatches(): Promise<CatMatch[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("cats")
      .select("id, nickname, sightings ( area_name, observed_at )")
      .order("observed_at", { referencedTable: "sightings", ascending: false })
      .limit(1, { referencedTable: "sightings" })
      .order("created_at", { ascending: false })
      .limit(CANDIDATE_MATCH_LIMIT)
      .overrideTypes<CatMatchRow[], { merge: false }>();

    if (error) {
      console.error("Failed to load candidate cats:", error.message);
      return [];
    }

    return (data ?? []).map((cat) => {
      const latest = cat.sightings[0];
      return {
        id: cat.id,
        name: cat.nickname?.trim() || "Unnamed cat",
        area: latest?.area_name ?? null,
        lastSeen: latest ? formatRelativeTime(latest.observed_at) : "No sightings yet",
      };
    });
  } catch (err) {
    console.error("Failed to load candidate cats:", err);
    return [];
  }
}

const NONE_OF_THESE = "none" as const;

interface TagOption {
  emoji: string;
  label: string;
  value: SightingTagValue;
}

// Describes this sighting, not the cat's long-term personality. Values match
// the public.sighting_tag enum (supabase/migrations/20260801000006_sighting_tags.sql).
const TAG_OPTIONS: TagOption[] = [
  { emoji: "🍽️", label: "Eating", value: "eating" },
  { emoji: "😴", label: "Sleeping", value: "sleeping" },
  { emoji: "🐾", label: "With kittens", value: "with_kittens" },
  { emoji: "🆘", label: "Needs help", value: "needs_help" },
  { emoji: "🤕", label: "Looks injured", value: "looks_injured" },
];

interface SightingDetails {
  nickname: string;
  note: string;
  tags: SightingTagValue[];
}

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string };

const INITIAL_PHOTO: PhotoState = { file: null, previewUrl: null };
const INITIAL_LOCATION: LocationState = { status: "idle", coords: null };
const INITIAL_DETAILS: SightingDetails = { nickname: "", note: "", tags: [] };
const INITIAL_SUBMISSION: SubmissionState = { status: "idle" };

// Shared boundary for the flow's text entry fields. border-strong rather than
// border-soft because a field the user can focus and type into is a control
// boundary, not a divider (design system §5).
const FIELD_CLASSES =
  "mt-1 w-full rounded-md border border-border-strong bg-bg-surface px-3 py-2 text-md text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary";

// Selection styling for the radio-backed match cards. Card supplies the
// unselected boundary (1px border-soft); selecting one thickens it to 2px and
// switches it to orange-strong, so the state differs in width as well as
// colour and is never signalled by hue alone (brief §24). The peer-checked
// utilities generate `.peer:checked ~ .peer-checked\:x`, which outranks
// Card's plain `.border` on specificity — so this resolves deterministically
// and does not depend on cn()'s class-string order.
const MATCH_CARD_CLASSES =
  "peer-checked:border-2 peer-checked:border-primary-orange-strong peer-focus-visible:ring-2 peer-focus-visible:ring-text-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-cream";

export function SpotCatFlow() {
  const [stage, setStage] = useState<Stage>("photo");
  const [photo, setPhoto] = useState<PhotoState>(INITIAL_PHOTO);
  const [location, setLocation] = useState<LocationState>(INITIAL_LOCATION);
  const [matchesPhase, setMatchesPhase] = useState<"checking" | "results">("checking");
  const [matches, setMatches] = useState<CatMatch[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [details, setDetails] = useState<SightingDetails>(INITIAL_DETAILS);
  const [submission, setSubmission] = useState<SubmissionState>(INITIAL_SUBMISSION);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the new stage's heading so keyboard/screen reader users
  // land somewhere meaningful instead of wherever focus was previously.
  useEffect(() => {
    headingRef.current?.focus();
  }, [stage]);

  // Revoke the previous blob URL whenever it's replaced or the component unmounts.
  useEffect(() => {
    return () => {
      if (photo.previewUrl) URL.revokeObjectURL(photo.previewUrl);
    };
  }, [photo.previewUrl]);

  // Real query now, not a timer. The "checking" -> "results" reset itself
  // happens in goNext (a user event, not an effect body), so this effect
  // only ever runs the fetch that resolves it — same shape as before, real
  // data instead of a fixed delay.
  useEffect(() => {
    if (stage !== "matches" || matchesPhase !== "checking") return;
    let cancelled = false;

    loadCandidateMatches().then((results) => {
      if (cancelled) return;
      setMatches(results);
      setMatchesPhase("results");
    });

    return () => {
      cancelled = true;
    };
  }, [stage, matchesPhase]);

  function goNext() {
    const next = STAGES[STAGES.indexOf(stage) + 1];
    if (!next) return;
    if (next === "matches") setMatchesPhase("checking");
    setStage(next);
  }

  function goBack() {
    const prev = STAGES[STAGES.indexOf(stage) - 1];
    if (prev) setStage(prev);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhoto((prev) => {
      if (prev.previewUrl) URL.revokeObjectURL(prev.previewUrl);
      return { file, previewUrl: URL.createObjectURL(file) };
    });
  }

  function handleRequestLocation() {
    if (!("geolocation" in navigator)) {
      setLocation({ status: "unavailable", coords: null });
      return;
    }
    setLocation({ status: "requesting", coords: null });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          status: "granted",
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      () => {
        setLocation({ status: "denied", coords: null });
      }
    );
  }

  function toggleTag(value: SightingTagValue) {
    setDetails((prev) => ({
      ...prev,
      tags: prev.tags.includes(value)
        ? prev.tags.filter((t) => t !== value)
        : [...prev.tags, value],
    }));
  }

  function handleReset() {
    if (photo.previewUrl) URL.revokeObjectURL(photo.previewUrl);
    setPhoto(INITIAL_PHOTO);
    setLocation(INITIAL_LOCATION);
    setMatches([]);
    setSelectedMatchId(null);
    setDetails(INITIAL_DETAILS);
    setSubmission(INITIAL_SUBMISSION);
    setStage("photo");
  }

  // The real write. Only ever called from the Details step's Continue
  // button. Nothing here advances the stage until Supabase has actually
  // confirmed every insert — the Confirmation step's success copy is only
  // ever reachable through this function returning cleanly.
  async function handleSubmit() {
    if (!photo.file) return;
    setSubmission({ status: "submitting" });

    try {
      const supabase = createClient();

      // Anonymous identity, created only now — tied to this exact gesture
      // (the user's first real contribution) rather than passively on page
      // load. See lib/supabase/proxy.ts for why this moment was reserved.
      const {
        data: { user: existingUser },
      } = await supabase.auth.getUser();

      let user = existingUser;
      if (!user) {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
        user = data.user;
      }
      if (!user) throw new Error("Could not start a session. Please try again.");

      // Upload into the uploader's own folder — required by the storage RLS
      // policy: (storage.foldername(name))[1] = auth.uid().
      const fileExt = photo.file.name.split(".").pop()?.toLowerCase() || "jpg";
      const storagePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from(SIGHTING_PHOTOS_BUCKET)
        .upload(storagePath, photo.file);
      if (uploadError) throw uploadError;

      // Resolve which cat this sighting belongs to.
      let catId: string;
      if (selectedMatchId && selectedMatchId !== NONE_OF_THESE) {
        catId = selectedMatchId;
      } else {
        const { data: newCat, error: catError } = await supabase
          .from("cats")
          .insert({
            nickname: details.nickname.trim() || null,
            primary_photo_path: storagePath,
            created_by: user.id,
          })
          .select("id")
          .single();
        if (catError) throw catError;
        catId = newCat.id;
      }

      // WKT text — PostGIS's geography input function parses this literal
      // on the way in. Order is POINT(longitude latitude), not lat/lng.
      const locationValue =
        location.status === "granted" && location.coords
          ? `POINT(${location.coords.longitude} ${location.coords.latitude})`
          : null;

      const { data: sighting, error: sightingError } = await supabase
        .from("sightings")
        .insert({
          cat_id: catId,
          reported_by: user.id,
          location: locationValue,
          note: details.note.trim() || null,
        })
        .select("id")
        .single();
      if (sightingError) throw sightingError;

      const { error: photoRowError } = await supabase.from("sighting_photos").insert({
        sighting_id: sighting.id,
        storage_path: storagePath,
        uploaded_by: user.id,
        is_primary: true,
      });
      if (photoRowError) throw photoRowError;

      if (details.tags.length > 0) {
        const { error: tagsError } = await supabase
          .from("sighting_tags")
          .insert(details.tags.map((tag) => ({ sighting_id: sighting.id, tag })));
        if (tagsError) throw tagsError;
      }

      setSubmission({ status: "idle" });
      setStage("confirmation");
    } catch (err) {
      setSubmission({
        status: "error",
        message:
          err instanceof Error && err.message
            ? err.message
            : "Something went wrong saving this sighting. Please try again.",
      });
    }
  }

  function renderPhotoStep() {
    return (
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-lg font-bold text-text-primary outline-none"
        >
          Add a photo
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          A clear shot of the cat helps us find a match nearby.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={handleFileChange}
        />

        {photo.previewUrl ? (
          <div className="mt-5 flex flex-col items-center gap-4">
            <img
              src={photo.previewUrl}
              alt="Selected cat photo"
              className="h-56 w-full max-w-xs rounded-md object-cover shadow-raised"
            />
            <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
              Retake photo
            </Button>
          </div>
        ) : (
          <Card
            padding="lg"
            className="mt-5 flex flex-col items-center gap-3 border-dashed text-center"
          >
            <span aria-hidden="true" className="text-4xl">
              📸
            </span>
            <Button onClick={() => fileInputRef.current?.click()}>Take or choose a photo</Button>
          </Card>
        )}
      </div>
    );
  }

  function renderLocationStep() {
    return (
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-lg font-bold text-text-primary outline-none"
        >
          Confirm your location
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          We use this to find cats nearby — it&apos;s only shared for this sighting.
        </p>

        <Card padding="lg" className="mt-5 flex flex-col items-center gap-3 text-center">
          <span aria-hidden="true" className="text-4xl">
            📍
          </span>

          {location.status === "granted" && location.coords ? (
            <p className="text-sm text-text-primary">
              Location confirmed ({location.coords.latitude.toFixed(3)},{" "}
              {location.coords.longitude.toFixed(3)})
            </p>
          ) : (
            <Button onClick={handleRequestLocation} disabled={location.status === "requesting"}>
              {location.status === "requesting" ? "Requesting…" : "Share my location"}
            </Button>
          )}

          {(location.status === "denied" || location.status === "unavailable") && (
            <p className="text-sm text-text-secondary">
              {location.status === "denied"
                ? "Location permission was denied — you can still continue."
                : "Location isn't available on this device — you can still continue."}
            </p>
          )}

          <p aria-live="polite" className="sr-only">
            {location.status === "requesting" && "Requesting your location…"}
            {location.status === "granted" && "Location confirmed."}
            {location.status === "denied" && "Location permission denied."}
            {location.status === "unavailable" && "Location unavailable."}
          </p>
        </Card>
      </div>
    );
  }

  function renderMatchesStep() {
    return (
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-lg font-bold text-text-primary outline-none"
        >
          Nearby matches
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Is this the cat you spotted?
        </p>

        {matchesPhase === "checking" ? (
          <div className="mt-5 flex flex-col items-center gap-3 py-6 text-center">
            <span aria-hidden="true" className="animate-pulse text-4xl">
              🔍
            </span>
            <p className="text-sm text-text-secondary">Checking nearby passports…</p>
          </div>
        ) : (
          <fieldset className="mt-5">
            <legend className="sr-only">Choose a matching cat</legend>
            <ul className="flex flex-col gap-3">
              {matches.map((match) => (
                <li key={match.id}>
                  <label className="block cursor-pointer">
                    <input
                      type="radio"
                      name="match"
                      value={match.id}
                      checked={selectedMatchId === match.id}
                      onChange={() => setSelectedMatchId(match.id)}
                      className="peer sr-only"
                    />
                    <Card
                      padding="md"
                      className={cn("flex items-center gap-3", MATCH_CARD_CLASSES)}
                    >
                      <Avatar name={match.name} size="lg" />
                      <div>
                        <p className="text-md font-semibold text-text-primary">{match.name}</p>
                        <p className="text-sm text-text-secondary">
                          {match.area ? `${match.area} · ${match.lastSeen}` : match.lastSeen}
                        </p>
                      </div>
                    </Card>
                  </label>
                </li>
              ))}
              <li>
                <label className="block cursor-pointer">
                  <input
                    type="radio"
                    name="match"
                    value={NONE_OF_THESE}
                    checked={selectedMatchId === NONE_OF_THESE}
                    onChange={() => setSelectedMatchId(NONE_OF_THESE)}
                    className="peer sr-only"
                  />
                  {/* Keeps its own dashed -> solid shift on top of the shared
                      width/colour change, so the "new cat" option stays
                      distinguishable from the matches above it. */}
                  <Card
                    padding="md"
                    className={cn(
                      "flex items-center gap-3 border-dashed peer-checked:border-solid",
                      MATCH_CARD_CLASSES
                    )}
                  >
                    <span aria-hidden="true" className="text-2xl">
                      🐾
                    </span>
                    <p className="text-md font-semibold text-text-primary">
                      None of these — new cat
                    </p>
                  </Card>
                </label>
              </li>
            </ul>
          </fieldset>
        )}

        <p aria-live="polite" className="sr-only">
          {matchesPhase === "checking"
            ? "Checking nearby passports…"
            : `${matches.length} nearby cats found`}
        </p>
      </div>
    );
  }

  function renderDetailsStep() {
    const isNewCat = selectedMatchId === NONE_OF_THESE;
    const isSubmitting = submission.status === "submitting";

    return (
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-lg font-bold text-text-primary outline-none"
        >
          Add sighting details
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Optional — keep it quick if you&apos;re still outside.
        </p>

        <div className="mt-5 flex flex-col gap-5">
          {isNewCat && (
            <div>
              <label htmlFor="nickname" className="block text-sm font-semibold text-text-primary">
                Nickname (optional)
              </label>
              <input
                id="nickname"
                type="text"
                value={details.nickname}
                disabled={isSubmitting}
                onChange={(event) =>
                  setDetails((prev) => ({ ...prev, nickname: event.target.value }))
                }
                placeholder="e.g. Marmalade"
                className={FIELD_CLASSES}
              />
            </div>
          )}

          <fieldset disabled={isSubmitting}>
            <legend className="text-sm font-semibold text-text-primary">
              What&apos;s happening (optional)
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {TAG_OPTIONS.map((tag) => (
                <Chip
                  key={tag.value}
                  emoji={tag.emoji}
                  label={tag.label}
                  selected={details.tags.includes(tag.value)}
                  onClick={() => toggleTag(tag.value)}
                />
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="note" className="block text-sm font-semibold text-text-primary">
              Note (optional)
            </label>
            <textarea
              id="note"
              rows={3}
              value={details.note}
              disabled={isSubmitting}
              onChange={(event) => setDetails((prev) => ({ ...prev, note: event.target.value }))}
              placeholder="Anything else worth mentioning?"
              className={FIELD_CLASSES}
            />
          </div>

          {submission.status === "error" && (
            <p role="alert" className="text-sm font-medium text-primary-orange-strong">
              {submission.message}
            </p>
          )}
        </div>
      </div>
    );
  }

  function renderConfirmationStep() {
    const matchedCat = matches.find((match) => match.id === selectedMatchId);
    const confirmedName =
      selectedMatchId === NONE_OF_THESE
        ? details.nickname.trim() || "your new cat"
        : (matchedCat?.name ?? "this cat");

    return (
      <div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-lg font-bold text-text-primary outline-none"
        >
          You&apos;re all set
        </h2>

        <Card
          padding="lg"
          shadow="raised"
          className="mt-5 flex flex-col items-center gap-3 text-center"
        >
          <span aria-hidden="true" className="text-4xl">
            🎉
          </span>
          {photo.previewUrl && (
            <img
              src={photo.previewUrl}
              alt="Selected cat photo"
              className="h-40 w-40 rounded-md object-cover shadow-soft"
            />
          )}
          {/* Only ever rendered after handleSubmit has resolved every insert
              successfully — see the comment above that function. */}
          <p className="text-md font-semibold text-text-primary">
            You spotted {confirmedName}
          </p>
          <p className="text-sm text-text-secondary">
            Saved to their Passport — thanks for keeping the neighborhood log up to date.
          </p>
        </Card>

        <div className="mt-6">
          <Button fullWidth onClick={handleReset}>
            Spot another cat
          </Button>
        </div>
      </div>
    );
  }

  const isSubmitting = submission.status === "submitting";

  const canContinue =
    stage === "photo"
      ? photo.file !== null
      : stage === "location"
        ? location.status === "granted" ||
          location.status === "denied" ||
          location.status === "unavailable"
        : stage === "matches"
          ? matchesPhase === "results" && selectedMatchId !== null
          : stage === "details"
            ? !isSubmitting
            : true;

  const continueLabel =
    stage === "details" && isSubmitting
      ? "Saving…"
      : stage === "location" && location.status !== "granted"
        ? "Continue without location"
        : "Continue";

  return (
    <div className={cn("mt-6")}>
      {stage !== "confirmation" && (
        <StepProgress
          className="mb-6"
          stages={STAGES.filter((s) => s !== "confirmation").map((s) => STAGE_LABELS[s])}
          currentIndex={STAGES.indexOf(stage)}
        />
      )}

      {stage === "photo" && renderPhotoStep()}
      {stage === "location" && renderLocationStep()}
      {stage === "matches" && renderMatchesStep()}
      {stage === "details" && renderDetailsStep()}
      {stage === "confirmation" && renderConfirmationStep()}

      {stage !== "confirmation" && (
        <div className="mt-8 flex items-center gap-3">
          {stage !== "photo" && (
            <Button
              variant="secondary"
              onClick={goBack}
              disabled={isSubmitting}
              className="flex-none"
            >
              Back
            </Button>
          )}
          <Button
            onClick={stage === "details" ? handleSubmit : goNext}
            disabled={!canContinue}
            className="flex-1"
          >
            {continueLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
