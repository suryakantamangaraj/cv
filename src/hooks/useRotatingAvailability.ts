import { useEffect, useState } from "react";
import { AVAILABILITY, type AvailabilityState } from "../lib/availability";

export function useRotatingAvailability(intervalMs = 3500): AvailabilityState {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % AVAILABILITY.length), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return AVAILABILITY[i];
}
