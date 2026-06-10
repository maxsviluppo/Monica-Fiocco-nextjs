"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Search, 
  CheckCircle, 
  MessageSquare,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export default function AdminDashboardHome() {
  const [leadsCount, setLeadsCount] = useState(0);
  const [newLeadsCount, setNewLeadsCount] = useState(0);
  const [seoPagesCount, setSeoPagesCount] = useState(10);
  const [aiAccessEnabled, setAiAccessEnabled] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("monica_contact_leads");
      if (stored) {
        const leads = JSON.parse(stored);
        setLeadsCount(leads.length);
        setNewLeadsCount(leads.filter((l: any) => l.status === "Nuovo").length);
      }
      const storedSeo = localStorage.getItem("monica_pages_seo");
      if (storedSeo) {
        const seoData = JSON.parse(storedSeo);
        setSeoPagesCount(seoData.length);
      }
      const storedAi = localStorage.getItem("monica_ai_access_enabled");
      if (storedAi !== null) {
        setAiAccessEnabled(JSON.parse(storedAi));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="space-y-10">
      
      {/* Welcome Heading */}
      <section className="space-y-2">
        <span className="text-glicine-400 font-semibold text-xs uppercase tracking-widest font-outfit">Console Amministratore</span>
        <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-white">Console Principale</h2>
        <p className="text-glicine-300/80 text-sm max-w-2xl">
          Benvenuto nel pannello gestionale del sito di Monica Fiocco. Da qui puoi monitorare le richieste dei moduli di contatto e aggiornare i metadati SEO del sito.
        </p>
      </section>

      {/* Analytics Statistics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: "Messaggi / Leads Ricevuti", 
            value: leadsCount.toString(), 
            change: `${newLeadsCount} Nuovi da gestire`, 
            icon: MessageSquare, 
            color: "text-blue-455 bg-blue-500/10 border-blue-500/20" 
          },
          { 
            title: "Pagine Configurate SEO", 
            value: seoPagesCount.toString(), 
            change: "Metatags attivi", 
            icon: Search, 
            color: "text-amber-500 bg-amber-500/10 border-amber-500/20" 
          },
          { 
            title: "Stato Compliance SEO", 
            value: "4/4", 
            change: "Robots, Sitemap, GA, Verification", 
            icon: CheckCircle, 
            color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" 
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-6 rounded-3xl bg-glicine-900/40 border border-glicine-880/80 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-glicine-300 uppercase tracking-wider">{stat.title}</span>
                <div className={`p-2.5 rounded-xl border ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-extrabold font-outfit text-white">{stat.value}</h3>
                <div className="flex items-center gap-1 text-[11px] text-glicine-400">
                  <CheckCircle className="h-3 w-3 text-emerald-500" />
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Sections Gateways */}
      <section className="grid lg:grid-cols-2 gap-8">
        
        {/* Gateway: Contatti */}
        <div className="p-8 rounded-3xl bg-glicine-900/30 border border-glicine-850/80 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-glicine-800/80 text-glicine-300 border border-glicine-700/50 flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-outfit font-extrabold text-2xl text-white">Contatti &amp; Iscrizioni</h3>
            <p className="text-glicine-300/80 text-sm leading-relaxed">
              Gestisci in tempo reale le richieste di informazioni inviate dagli utenti tramite il modulo di contatto della home page e del footer.
            </p>
          </div>
          <Link 
            href="/admin/contatti"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-glicine-800 hover:bg-glicine-700 text-white font-semibold text-sm transition-all shadow-lg border border-glicine-700/50"
          >
            Gestisci Contatti ({leadsCount}) <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Gateway: SEO */}
        <div className="p-8 rounded-3xl bg-glicine-900/30 border border-glicine-850/80 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-glicine-800/80 text-glicine-300 border border-glicine-700/50 flex items-center justify-center">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="font-outfit font-extrabold text-2xl text-white">SEO Metatags Pagine</h3>
            <p className="text-glicine-300/80 text-sm leading-relaxed">
              Visualizza e modifica i tag SEO (titolo, descrizione del sito, parole chiave) per ciascuna pagina principale del sito Monica Fiocco.
            </p>
          </div>
          <Link 
            href="/admin/seo"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-glicine-800 hover:bg-glicine-700 text-white font-semibold text-sm transition-all border border-glicine-700/50"
          >
            Configura SEO Pagine <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </section>

      {/* AI SEO Monitor Section */}
      <section className="p-8 rounded-3xl bg-glicine-900/30 border border-glicine-850/80 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-outfit font-extrabold text-xl text-white border-l-2 border-glicine-400 pl-2.5">
              Monitor SEO AI-Agent &amp; Generative Engine Optimization (GEO)
            </h3>
            <p className="text-xs text-glicine-400 mt-1">
              Gestisci l'autorizzazione di scansione per i modelli di linguaggio e monitora l'indicizzazione nelle risposte AI (ChatGPT, Claude, Gemini, Perplexity)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-glicine-300">Accesso Web AI:</span>
            <button
              onClick={() => {
                const newState = !aiAccessEnabled;
                setAiAccessEnabled(newState);
                localStorage.setItem("monica_ai_access_enabled", JSON.stringify(newState));
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                aiAccessEnabled ? "bg-emerald-500" : "bg-glicine-800"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  aiAccessEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-xs font-bold ${aiAccessEnabled ? "text-emerald-400" : "text-glicine-400"}`}>
              {aiAccessEnabled ? "Abilitato (Consigliato)" : "Disabilitato"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { name: "ChatGPT / SearchGPT", agent: "GPTBot", desc: "OpenAI Crawler", queries: "0", lastActive: "Mai (Sito offline/locale)" },
            { name: "Claude AI / Artifacts", agent: "ClaudeBot", desc: "Anthropic Crawler", queries: "0", lastActive: "Mai (Sito offline/locale)" },
            { name: "Gemini / Google AI", agent: "Google-Extended", desc: "Google AI Crawler", queries: "0", lastActive: "Mai (Sito offline/locale)" },
            { name: "Perplexity AI", agent: "PerplexityBot", desc: "Perplexity Search", queries: "0", lastActive: "Mai (Sito offline/locale)" },
            { name: "Apple Intelligence", agent: "Applebot-Extended", desc: "Apple Search Agent", queries: "0", lastActive: "Mai (Sito offline/locale)" },
          ].map((bot, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-glicine-950/40 border border-glicine-900 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm block font-outfit truncate">{bot.name}</strong>
                  <span className={`h-2 w-2 rounded-full ${aiAccessEnabled ? "bg-emerald-500/80" : "bg-amber-500/80"}`} />
                </div>
                <span className="text-[10px] text-glicine-500 block truncate">UA: {bot.agent}</span>
              </div>
              
              <div className="pt-2 border-t border-glicine-900/60 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-glicine-400 font-light">Scansioni (30g)</span>
                  <span className="text-white font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-glicine-400 font-light">Stato</span>
                  <span className={`font-bold ${aiAccessEnabled ? "text-emerald-400" : "text-amber-500"}`}>
                    {aiAccessEnabled ? "Consentito (Offline)" : "Bloccato"}
                  </span>
                </div>
                <div className="text-[10px] text-glicine-500 pt-1 text-right italic font-light">
                  {bot.lastActive}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-glicine-900/10 border border-glicine-800/40 text-xs text-glicine-300 leading-relaxed">
          <strong>💡 Ottimizzazione GEO (Generative Engine Optimization):</strong> Mantenere l'accesso web abilitato consente ai modelli di AI di leggere gli articoli del tuo blog in tempo reale, citando Monica Fiocco come fonte autorevole quando gli utenti fanno domande relative al counseling psicopedagogico e alle costellazioni familiari.
        </div>
      </section>

      {/* Compliance & Webmaster check */}
      <section className="p-8 rounded-3xl bg-glicine-900/20 border border-glicine-850/50 shadow-xl space-y-6">
        <div>
          <h3 className="font-outfit font-extrabold text-xl text-white border-l-2 border-glicine-400 pl-2.5">Stato di Indicizzazione &amp; file SEO</h3>
          <p className="text-xs text-glicine-400 mt-1">Stato dei file richiesti per l'indicizzazione e posizionamento SEO</p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: "Sitemap XML", path: "/sitemap.xml", desc: "Mappa del sito per crawler", status: "Next.js Default", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
            { name: "Robots TXT", path: "/robots.txt", desc: "Direttive crawler motori di ricerca", status: "Configurato", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
            { name: "Google Analytics", path: "#", desc: "Codice di tracciamento GA4", status: "In Attesa / Da Configurare", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
            { name: "Google Search Console", path: "#", desc: "Verifica proprietà dominio", status: "In Attesa / Da Configurare", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-glicine-950/40 border border-glicine-900 text-sm">
              <div>
                <strong className="text-white block font-outfit font-bold">{item.name}</strong>
                <span className="text-glicine-500 text-xs mt-0.5">{item.desc}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${item.color}`}>{item.status}</span>
                {item.path !== "#" && (
                  <a href={item.path} target="_blank" rel="noopener noreferrer" className="text-glicine-500 hover:text-white transition-colors" title="Visualizza">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
