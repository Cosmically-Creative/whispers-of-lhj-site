"use strict";

document.documentElement.classList.replace("no-js", "js");

const QUICK_EXIT_URL = "https://www.google.com/";
const QUICK_EXIT_KEY = "quick-exit";
const MOBILE_NAV_QUERY = window.matchMedia("(max-width: 88em)");

// Flip active to false when there is no event. That clears the
// announcement and sends anyone on the events page back home.
const eventAnnouncement = {
    active: true,
    label: "Benefit Brunch",
    date: "Oct 10",
};

function navigationType() {
    const navigation = performance.getEntriesByType("navigation")[0];
    return navigation ? navigation.type : "";
}

function quickExit() {
    try {
        // Remember the exit for this tab so Back cannot reopen the site.
        sessionStorage.setItem(QUICK_EXIT_KEY, "1");
    } catch (error) {}

    document.documentElement.hidden = true;
    if (document.body) document.body.replaceChildren();
    window.location.replace(QUICK_EXIT_URL);
}

try {
    if (navigationType() === "back_forward" && sessionStorage.getItem(QUICK_EXIT_KEY) === "1") {
        document.documentElement.hidden = true;
        window.location.replace(QUICK_EXIT_URL);
    }
} catch (error) {}

window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;

    try {
        if (sessionStorage.getItem(QUICK_EXIT_KEY) !== "1") return;
    } catch (error) {
        return;
    }

    document.documentElement.hidden = true;
    window.location.replace(QUICK_EXIT_URL);
});

document.querySelectorAll(".quick-exit").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        quickExit();
    });
});

function directoryDepth() {
    const path = window.location.pathname;
    const directory = path.endsWith("/") ? path : path.slice(0, path.lastIndexOf("/") + 1);
    return directory.split("/").filter(Boolean).length;
}

function isEventsPage() {
    return /\/events\/(?:index\.html)?$/.test(window.location.pathname);
}

if (!eventAnnouncement.active && isEventsPage()) {
    document.documentElement.hidden = true;
    const home = "../".repeat(directoryDepth());
    window.location.replace(home || "./");
} else if (eventAnnouncement.active) {
    const href = `${"../".repeat(directoryDepth())}events/`;

    document.querySelectorAll(".announcement-message").forEach((message) => {
        const link = document.createElement("a");
        const date = document.createElement("span");

        link.className = "announcement-link";
        link.href = href;
        link.append(eventAnnouncement.label, " ");
        date.className = "text-yellow";
        date.textContent = eventAnnouncement.date;
        link.append(date);

        if (isEventsPage()) link.setAttribute("aria-current", "page");

        message.replaceChildren(link);
        message.closest(".announcement-bar")?.classList.add("announcement-bar--active");
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    event.preventDefault();
    quickExit();
});

document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest("a[href]");
    if (!link || link.classList.contains("quick-exit")) return;
    if (link.target && link.target !== "_self") return;
    if (link.hasAttribute("download")) return;

    let url;
    try {
        url = new URL(link.href);
    } catch (error) {
        return;
    }

    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return;

    event.preventDefault();
    window.location.replace(url.href);
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
