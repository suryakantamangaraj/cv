// Single source of truth for availability across the site.
// Cycles through statuses automatically to give the UI a "live" feel.

export type AvailabilityKey = "projects" | "openSource" | "startup" | "expert";

export interface AvailabilityState {
  key: AvailabilityKey;
  label: string;
  available: boolean;
  note: string;
}

export const AVAILABILITY: AvailabilityState[] = [
  { key: "startup",    label: "Startup Partner",    available: true,  note: "Open to co-founding & advisory roles" },
  { key: "openSource", label: "Open Source Collab", available: true,  note: "Actively contributing & reviewing PRs" },
  { key: "projects",   label: "New Projects",       available: false, note: "Calendar full — back from Q3" },
  { key: "expert",     label: "Hire as Expert",     available: true,  note: "Limited consulting slots open" },
];
