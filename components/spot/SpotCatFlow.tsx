"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { cn } from "@/lib/cn";
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

interface PhotoState {
  file: File | null;
  previewUrl: string | null;
}

type LocationStatus = "idle" | "requesting" | "granted" | "denied" | "unavailable";

interface LocationState {
  status: LocationStatus;
  coords: { latitude: number; longitude: number } | null;
}

interface MockMatch {
  id: string;
  name: string;
  area: string;
  lastSeen: string;
}

// Same placeholder spirit as NearbyCatsPreview's PLACEHOLDER_CATS — swapped
// for real nearby-cat lookups once matching lands.
const MOCK_MATCHES: MockMatch[] = [
  { id: "marmalade", name: "Marmalade", area: "Elm Street Park", lastSeen: "Seen 2 hours ago" },
  { id: "smokey", name: "Smokey", area: "Riverside Lane", lastSeen: "Seen this morning" },
  { id: "patches", name: "Patches", area: "Old Mill Court", lastSeen: "Seen yesterday" },
];

const NONE_OF_THESE = "none" as const;

interface TagOption {
  emoji: string;
  label: string;
}

// Describes this sighting, not the cat's long-term personality.
const TAG_OPTIONS: TagOption[] = [
  { emoji: "🍽️", label: "Eating" },
  { emoji: "😴", label: "Sleeping" },
  { emoji: "🐾", label: "With kittens" },
  { emoji: "🆘", label: "Needs help" },
  { emoji: "🤕", label: "Looks injured" },
];

interface SightingDetails {
  nickname: string;
  note: string;
  tags: string[];
}

const INITIAL_PHOTO: PhotoState = { file: null, previewUrl: null };
const INITIAL_LOCATION: LocationState = { status: "idle", coords: null };
const INITIAL_DETAILS: SightingDetails = { nickname: "", note: "", tags: [] };

export function SpotCatFlow() {
  const [stage, setStage] = useState<Stage>("photo");
  const [photo, setPhoto] = useState<PhotoState>(INITIAL_PHOTO);
  const [location, setLocation] = useState<LocationState>(INITIAL_LOCATION);
  const [matchesPhase, setMatchesPhase] = useState<"checking" | "results">("checking");
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [details, setDetails] = useState<SightingDetails>(INITIAL_DETAILS);

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

  // Mimics the shape of the future real lookup (location/image matching
  // takes time) without making any request. The "checking" -> "results"
  // reset itself happens in goNext (a user event, not an effect body) so
  // this effect only ever schedules the timer that resolves it.
  useEffect(() => {
    if (stage !== "matches" || matchesPhase !== "checking") return;
    const timer = setTimeout(() => setMatchesPhase("results"), 900);
    return () => clearTimeout(timer);
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

  function toggleTag(tag: string) {
    setDetails((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  }

  function handleReset() {
    if (photo.previewUrl) URL.revokeObjectURL(photo.previewUrl);
    setPhoto(INITIAL_PHOTO);
    setLocation(INITIAL_LOCATION);
    setSelectedMatchId(null);
    setDetails(INITIAL_DETAILS);
    setStage("photo");
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
            shadow="soft"
            className="mt-5 flex flex-col items-center gap-3 border border-dashed border-secondary-sage/40 text-center"
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

        <Card
          padding="lg"
          shadow="soft"
          className="mt-5 flex flex-col items-center gap-3 text-center"
        >
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
              {MOCK_MATCHES.map((match) => (
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
                      shadow="soft"
                      className="flex items-center gap-3 border-2 border-transparent peer-checked:border-primary-orange peer-focus-visible:ring-2 peer-focus-visible:ring-text-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-cream"
                    >
                      <Avatar name={match.name} size="lg" />
                      <div>
                        <p className="text-md font-semibold text-text-primary">{match.name}</p>
                        <p className="text-sm text-text-secondary">
                          {match.area} · {match.lastSeen}
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
                  <Card
                    padding="md"
                    shadow="soft"
                    className="flex items-center gap-3 border-2 border-dashed border-secondary-sage/40 peer-checked:border-solid peer-checked:border-primary-orange peer-focus-visible:ring-2 peer-focus-visible:ring-text-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-cream"
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
            : `${MOCK_MATCHES.length} nearby cats found`}
        </p>
      </div>
    );
  }

  function renderDetailsStep() {
    const isNewCat = selectedMatchId === NONE_OF_THESE;

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
                onChange={(event) =>
                  setDetails((prev) => ({ ...prev, nickname: event.target.value }))
                }
                placeholder="e.g. Marmalade"
                className="mt-1 w-full rounded-md border border-secondary-sage/40 bg-bg-surface px-3 py-2 text-md text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary"
              />
            </div>
          )}

          <fieldset>
            <legend className="text-sm font-semibold text-text-primary">
              What&apos;s happening (optional)
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {TAG_OPTIONS.map((tag) => (
                <Chip
                  key={tag.label}
                  emoji={tag.emoji}
                  label={tag.label}
                  selected={details.tags.includes(tag.label)}
                  onClick={() => toggleTag(tag.label)}
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
              onChange={(event) => setDetails((prev) => ({ ...prev, note: event.target.value }))}
              placeholder="Anything else worth mentioning?"
              className="mt-1 w-full rounded-md border border-secondary-sage/40 bg-bg-surface px-3 py-2 text-md text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary"
            />
          </div>
        </div>
      </div>
    );
  }

  function renderConfirmationStep() {
    const matchedCat = MOCK_MATCHES.find((match) => match.id === selectedMatchId);
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
          <p className="text-md font-semibold text-text-primary">
            Logged a sighting of {confirmedName}
          </p>
          <p className="text-sm text-text-secondary">
            Nice spotting! We&apos;ll start matching this up with neighborhood cats once Cat
            Passport goes live in your area.
          </p>
        </Card>

        <div className="mt-6">
          <Button fullWidth onClick={handleReset}>
            Log another sighting
          </Button>
        </div>
      </div>
    );
  }

  const canContinue =
    stage === "photo"
      ? photo.file !== null
      : stage === "location"
        ? location.status === "granted" ||
          location.status === "denied" ||
          location.status === "unavailable"
        : stage === "matches"
          ? matchesPhase === "results" && selectedMatchId !== null
          : stage === "details";

  const continueLabel =
    stage === "location" && location.status !== "granted" ? "Continue without location" : "Continue";

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
            <Button variant="secondary" onClick={goBack} className="flex-none">
              Back
            </Button>
          )}
          <Button onClick={goNext} disabled={!canContinue} className="flex-1">
            {continueLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
