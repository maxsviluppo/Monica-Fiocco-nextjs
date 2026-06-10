"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export const COOKIE_CONSENT_KEY = "monicafiocco-cookie-consent";

type ConsentChoice = "all" | "essential";

export function getCookieConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "all" || value === "essential" ? value : null;
}

export function openCookiePreferences() {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  localStorage.removeItem(`${COOKIE_CONSENT_KEY}-date`);
  window.dispatchEvent(new Event("cookie-consent-reset"));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      setVisible(!getCookieConsent());
    };

    checkConsent();
    window.addEventListener("cookie-consent-reset", checkConsent);
    return () => window.removeEventListener("cookie-consent-reset", checkConsent);
  }, []);

  const saveChoice = (choice: ConsentChoice) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    localStorage.setItem(`${COOKIE_CONSENT_KEY}-date`, new Date().toISOString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6 pointer-events-none"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="max-w-4xl mx-auto pointer-events-auto bg-glicine-950 text-glicine-100 rounded-[1.75rem] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-5">
        <div className="space-y-3">
          <p className="font-bold text-xs uppercase tracking-[0.2em] text-glicine-300">
            Cookie e privacy
          </p>
          <h2 id="cookie-consent-title" className="font-outfit text-xl sm:text-2xl font-extrabold text-white leading-snug">
            La tua privacy è importante
          </h2>
          <p id="cookie-consent-description" className="text-sm text-glicine-200/85 font-light leading-relaxed">
            Questo sito utilizza cookie tecnici necessari al funzionamento e, solo con il tuo consenso,
            eventuali cookie di analisi per migliorare l&apos;esperienza di navigazione. Puoi accettare
            tutti i cookie o limitarti a quelli essenziali. Per maggiori dettagli consulta la{" "}
            <Link href="/privacy-policy" className="text-glicine-300 underline underline-offset-2 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => saveChoice("essential")}
            className="px-6 py-3 rounded-full border border-white/15 text-glicine-100 font-bold text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Solo necessari
          </button>
          <button
            type="button"
            onClick={() => saveChoice("all")}
            className="px-6 py-3 rounded-full bg-glicine-300 hover:bg-white text-glicine-950 font-bold text-[11px] uppercase tracking-widest transition-all"
          >
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  );
}
