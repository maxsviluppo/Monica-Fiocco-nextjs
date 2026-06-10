"use client";

import React from "react";
import Link from "next/link";
import { Mail, Send } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { openCookiePreferences } from "@/components/CookieConsent";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_WHATSAPP_URL } from "@/data/contact";

export default function Footer() {
  return (
    <footer className="bg-glicine-950 text-glicine-200/80 pt-20 pb-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Col */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="group">
              <img
                src="/logo.png"
                alt="Monica Fiocco Logo"
                className="h-[80px] w-auto object-contain brightness-0 invert"
              />
            </Link>
          </div>
          <p className="text-sm text-glicine-300/80 font-light leading-relaxed max-w-sm">
            Accompagno persone, professionisti e organizzazioni in percorsi di consapevolezza e crescita, integrando strumenti transgenerazionali e approcci sistemici per sbloccare le potenzialità individuali.
          </p>
        </div>

        {/* Links Col */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-white">Menu</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/#home" className="hover:text-white transition-colors">Home Page</Link></li>
            <li><Link href="/chi-sono" className="hover:text-white transition-colors">Chi Sono</Link></li>
            <li><Link href="/#strumenti" className="hover:text-white transition-colors">I Miei Strumenti</Link></li>
            <ul className="pl-4 space-y-2 text-xs border-l border-white/10 mt-2 mb-4">
              <li><Link href="/strumenti/counseling" className="hover:text-white transition-colors">Counseling Umanistico</Link></li>
              <li><Link href="/strumenti/costellazioni" className="hover:text-white transition-colors">Costellazioni Familiari</Link></li>
              <li><Link href="/strumenti/pedagogia-transgenerazionale" className="hover:text-white transition-colors">Pedagogia Transgenerazionale</Link></li>
              <li><Link href="/strumenti/psicopedagogia" className="hover:text-white transition-colors">Psicopedagogia Relazionale</Link></li>
            </ul>
            <li><Link href="/#progetti" className="hover:text-white transition-colors">I Miei Progetti</Link></li>
            <ul className="pl-4 space-y-2 text-xs border-l border-white/10 mt-2 mb-4">
              <li><Link href="/progetti/fiabe-radice" className="hover:text-white transition-colors">Fiabe Radici</Link></li>
              <li><Link href="/progetti/murena" className="hover:text-white transition-colors">Metodo M.U.R.E.N.A.</Link></li>
              <li><Link href="/progetti/formazione" className="hover:text-white transition-colors">Formazione Integrata</Link></li>
            </ul>
            <li><Link href="/articoli" className="hover:text-white transition-colors">Articoli</Link></li>
          </ul>
        </div>

        {/* Contacts Col */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-white">Contatti &amp; info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-glicine-300" />
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <WhatsAppIcon className="w-4 h-4 text-glicine-300" />
              <a
                href={CONTACT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Contact Col */}
        <div>
          <div className="space-y-3 mb-6">
            <span className="font-bold text-xs uppercase tracking-[0.2em] text-glicine-300 block">
              Contatto
            </span>
            <h4 className="font-outfit text-xl font-extrabold text-white leading-snug">
              Richiedi informazioni
            </h4>
            <p className="text-sm text-glicine-300/75 font-light leading-relaxed">
              Lascia i tuoi recapiti: ti risponderò con cura per parlare di incontri, seminari e percorsi di crescita.
            </p>
          </div>
          <form
            action={`mailto:${CONTACT_EMAIL}`}
            method="POST"
            encType="text/plain"
            className="space-y-3"
          >
            <input
              type="text"
              name="Nome"
              required
              placeholder="Nome"
              className="w-full px-4 py-3 rounded-full bg-white/8 border border-white/10 text-white placeholder:text-glicine-200/45 text-sm outline-none focus:border-glicine-300 focus:bg-white/12 transition-all"
            />
            <input
              type="email"
              name="Email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 rounded-full bg-white/8 border border-white/10 text-white placeholder:text-glicine-200/45 text-sm outline-none focus:border-glicine-300 focus:bg-white/12 transition-all"
            />
            <input
              type="tel"
              name="Cellulare"
              placeholder="Cellulare"
              className="w-full px-4 py-3 rounded-full bg-white/8 border border-white/10 text-white placeholder:text-glicine-200/45 text-sm outline-none focus:border-glicine-300 focus:bg-white/12 transition-all"
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-glicine-300 hover:bg-white text-glicine-950 font-bold text-[11px] uppercase tracking-widest transition-all"
            >
              Invia <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-glicine-400">
        <p>
          © {new Date().getFullYear()} Monica Fiocco · Tutti i diritti riservati ·{" "}
          <a href="mailto:castromassimo@gmail.com" className="hover:text-white transition-colors">
            DEVTOOLS
          </a>
        </p>
        <div className="flex flex-wrap justify-center md:justify-end gap-6">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <button
            type="button"
            onClick={openCookiePreferences}
            className="hover:text-white transition-colors"
          >
            Gestione cookie
          </button>
        </div>
      </div>
    </footer>
  );
}
