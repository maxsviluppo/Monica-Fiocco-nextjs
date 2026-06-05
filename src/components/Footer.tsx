"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-glicine-950 text-glicine-200/80 pt-20 pb-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
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
            <li><Link href="/#chi-sono" className="hover:text-white transition-colors">Chi Sono</Link></li>
            <li><Link href="/#strumenti" className="hover:text-white transition-colors">I Miei Strumenti</Link></li>
            <ul className="pl-4 space-y-2 text-xs border-l border-white/10 mt-2 mb-4">
              <li><Link href="/strumenti/counseling" className="hover:text-white transition-colors">Counseling Umanistico</Link></li>
              <li><Link href="/strumenti/costellazioni" className="hover:text-white transition-colors">Costellazioni Familiari</Link></li>
              <li><Link href="/strumenti/pedagogia-transgenerazionale" className="hover:text-white transition-colors">Pedagogia Transgenerazionale</Link></li>
              <li><Link href="/strumenti/psicopedagogia" className="hover:text-white transition-colors">Psicopedagogia Relazionale</Link></li>
            </ul>
            <li><Link href="/#progetti" className="hover:text-white transition-colors">I Miei Progetti</Link></li>
          </ul>
        </div>

        {/* Contacts Col */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-white">Contatti &amp; info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-glicine-300" />
              <a href="mailto:monica.fiocco.2012@gmail.com" className="hover:text-white transition-colors">
                monica.fiocco.2012@gmail.com
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="w-4 h-4 text-glicine-300" />
              <a href="tel:+393390000000" className="hover:text-white transition-colors">
                +39 339 000 0000
              </a>
            </li>
          </ul>
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
        <div className="flex gap-6">
          <Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#termini" className="hover:text-white transition-colors">Termini e Condizioni</Link>
        </div>
      </div>
    </footer>
  );
}
