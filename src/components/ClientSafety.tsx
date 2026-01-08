"use client";
import { useEffect } from "react";

export default function ClientSafety() {
  useEffect(() => {
    function handleError(e: any) {
      try {
        // Try to read likely clues from the event
        const msg = e?.message || e?.reason?.message || e?.error?.message || "";
        if (typeof msg === "string" && (msg.includes("This script should only be loaded in a browser extension") || msg.includes("give-freely") || msg.includes("GF_"))) {
          // Suppress third-party extension errors that can break the SPA
          console.warn("Suppressed third-party extension error:", msg);
          e.preventDefault && e.preventDefault();
          return;
        }
      } catch (err) {
        // noop
      }
      // leave other errors to surface
    }

    window.addEventListener("error", handleError as EventListener);
    window.addEventListener("unhandledrejection", handleError as EventListener);

    return () => {
      window.removeEventListener("error", handleError as EventListener);
      window.removeEventListener("unhandledrejection", handleError as EventListener);
    };
  }, []);

  return null;
}
