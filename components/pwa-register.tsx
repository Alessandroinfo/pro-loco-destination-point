"use client";

import { useEffect } from "react";

import { withBasePath } from "@/lib/site";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
      return;
    }

    navigator.serviceWorker.register(withBasePath("/sw.js"), {
      scope: withBasePath("/")
    }).catch(() => {
      // Registration failure should not block the kiosk experience.
    });
  }, []);

  return null;
}
