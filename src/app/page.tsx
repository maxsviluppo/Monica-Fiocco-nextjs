"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Send,
  MessageCircle,
  FileText,
  UserCheck,
  Mail
} from "lucide-react";
import Link from "next/link";

const heroSlides = [
  {
    id: 0,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1920&auto=format&fit=crop", // Soft human connection/cozy
    label: "Counseling ad Approccio Integrato",
    title: "Accompagnare l'anima\nverso la consapevolezza",
    subtitle: "Incontri individuali e percorsi sistemici per sbloccare le dinamiche interiori, ritrovare l'armonia e vivere in sintonia con se stessi.",
    cta: "I Miei Strumenti",
    ctaHref: "#strumenti"
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=1920&auto=format&fit=crop", // Lavender forest / wisteria vibe
    label: "Pedagogia Transgenerazionale",
    title: "Sciogliere i nodi\ndel passato familiare",
    subtitle: "Riconnettersi con le proprie radici e comprendere le eredità emotive per camminare con leggerezza nel presente.",
    cta: "Scopri i Progetti",
    ctaHref: "#progetti"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1920&auto=format&fit=crop", // Meditation / inner peace
    title: "La forza del fare\nnell'armonia dell'essere",
    label: "Formatrice & Psicopedagogista",
    subtitle: "Un percorso per riscoprire il potenziale di auto-realizzazione personale e relazionale attraverso metodi esperienziali.",
    cta: "Scrivimi",
    ctaHref: "#contatti"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const goToSlide = useCallback((idx: number, dir?: number) => {
    setDirection(dir ?? (idx > currentSlide ? 1 : -1));
    setCurrentSlide(idx);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % heroSlides.length;
    goToSlide(next, 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    goToSlide(prev, -1);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  return (
    <div className="bg-glicine-50/30">
      
      {/* 1. HERO SLIDESHOW SECTION */}
      <section 
        id="home" 
        className="relative w-full overflow-hidden bg-glicine-950" 
        style={{ height: "100vh", minHeight: "650px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter brightness-50"
            />
            {/* Soft Wisteria overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-glicine-950/80 via-glicine-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-glicine-50/60 via-transparent to-transparent" />

            {/* Slide Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full pt-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="max-w-3xl space-y-6"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-glicine-100 font-outfit text-xs font-semibold uppercase tracking-widest border border-white/15">
                    {heroSlides[currentSlide].label}
                  </span>
                  <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight whitespace-pre-line">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <p className="text-glicine-100/90 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      href={heroSlides[currentSlide].ctaHref}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-glicine-400 text-glicine-950 font-bold text-sm uppercase tracking-wider hover:bg-glicine-300 transition-all hover:scale-[1.02] shadow-lg shadow-glicine-400/20"
                    >
                      {heroSlides[currentSlide].cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="#chi-sono"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-bold text-sm uppercase tracking-wider border border-white/20 hover:bg-white/20 transition-all"
                    >
                      Scopri di più
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next controls (Hidden on mobile) */}
        <button
          onClick={prevSlide}
          aria-label="Slide precedente"
          className="hidden sm:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Slide successiva"
          className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Sinuous Wool Thread SVG Mask/Divider at the bottom */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
          <svg
            viewBox="0 0 1440 180"
            className="w-full h-auto text-glicine-50/50 fill-current translate-y-1"
            preserveAspectRatio="none"
          >
            {/* The filled shape matching the page background - solid white */}
            <path
              d="M 0 180 
                 L 0 90 
                 C 250 140, 400 30, 650 90 
                 C 720 105, 780 120, 830 90 
                 C 880 60, 930 20, 990 60 
                 C 1050 100, 1150 130, 1280 80 
                 C 1340 55, 1400 65, 1440 90 
                 L 1440 180 Z"
              className="fill-white"
            />
            {/* Sinuous wool thread line running along the curve */}
            <path
              d="M 0 90 
                 C 250 140, 400 30, 650 90 
                 C 720 105, 780 120, 830 90 
                 C 880 60, 930 20, 990 60 
                 C 1050 100, 1150 130, 1280 80 
                 C 1340 55, 1400 65, 1440 90"
              className="stroke-glicine-400/90 dark:stroke-glicine-300"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Signature stamp - bottom right, 3D engraved effect */}
        <div className="absolute bottom-[40px] sm:bottom-[130px] right-6 sm:right-14 z-20 pointer-events-none select-none">
          <div
            className="relative w-[130px] sm:w-[170px] opacity-80"
            style={{
              filter:
                "drop-shadow(0px 2px 0px rgba(0,0,0,0.55)) drop-shadow(0px -1px 0px rgba(255,255,255,0.08)) drop-shadow(1px 3px 6px rgba(0,0,0,0.5))",
            }}
          >
            <img
              src="/firma-monica.png"
              alt="Firma Monica Fiocco"
              className="w-full h-auto object-contain"
              style={{
                filter:
                  "brightness(0) invert(1) drop-shadow(0px 1px 2px rgba(0,0,0,0.7))",
                mixBlendMode: "screen",
              }}
            />
          </div>
        </div>

        {/* Slide indicators (dots) */}
        <div className="absolute bottom-[100px] left-6 sm:left-1/2 sm:-translate-x-1/2 z-20 flex gap-2.5">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentSlide ? "bg-glicine-400 w-8" : "bg-white/40"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="w-full bg-white border-b border-glicine-100/30 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center py-24 relative">
          
          {/* Background watermark purple logo with magic zoom in animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 0.15, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          >
            <img
              src="/logo-viola.png"
              alt="Logo Watermark"
              className="max-h-[300px] w-auto object-contain"
            />
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10 space-y-8"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: -10, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ type: "spring", stiffness: 60 }}
              className="text-glicine-600 font-bold uppercase tracking-[0.25em] text-xs font-outfit block"
            >
              La Filosofia Operativa
            </motion.span>
            
            <h2 className="font-outfit text-2xl sm:text-3xl md:text-4xl font-light italic text-glicine-900 leading-relaxed max-w-4xl mx-auto flex flex-wrap justify-center gap-x-3 gap-y-2">
              {["“Ho imparato", "a guardare", "le azioni e,", "non ad ascoltare", "più tanto", "le parole,", "con quelle", "dipingiamo", "illusioni,", "per fare", "c'è bisogno", "di essere.”"].map((group, idx) => (
                <motion.span
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, scale: 0.7, y: 25 },
                    show: { opacity: 1, scale: 1, y: 0 }
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 70, 
                    damping: 12,
                    duration: 0.6
                  }}
                  className="inline-block"
                >
                  {group}
                </motion.span>
              ))}
            </h2>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.3 },
                show: { opacity: 1, scale: 1 }
              }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="w-12 h-1 bg-glicine-400 mx-auto rounded-full"
            />
            
            <motion.cite
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ type: "spring", stiffness: 60 }}
              className="font-outfit font-bold text-slate-800 not-italic block uppercase tracking-wider text-xs sm:text-sm"
            >
              Monica Fiocco
            </motion.cite>
          </motion.div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="chi-sono" className="py-24 bg-white border-t border-glicine-100/50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Background animated blob */}
            <motion.div 
              initial={{ x: -120, opacity: 0, rotate: 0 }}
              whileInView={{ x: 0, opacity: 1, rotate: 3 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 50, damping: 12, delay: 0.1 }}
              className="absolute -inset-4 bg-glicine-200/40 rounded-[2.5rem] z-0" 
            />
            {/* Portrait Image Card */}
            <motion.div 
              initial={{ x: -120, opacity: 0, rotate: -4 }}
              whileInView={{ x: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 50, damping: 10, mass: 1 }}
              className="relative z-10 aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2.2rem] shadow-2xl border border-glicine-100"
            >
              <img
                src="/monica-portrait.jpg"
                alt="Monica Fiocco"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Floating credential badge with zoom in spring */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 z-20 bg-glicine-900 p-6 rounded-3xl text-white shadow-2xl border border-glicine-800"
            >
              <div className="text-2xl font-extrabold font-outfit text-glicine-300">12+</div>
              <div className="text-[9px] uppercase tracking-widest font-semibold text-glicine-100 mt-1 leading-tight">
                Anni di<br />Esperienza
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-glicine-600 font-bold uppercase tracking-[0.25em] text-xs font-outfit block">
              Chi Sono
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-extrabold text-glicine-900 leading-tight">
              Monica Fiocco
            </h2>
            <h3 className="font-outfit text-lg font-bold text-slate-700 italic">
              Counselor ad Approccio Integrato · Psicopedagogista · Formatrice
            </h3>
            
            <div className="space-y-6 text-slate-600 leading-relaxed font-light">
              <p>
                Nel mio lavoro unisco ascolto profondo, empatia e competenze maturate in anni di pratica clinica ed educativa per aiutarti a comprendere ed esplorare le tue emozioni, le relazioni e le dinamiche interiori. 
              </p>
              <p>
                Credo fermamente che ogni individuo possieda le risorse necessarie per la propria auto-realizzazione. Attraverso percorsi personalizzati e dinamiche sistemiche, ti accompagno ad attivare queste risorse interne per generare un cambiamento concreto, autentico e duraturo.
              </p>
              
              <div className="bg-glicine-50/50 p-6 rounded-2xl border-l-4 border-glicine-400 text-slate-800">
                <p className="font-medium text-glicine-900">
                  La mia metodologia integra il counseling umanistico rogersiano con le costellazioni sistemiche familiari e la pedagogia transgenerazionale per offrire un approccio olistico e profondo alla persona.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. STRUMENTI / SERVIZI SECTION */}
      <section id="strumenti" className="py-24 bg-glicine-50/30 border-t border-b border-glicine-100/40">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-glicine-600 font-bold uppercase tracking-[0.25em] text-xs font-outfit block">
              I Miei Metodi
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-extrabold text-glicine-900 leading-tight">
              Gli Strumenti Terapeutici
            </h2>
            <p className="text-slate-600 font-light text-base sm:text-lg">
              Utilizzo un ventaglio di metodologie integrate per accogliere le esigenze uniche di ogni persona o gruppo.
            </p>
          </div>

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                title: "Counseling Umanistico",
                subtitle: "Approccio Integrato",
                desc: "Un colloquio basato sull'accettazione incondizionata, l'ascolto empatico e l'orientamento non-direttivo per far emergere le tue risposte efficaci.",
                icon: Heart,
                href: "/strumenti/counseling",
                color: "border-glicine-200 hover:border-glicine-400 hover:shadow-glicine-400/5"
              },
              {
                title: "Costellazioni Familiari",
                subtitle: "Dinamiche Sistemiche",
                desc: "Un metodo per visualizzare e sciogliere i legami invisibili e i nodi emotivi legati alla propria rete familiare e relazionale originaria.",
                icon: Sparkles,
                href: "/strumenti/costellazioni",
                color: "border-purple-200 hover:border-purple-400 hover:shadow-purple-400/5"
              },
              {
                title: "Pedagogia Transgenerazionale",
                subtitle: "Memorie Familiari",
                desc: "L'esplorazione del genogramma e delle eredità psicologiche tramandate di generazione in generazione per liberare il proprio percorso autonomo.",
                icon: BookOpen,
                href: "/strumenti/pedagogia-transgenerazionale",
                color: "border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-400/5"
              },
              {
                title: "Psicopedagogia Relazionale",
                subtitle: "Supporto Educativo",
                desc: "Interventi pedagogici e relazionali orientati all'evoluzione personale, alla genitorialità consapevole e al supporto delle help professions.",
                icon: UserCheck,
                href: "/strumenti/psicopedagogia",
                color: "border-pink-200 hover:border-pink-400 hover:shadow-pink-400/5"
              }
            ].map((servizio) => (
              <motion.div
                key={servizio.title}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 60, 
                  damping: 15
                }}
                className={`bg-white border rounded-[2rem] p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group min-h-[380px] ${servizio.color}`}
              >
                <div className="space-y-6">
                  <div className="h-12 w-12 rounded-2xl bg-glicine-100 text-glicine-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <servizio.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-glicine-500 font-bold">
                      {servizio.subtitle}
                    </span>
                    <h3 className="font-outfit font-extrabold text-xl text-glicine-900 group-hover:text-glicine-700 transition-colors">
                      {servizio.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {servizio.desc}
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-50">
                  <Link
                    href={servizio.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-glicine-700 hover:text-glicine-950 transition-colors group/link"
                  >
                    Approfondisci <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. PROGETTI SECTION */}
      <section id="progetti" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-4xl">
              <span className="text-glicine-600 font-bold uppercase tracking-[0.25em] text-xs font-outfit block">
                Percorsi Educativi
              </span>
              <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-extrabold text-glicine-900 leading-tight">
                I Miei Progetti
              </h2>
              <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed mt-2">
                Ogni progetto nasce dall’esperienza e accompagna persone, professionisti e organizzazioni nello sviluppo della consapevolezza, delle competenze relazionali e del potenziale umano, attraverso approcci autentici, esperienziali e trasformativi.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                id: "fiabe-radice",
                title: "Fiabe Radice",
                tag: "Crescita attraverso la narrazione",
                desc: "Un percorso unico che utilizza il potere metaforico ed archetipico delle fiabe per far emergere i bisogni emotivi, esplorare l'inconscio e stimolare l'auto-ascolto.",
                image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop"
              },
              {
                id: "murena",
                title: "Metodo M.U.R.E.N.A.",
                tag: "Formazione e Sviluppo Relazionale",
                desc: "Un modello teorico-pratico ideato per facilitare la risoluzione dei conflitti, la gestione emotiva e lo sviluppo delle capacità comunicativo-relazionali.",
                image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=800&auto=format&fit=crop"
              },
              {
                id: "formazione",
                title: "Formazione Integrata",
                tag: "Seminari & Supervisioni",
                desc: "Corsi base e moduli di aggiornamento specifici per docenti, educatori, genitori e operatori del sociale orientati alla relazione educativa non-direttiva.",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop"
              }
            ].map((progetto, idx) => (
              <motion.div
                key={progetto.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group flex flex-col bg-glicine-50/20 border border-glicine-100 rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={progetto.image}
                    alt={progetto.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-glicine-950/60 via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-8 flex flex-col flex-grow justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-glicine-600 uppercase tracking-widest">
                      {progetto.tag}
                    </span>
                    <h3 className="font-outfit font-extrabold text-2xl text-glicine-900 group-hover:text-glicine-700 transition-colors">
                      {progetto.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">
                      {progetto.desc}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-100">
                    <Link
                      href={`/progetti/${progetto.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-glicine-700 hover:text-glicine-950 transition-colors group/link"
                    >
                      Approfondisci <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contatti" className="py-24 bg-glicine-50/30 border-t border-glicine-100/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-stretch">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-glicine-600 font-bold uppercase tracking-[0.25em] text-xs font-outfit block">
                  Scrivimi
                </span>
                <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-extrabold text-glicine-900 leading-tight">
                  Entra in contatto
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                  Se vuoi prenotare un incontro, richiedere informazioni su seminari e corsi, o semplicemente chiedere informazioni sulle mie attività, usa questo modulo.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white border border-glicine-100 text-glicine-700 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-xs uppercase tracking-wider text-slate-500">Invia un'e-mail</h4>
                    <a href="mailto:monica.fiocco.2012@gmail.com" className="text-glicine-900 font-semibold text-sm hover:underline">
                      monica.fiocco.2012@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white border border-glicine-100 text-glicine-700 shadow-sm">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-xs uppercase tracking-wider text-slate-500">Contatto Telefonico</h4>
                    <a href="tel:+393390000000" className="text-glicine-900 font-semibold text-sm hover:underline">
                      +39 339 000 0000
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-light max-w-sm">
                * Ricevo solo su appuntamento a Napoli e online. I dati personali trasmessi verranno trattati nel pieno rispetto delle normative GDPR.
              </div>
            </div>

            {/* Right: Minimal Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[2.5rem] border border-glicine-100 shadow-xl">
              <form 
                action="mailto:monica.fiocco.2012@gmail.com" 
                method="POST" 
                encType="text/plain" 
                className="space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest ml-4">Nome Completo</label>
                    <input 
                      type="text" 
                      name="Nome"
                      required
                      placeholder="Es. Maria Rossi"
                      className="w-full px-5 py-4 rounded-full border border-slate-200 focus:outline-none focus:border-glicine-400 focus:ring-2 focus:ring-glicine-100 bg-slate-50/40 text-slate-800 text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest ml-4">E-mail</label>
                    <input 
                      type="email" 
                      name="Email"
                      required
                      placeholder="Es. maria.rossi@email.com"
                      className="w-full px-5 py-4 rounded-full border border-slate-200 focus:outline-none focus:border-glicine-400 focus:ring-2 focus:ring-glicine-100 bg-slate-50/40 text-slate-800 text-sm transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest ml-4">Telefono</label>
                  <input 
                    type="tel" 
                    name="Telefono"
                    placeholder="Es. +39 333 1234567"
                    className="w-full px-5 py-4 rounded-full border border-slate-200 focus:outline-none focus:border-glicine-400 focus:ring-2 focus:ring-glicine-100 bg-slate-50/40 text-slate-800 text-sm transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 uppercase font-bold tracking-widest ml-4">Messaggio</label>
                  <textarea 
                    rows={4}
                    name="Messaggio"
                    required
                    placeholder="Scrivi qui la tua richiesta..."
                    className="w-full px-6 py-4 rounded-[2rem] border border-slate-200 focus:outline-none focus:border-glicine-400 focus:ring-2 focus:ring-glicine-100 bg-slate-50/40 text-slate-800 text-sm transition-all resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-glicine-900 hover:bg-glicine-800 text-white font-bold uppercase tracking-widest text-xs rounded-full transition-all hover:scale-[1.01] active:scale-95 shadow-xl shadow-glicine-900/10 flex items-center justify-center gap-2"
                >
                  Invia Richiesta <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
