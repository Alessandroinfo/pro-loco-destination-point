"use client";

import { useEffect } from "react";

import { withBasePath } from "@/lib/site";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const hostname = window.location.hostname;
    const isLocalEnvironment =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]" ||
      hostname.endsWith(".local");

    if (process.env.NODE_ENV !== "production" || isLocalEnvironment) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });

      if ("caches" in window) {
        caches.keys().then((keys) => {
          keys.forEach((key) => {
            caches.delete(key);
          });
        });
      }

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
