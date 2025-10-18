import { useEffect } from "react";
import { useLocation } from "react-router";

export default function HypothesisLoader() {
  const location = useLocation();

  useEffect(() => {
    // Canonical link for Hypothesis context
    const canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", window.location.origin + location.pathname);
    canonical.setAttribute("data-hypothesis", "true");
    document.head.appendChild(canonical);

    // Inject Hypothesis Config BEFORE the script
    const configScript = document.createElement("script");
    configScript.setAttribute("type", "application/json");
    configScript.className = "js-hypothesis-config";
    configScript.setAttribute("data-hypothesis", "true");
    configScript.textContent = JSON.stringify({
      // openSidebar: false,
      // showHighlights: true,
      // theme: "clean",
      branding: {
        appBackgroundColor: "#bff5d0",
        ctaTextColor: "#bff5d0",
        ctaBackgroundColor: "#1e7a45",
      },
      // group: "1Dxp6Eb8", // for specific group
    });
    document.head.appendChild(configScript);

    // Load Hypothesis embed script
    const script = document.createElement("script");
    script.src = "https://hypothes.is/embed.js";
    script.async = true;
    script.setAttribute("data-hypothesis", "true");
    document.body.appendChild(script);

    // Cleanup on unmount or route change
    return () => {
      document.querySelectorAll('[data-hypothesis="true"]').forEach((el) => el.remove());

      const sidebar = document.querySelector(".hypothesis-app");
      if (sidebar) sidebar.remove();
    };
  }, [location.pathname]);

  return null;
}
