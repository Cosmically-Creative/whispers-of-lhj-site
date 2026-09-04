"use strict";

document.documentElement.classList.replace("no-js", "js");

const QUICK_EXIT_URL = "https://www.google.com/";
const STAGING_HOST = "whispersoflhj.cosmicallycreative.com";
const MOBILE_NAV_QUERY = window.matchMedia("(max-width: 88em)");

function quickExit() {
    window.location.replace(QUICK_EXIT_URL);
}

document.querySelectorAll(".quick-exit").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        quickExit();
    });
});

if (window.location.hostname === STAGING_HOST) {
    document.body.classList.add("client-preview");
    document.querySelectorAll(".announcement-message").forEach((message) => {
        message.textContent = "Client Preview";
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    event.preventDefault();
    quickExit();
});

document.querySelectorAll(".nav").forEach((nav) => {
    const toggle = nav.querySelector(".mobile-nav-toggle");
    const toggleLabel = toggle?.querySelector(".mobile-nav-toggle-label");
    const navigationLinks = nav.querySelector(".nav-links");
    const navigationActions = nav.querySelector(".btns");

    if (!toggle || !toggleLabel || !navigationLinks || !navigationActions) return;

    function setMenuState(isOpen) {
        nav.classList.toggle("nav--open", isOpen);
        document.body.classList.toggle("mobile-nav-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        toggleLabel.textContent = isOpen ? "Close" : "Menu";
    }

    toggle.addEventListener("click", () => {
        setMenuState(!nav.classList.contains("nav--open"));
    });

    navigationLinks.addEventListener("click", (event) => {
        if (event.target.closest("a")) setMenuState(false);
    });

    navigationActions.addEventListener("click", (event) => {
        if (event.target.closest("a")) setMenuState(false);
    });

    document.addEventListener("click", (event) => {
        if (nav.classList.contains("nav--open") && !nav.contains(event.target)) {
            setMenuState(false);
        }
    });

    MOBILE_NAV_QUERY.addEventListener("change", (event) => {
        if (!event.matches) setMenuState(false);
    });
});
