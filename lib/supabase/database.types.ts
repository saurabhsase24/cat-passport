// Hand-written to mirror supabase/migrations/*.sql. No Supabase CLI or
// Docker was available in this environment to run
// `supabase gen types typescript --linked` against the linked project
// (ref: aybheyrlowjscgvxzkbp), so these are maintained by hand for now.
// Regenerating via the CLI once that's reachable is a drop-in replacement
// for this file and should be preferred going forward — keep it in sync
// with the migrations directory until then.
//
// Scoped to the tables this sprint actually touches (profiles, cats,
// sightings, sighting_photos, sighting_tags). storage.objects is untyped
// here — the Storage client's .upload()/.getPublicUrl() calls don't need it.
//
// Relationships are filled in (not left as []) because postgrest-js uses
// them to type nested embedded selects like `.select("cats(nickname)")` —
// leaving them empty would silently fall back to untyped results for every
// embed used in this sprint's queries.

export type CatStatus = "active" | "archived";

export type SightingTagValue =
  | "eating"
  | "sleeping"
  | "with_kittens"
  | "needs_help"
  | "looks_injured";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_path: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_path?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      cats: {
        Row: {
          id: string;
          nickname: string | null;
          description: string | null;
          primary_photo_path: string | null;
          status: CatStatus;
          created_by: string;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          nickname?: string | null;
          description?: string | null;
          primary_photo_path?: string | null;
          status?: CatStatus;
          created_by: string;
        };
        Update: Partial<Database["public"]["Tables"]["cats"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "cats_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      sightings: {
        Row: {
          id: string;
          cat_id: string;
          reported_by: string;
          // geography(Point,4326). Not selected back anywhere in this
          // sprint, so its read shape (GeoJSON vs WKB, depending on
          // PostgREST config) is left loose rather than guessed at.
          location: string | null;
          area_name: string | null;
          note: string | null;
          observed_at: string;
          created_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          cat_id: string;
          reported_by: string;
          // Written as WKT ("POINT(lng lat)"); PostGIS's geography input
          // function parses the literal on the way in.
          location?: string | null;
          area_name?: string | null;
          note?: string | null;
          observed_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["sightings"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "sightings_cat_id_fkey";
            columns: ["cat_id"];
            isOneToOne: false;
            referencedRelation: "cats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sightings_reported_by_fkey";
            columns: ["reported_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      sighting_photos: {
        Row: {
          id: string;
          sighting_id: string;
          storage_path: string;
          uploaded_by: string;
          is_primary: boolean;
          created_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          sighting_id: string;
          storage_path: string;
          uploaded_by: string;
          is_primary?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["sighting_photos"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "sighting_photos_sighting_id_fkey";
            columns: ["sighting_id"];
            isOneToOne: false;
            referencedRelation: "sightings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sighting_photos_uploaded_by_fkey";
            columns: ["uploaded_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      sighting_tags: {
        Row: {
          sighting_id: string;
          tag: SightingTagValue;
        };
        Insert: {
          sighting_id: string;
          tag: SightingTagValue;
        };
        Update: Partial<Database["public"]["Tables"]["sighting_tags"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "sighting_tags_sighting_id_fkey";
            columns: ["sighting_id"];
            isOneToOne: false;
            referencedRelation: "sightings";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
