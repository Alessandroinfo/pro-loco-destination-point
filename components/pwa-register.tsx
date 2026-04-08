"use client";

import { useEffect } from "react";

import { withBasePath } from "@/lib/site";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    let didReloadForUpdate = false;

    const reloadOnControllerChange = () => {
      if (didReloadForUpdate) {
        return;
      }

      didReloadForUpdate = true;
      window.location.reload();
    };

    if (process.env.NODE_ENV !== "production") {
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

    navigator.serviceWorker.addEventListener("controllerchange", reloadOnControllerChange);

    const activateWaitingWorker = (registration: ServiceWorkerRegistration) => {
      if (!registration.waiting || !navigator.serviceWorker.controller) {
        return;
      }

      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    };

    navigator.serviceWorker.register(withBasePath("/sw.js"), {
      scope: withBasePath("/"),
      // Prevent the browser from caching sw.js via HTTP cache so updates
      // are always detected on the next navigation (important on iOS Safari).
      updateViaCache: "none"
    }).then((registration) => {
      activateWaitingWorker(registration);

      registration.addEventListener("updatefound", () => {
        const installingWorker = registration.installing;

        if (!installingWorker) {
          return;
        }

        installingWorker.addEventListener("statechange", () => {
          if (installingWorker.state === "installed") {
            activateWaitingWorker(registration);
          }
        });
      });

      registration.update().catch(() => {
        // Ignore manual update failures; the SW remains optional.
      });
    }).catch(() => {
      // Registration failure should not block the kiosk experience.
    });

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", reloadOnControllerChange);
    };
  }, []);

  return null;
}
