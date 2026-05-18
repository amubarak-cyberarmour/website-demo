"use client";

import { useEffect } from "react";

export function BackForwardRestoreFix() {
  useEffect(() => {
    const RELOAD_GUARD_KEY = "ca_bf_reload_guard";

    const shouldForceReload = (persisted: boolean) => {
      const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const isBackForward = persisted || navEntry?.type === "back_forward";
      if (!isBackForward) return false;

      // Prevent reload loops if browser reports back_forward more than once.
      if (sessionStorage.getItem(RELOAD_GUARD_KEY) === "1") {
        sessionStorage.removeItem(RELOAD_GUARD_KEY);
        return false;
      }

      sessionStorage.setItem(RELOAD_GUARD_KEY, "1");
      return true;
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (shouldForceReload(event.persisted)) window.location.reload();
    };

    // Handle the case where pageshow fired before this component mounted.
    if (shouldForceReload(false)) window.location.reload();

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
