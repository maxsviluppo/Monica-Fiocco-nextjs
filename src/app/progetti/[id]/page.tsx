"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronRight, 
  Calendar,
  BookOpen,
  Users,
  Target,
  FileText,
  Send
} from "lucide-react";
import Link from "next/link";

// Detailed data for each project
const projectsData: Record<string, {
  title: string;
  tagline: string;
  tag: string;
  heroImage: string;
  longDesc: string;
  objectives: string[];
  audience: string;
  structure: string;
  activities: string[];
}> = {
  "fiabe-radice": {
    title: "Fiabe Radice",
    tagline: "Un percorso di crescita ed esplorazione interiore attraverso il potere archetipico delle fiabe.",
    tag: "Crescita attraverso la narrazione",
    heroImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
    longDesc: "Il progetto 'Fiabe Radice' nasce dall'idea che le fiabe tradizionali non siano semplici storie per bambini, bensì custodi di profondi archetipi psicologici e passaggi di crescita universali. Nel corso degli incontri, le fiabe vengono utilizzate come ponti metaforici per entrare in contatto con il proprio mondo interno, identificare bisogni inespressi, riconoscere le proprie 'ombre' ed esplorare nuove risorse personali in un clima protetto e creativo.",
    objectives: [
      "Favorire l'auto-ascolto e l'espressione delle proprie emozioni profonde",
      "Esplorare dinamiche personali ed emotive attraverso i personaggi e le trame",
      "Stimolare la capacità creativa e di problem solving esistenziale"
    ],
    audience: "Adulti che desiderano intraprendere un cammino di consapevolezza personale, educatori, genitori ed appassionati di narrazione.",
    structure: "Il percorso si articola in una serie di laboratori esperienziali a cadenza settimanale o mensile, integrando momenti di lettura, visualizzazione guidata, drammatizzazione ed elaborazione artistica.",
    activities: [
      "Lettura e analisi analogica di fiabe della tradizione popolare",
      "Esercizi di scrittura creativa e rielaborazione del finale",
      "Rappresentazioni simboliche dei personaggi chiave nel proprio vissuto"
    ]
  },
  "murena": {
    title: "Metodo M.U.R.E.N.A.",
    tagline: "Un modello formativo ed operativo per facilitare lo sviluppo relazionale e la risoluzione dei conflitti.",
    tag: "Formazione e Sviluppo Relazionale",
    heroImage: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1200&auto=format&fit=crop",
    longDesc: "Il Metodo M.U.R.E.N.A. (Modello di Umanizzazione delle Relazioni e della Negoziazione Attiva) è una metodologia integrata finalizzata alla gestione del conflitto, alla crescita dell'intelligenza emotiva e all'acquisizione di una comunicazione autenticamente costruttiva. Viene applicato in contesti formativi aziendali, scolastici e associativi per disinnescare le escalation comunicative e ricostruire dinamiche di cooperazione empatica.",
    objectives: [
      "Decodificare i bisogni nascosti dietro i comportamenti conflittuali",
      "Apprendere tecniche di ascolto attivo e negoziazione dei bisogni",
      "Creare contesti di lavoro e di vita fondati sul rispetto e sull'umanità"
    ],
    audience: "Professionisti, docenti, team di lavoro, manager, coppie e chiunque desideri migliorare la qualità delle proprie relazioni quotidiane.",
    structure: "Seminari intensivi di formazione, supervisioni di gruppo e percorsi di affiancamento su misura per organizzazioni e contesti specifici.",
    activities: [
      "Role-playing e simulazioni guidate di scenari ad alto tasso di conflitto",
      "Analisi dei pattern comunicativi disfunzionali personali e di gruppo",
      "Laboratori pratici sul linguaggio dei sentimenti e dei bisogni"
    ]
  },
  "formazione": {
    title: "Formazione Integrata",
    tagline: "Seminari teorico-pratici e percorsi di supervisione per le professioni educative e d'aiuto.",
    tag: "Seminari & Supervisioni",
    heroImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    longDesc: "La 'Formazione Integrata' raccoglie l'ampia offerta di corsi, laboratori e giornate di studio pensate per aggiornare e sostenere chi lavora quotidianamente in ambito educativo e sociale. L'obiettivo centrale è fornire strumenti operativi per consolidare la relazione d'aiuto, prevenire il burnout professionale e favorire un apprendimento di tipo cooperativo ed inclusivo.",
    objectives: [
      "Fornire chiavi di lettura psicopedagogiche aggiornate per interpretare il disagio scolastico",
      "Sostenere docenti ed educatori nella gestione delle classi difficili",
      "Condividere buone pratiche di co-progettazione tra scuola, famiglia e territorio"
    ],
    audience: "Insegnanti di ogni ordine e grado, educatori professionali, assistenti sociali, pedagogisti e genitori desiderosi di confrontarsi.",
    structure: "Moduli formativi teorico-esperienziali accreditabili, attivabili su richiesta di istituti scolastici o fruibili individualmente durante l'anno accademico.",
    activities: [
      "Lezioni interattive su metodologie educative attive e non-direttive",
      "Supervisione e analisi di casi complessi presentati dai partecipanti",
      "Circle-time e dinamiche di gruppo per favorire lo scambio di buone pratiche"
    ]
  }
};

export default function ProgettoPage() {
  const params = useParams();
  const id = params?.id as string;

  const project = projectsData[id];

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h1 className="font-outfit text-3xl font-bold text-glicine-900 mb-4">Progetto non trovato</h1>
        <p className="text-slate-500 mb-8 text-center max-w-md">La pagina del progetto richiesto non esiste o è stata spostata.</p>
        <Link href="/" className="px-6 py-3 rounded-full bg-glicine-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-glicine-800 transition-colors">
          Torna alla Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[55vh] min-h-[380px] overflow-hidden bg-glicine-950">
        <div className="absolute inset-0">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover object-center filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-glicine-950/70 to-glicine-950/20" />
        </div>

        <div className="absolute inset-0 z-10 flex items-end">
          <div className="max-w-5xl mx-auto px-6 w-full pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Link 
                href="/#progetti"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-glicine-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Progetti
              </Link>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-glicine-300">
                  {project.tag}
                </span>
                <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                  {project.title}
                </h1>
              </div>
              <p className="text-glicine-105 max-w-3xl text-lg font-light leading-relaxed">
                {project.tagline}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CONTENT */}
      <section className="max-w-5xl mx-auto px-6 mt-16">
        <div className="grid md:grid-cols-12 gap-12">
          
          {/* Left Column: Description & Activities */}
          <div className="md:col-span-8 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-outfit text-2xl font-bold text-glicine-900 flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-glicine-600" /> Presentazione del Progetto
              </h2>
              <p className="text-slate-600 font-light leading-relaxed text-base sm:text-lg">
                {project.longDesc}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 bg-glicine-50/30 p-8 rounded-3xl border border-glicine-100/50"
            >
              <h2 className="font-outfit text-2xl font-bold text-glicine-900 flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-glicine-600" /> Struttura e Metodologia
              </h2>
              <p className="text-slate-600 font-light leading-relaxed">
                {project.structure}
              </p>
            </motion.div>

            {/* Activities Details */}
            <div className="space-y-6">
              <h2 className="font-outfit text-2xl font-bold text-glicine-900 flex items-center gap-2.5">
                <Target className="w-5 h-5 text-glicine-600" /> Attività Previste
              </h2>
              <div className="space-y-4">
                {project.activities.map((act, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm"
                  >
                    <div className="h-8 w-8 rounded-lg bg-glicine-100 text-glicine-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-600 font-light leading-relaxed">
                      {act}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Audience & Action */}
          <div className="md:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white border border-glicine-100 rounded-3xl p-8 shadow-sm space-y-6"
            >
              <div className="space-y-4">
                <h3 className="font-outfit font-bold text-lg text-glicine-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-glicine-500" /> A chi si rivolge
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  {project.audience}
                </p>
              </div>

              <div className="border-t border-glicine-50 pt-6 space-y-4">
                <h3 className="font-outfit font-bold text-lg text-glicine-900">
                  Obiettivi Didattici
                </h3>
                <ul className="space-y-3">
                  {project.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-500 font-light leading-relaxed">
                      <ChevronRight className="w-3.5 h-3.5 text-glicine-500 mt-0.5 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-glicine-950 text-white rounded-3xl p-8 shadow-xl space-y-6"
            >
              <h3 className="font-outfit font-extrabold text-xl leading-tight">
                Richiesta Progetto
              </h3>
              <p className="text-glicine-200 text-xs font-light leading-relaxed">
                Richiedi informazioni per attivare questo progetto.
              </p>

              <form 
                action="mailto:monica.fiocco.2012@gmail.com" 
                method="POST" 
                encType="text/plain"
                className="space-y-4 text-slate-900"
              >
                <input 
                  type="hidden" 
                  name="Progetto Richiesto" 
                  value={project.title} 
                />
                <input 
                  type="text" 
                  name="Nome"
                  required
                  placeholder="Nome Completo"
                  className="w-full px-4 py-3 rounded-full text-xs bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-glicine-300 transition-colors"
                />
                <input 
                  type="email" 
                  name="Email"
                  required
                  placeholder="La tua E-mail"
                  className="w-full px-4 py-3 rounded-full text-xs bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-glicine-300 transition-colors"
                />
                <input 
                  type="tel" 
                  name="Telefono"
                  required
                  placeholder="Numero di Cellulare"
                  className="w-full px-4 py-3 rounded-full text-xs bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-glicine-300 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-glicine-400 text-glicine-950 font-bold text-xs uppercase tracking-wider hover:bg-glicine-300 transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  Richiedi Informazioni <Send className="w-3 h-3" />
                </button>
              </form>

              <div className="text-center pt-2">
                <Link
                  href="/#contatti"
                  className="text-[10px] uppercase tracking-wider text-glicine-300 hover:text-white transition-colors"
                >
                  Oppure vai ai contatti completi
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. FOOTER BACK LINK */}
      <section className="max-w-5xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 text-center">
        <Link 
          href="/#progetti"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-glicine-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Torna a tutti i progetti
        </Link>
      </section>

    </div>
  );
}
