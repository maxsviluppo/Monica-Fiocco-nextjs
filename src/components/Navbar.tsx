"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Heart, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Chi Sono", href: "/chi-sono" },
    { 
      name: "Strumenti", 
      href: "/#strumenti",
      submenu: [
        { name: "Counseling Umanistico", href: "/strumenti/counseling" },
        { name: "Costellazioni Familiari", href: "/strumenti/costellazioni" },
        { name: "Pedagogia Transgenerazionale", href: "/strumenti/pedagogia-transgenerazionale" },
        { name: "Psicopedagogia Relazionale", href: "/strumenti/psicopedagogia" },
      ]
    },
    {
      name: "Progetti",
      href: "/#progetti",
      submenu: [
        { name: "Fiabe Radici", href: "/progetti/fiabe-radice" },
        { name: "Metodo M.U.R.E.N.A.", href: "/progetti/murena" },
        { name: "Formazione Integrata", href: "/progetti/formazione" },
      ]
    },
    { name: "Articoli", href: "/articoli" },
    { name: "Pubblicazioni", href: "/pubblicazioni" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-glicine-950 border-b border-glicine-800/70 shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <img
            src="/logo.png"
            alt="Monica Fiocco Logo"
            className={`h-[62px] w-auto object-contain transition-all duration-300 brightness-0 invert`}
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              ref={link.submenu ? dropdownRef : undefined}
              className="relative"
              onMouseEnter={() => link.submenu && setDropdownOpen(link.name)}
              onMouseLeave={() => link.submenu && setDropdownOpen(null)}
            >
              {link.submenu ? (
                <button
                  onClick={() => setDropdownOpen(dropdownOpen === link.name ? null : link.name)}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors uppercase tracking-wider text-[11px] duration-300 text-white/95 hover:text-glicine-300`}
                >
                  {link.name} <ChevronDown className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors uppercase tracking-wider text-[11px] duration-300 text-white/95 hover:text-glicine-300`}
                >
                  {link.name}
                </Link>
              )}

              {/* Submenu Dropdown */}
              {link.submenu && dropdownOpen === link.name && (
                <div className="absolute left-0 pt-4 top-full w-64 z-50">
                  <div className="bg-white border border-glicine-100 rounded-2xl shadow-xl py-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setDropdownOpen(null)}
                        className="block px-5 py-2.5 text-slate-700 hover:bg-glicine-50 hover:text-glicine-900 transition-colors font-outfit text-xs font-bold uppercase tracking-wider"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/#contatti"
            className="px-6 py-2.5 rounded-full bg-glicine-900 hover:bg-glicine-800 text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-md shadow-glicine-900/10 flex items-center gap-1.5"
          >
            Contatti <Heart className="w-3.5 h-3.5 fill-current" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 transition-colors duration-300 text-white/95 hover:text-glicine-300"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-glicine-100 shadow-lg py-6 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <div key={link.name} className="flex flex-col gap-2">
              {link.submenu ? (
                <>
                  {/* Accordion toggle button for mobile submenu */}
                  <button
                    onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === link.name ? null : link.name)}
                    className="flex items-center justify-between w-full text-sm font-bold text-glicine-900 uppercase tracking-wider text-[11px] py-2 border-b border-slate-50"
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-glicine-500 transition-transform duration-200 ${
                        mobileSubmenuOpen === link.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {/* Collapsible sub-items */}
                  {mobileSubmenuOpen === link.name && (
                    <div className="flex flex-col gap-2 pl-4 border-l border-glicine-100 animate-in fade-in slide-in-from-top-1 duration-200">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => { setIsOpen(false); setMobileSubmenuOpen(null); }}
                          className="text-slate-600 hover:text-glicine-700 transition-colors text-[11px] font-semibold uppercase tracking-wider py-1.5"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-slate-800 hover:text-glicine-700 transition-colors uppercase tracking-wider text-[11px] py-2 border-b border-slate-50"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/#contatti"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 rounded-full bg-glicine-900 hover:bg-glicine-800 text-white font-semibold text-center text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
          >
            Contatti <Heart className="w-3.5 h-3.5 fill-current" />
          </Link>
        </div>
      )}
    </nav>
  );
}
