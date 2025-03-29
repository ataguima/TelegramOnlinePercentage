// ==UserScript==
// @name         Telegram - Online Members Percentage Overlay
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Displays a fixed overlay with the percentage of online members in a Telegram Web group without altering the original DOM.
// @author       
// @match        https://web.telegram.org/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    console.log("Online Percentage Overlay - Started");

    function getOverlay() {
        let overlay = document.getElementById("tg-online-overlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "tg-online-overlay";
            Object.assign(overlay.style, {
                position: "fixed",
                top: "10px",
                right: "10px",
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: "4px",
                zIndex: "9999",
                fontFamily: "sans-serif",
                fontSize: "14px"
            });
            document.body.appendChild(overlay);
        }
        return overlay;
    }

    function extractNumber(str) {
        const match = str.match(/(\d[\d\s]*)/);
        if (match) {
            return parseInt(match[1].replace(/\s/g, ''), 10);
        }
        return NaN;
    }

    function updateOverlay() {
        const spans = document.querySelectorAll('span.i18n');
        let spanMembers = null;
        let spanOnline = null;

        spans.forEach((span) => {
            const text = span.textContent.trim().toLowerCase();
            if (text.includes('members')) {
                const num = extractNumber(span.textContent);
                if (!isNaN(num)) {
                    spanMembers = span;
                }
            }
            if (text.includes('online')) {
                const num = extractNumber(span.textContent);
                if (!isNaN(num)) {
                    spanOnline = span;
                }
            }
        });

        if (spanMembers && spanOnline) {
            const totalMembers = extractNumber(spanMembers.textContent);
            const onlineMembers = extractNumber(spanOnline.textContent);

            if (!isNaN(totalMembers) && totalMembers > 0) {
                const percentage = ((onlineMembers / totalMembers) * 100).toFixed(1);
                const overlay = getOverlay();
                overlay.textContent = `Online: ${onlineMembers} / ${totalMembers} (${percentage}%)`;
                console.log(`Overlay updated: ${percentage}%`);
            }
        } else {
            console.log("Could not identify the members/online spans.");
        }
    }

    function initMutationObserver() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    updateOverlay();
                    break;
                }
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    function init() {
        updateOverlay();
        initMutationObserver();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
