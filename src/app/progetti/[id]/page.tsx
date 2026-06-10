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
  heroImagePosition?: string;
  longDesc: string;
  paragraphs?: string[];
  highlight?: string;
  closingNote?: string;
  objectives: string[];
  audience: string;
  audienceList?: string[];
  audienceParagraphs?: string[];
  sections?: { title: string; paragraphs: string[] }[];
  structure: string;
  activities: string[];
  book?: {
    cover: string;
    title: string;
    author: string;
    subtitle: string;
    note: string;
    publisher: string;
  };
}> = {
  "fiabe-radice": {
    title: "Fiabe Radice",
    tagline: "Percorsi di consapevolezza attraverso la narrazione simbolica e la pedagogia transgenerazionale.",
    tag: "Crescita attraverso la narrazione",
    heroImage: "/radici.png",
    heroImagePosition: "object-center",
    longDesc: "",
    paragraphs: [
      "Fiabe Radice è un progetto di crescita personale e accompagnamento evolutivo che ho ideato nel mio percorso come pedagogista e counselor ad approccio integrato, dove narrazione, lavoro simbolico e consapevolezza sistemica si intrecciano per favorire processi profondi di trasformazione interiore.",
      "Nasce dall'ascolto profondo delle storie individuali e familiari, là dove parole non dette, emozioni trattenute e vissuti irrisolti continuano ad agire nel presente. Attraverso la forma della fiaba, questo progetto offre uno spazio sicuro e trasformativo per riconoscere, accogliere e rielaborare le memorie emotive, anche transgenerazionali.",
    ],
    highlight:
      "Le fiabe radice non sono semplici racconti, ma veri e propri strumenti di consapevolezza: linguaggi simbolici capaci di parlare direttamente all'inconscio, aggirando le difese razionali e favorendo un contatto autentico con il proprio mondo interiore.",
    objectives: [
      "Sciogliere i \"nodi\" emotivi e riconoscere i condizionamenti ereditati",
      "Ritrovare una posizione più autentica nella propria storia",
      "Restituire significato e dignità alle esperienze vissute",
    ],
    audience: "Fiabe Radice si rivolge a chi sente il bisogno di:",
    audienceList: [
      "comprendere dinamiche familiari profonde",
      "trasformare schemi ripetitivi",
      "ritrovare la propria voce emotiva",
      "riconnettersi alle proprie radici senza esserne prigioniero",
    ],
    structure:
      "Ogni percorso integra elementi complementari che favoriscono un'esplorazione profonda e trasformativa:",
    activities: [
      "Narrazione simbolica e archetipica",
      "Schede emozionali per l'auto-esplorazione",
      "Meditazioni guidate",
      "Gesti simbolici trasformativi",
    ],
    closingNote:
      "È un invito a riscrivere la propria narrazione interiore, trasformando il passato in risorsa e aprendo nuovi spazi di libertà, presenza e autenticità.",
    book: {
      cover: "/copertina.png",
      title: "Il filo che resta",
      author: "Monica Fiocco",
      subtitle:
        "Le fiabe radice per districare i \"nodi\" emotivi del femminile nelle memorie profonde ed in quelle transgenerazionali",
      note: "Raccogliere i frammenti, riannodarli con dolcezza, e trasformarli in senso",
      publisher: "Terresommerse",
    },
  },
  "murena": {
    title: "Metodo M.U.R.E.N.A.",
    tagline: "Psicopedagogia relazionale per neurodiversità e autismo",
    tag: "Neurodiversità & Psicopedagogia Relazionale",
    heroImage: "/murena.png",
    heroImagePosition: "object-left",
    longDesc: "",
    paragraphs: [
      "Il Metodo M.U.R.E.N.A. nasce dall'esperienza professionale e umana di Monica Fiocco, pedagogista e counselor ad approccio integrato, come percorso di psicopedagogia relazionale dedicato alla neurodiversità, all'autismo e alle situazioni di fragilità evolutiva.",
      "M.U.R.E.N.A. significa Metodo Umano Empatico e Risonante per le Neurodiversità e l'Autismo: un approccio che mette al centro non la diagnosi, ma la persona; non la prestazione, ma la relazione; non il protocollo, ma l'incontro autentico.",
    ],
    highlight:
      "Alla base del metodo c'è una visione profonda: la relazione educativa non è solo uno strumento di lavoro, ma il luogo stesso in cui può avvenire il cambiamento. Ogni crescita, ogni apprendimento, ogni apertura possibile nasce dentro un legame fondato su fiducia, continuità, ascolto, empatia e reciprocità.",
    sections: [
      {
        title: "Un approccio umano alla neurodiversità",
        paragraphs: [
          "Nel Metodo M.U.R.E.N.A. la neurodiversità viene accolta come una forma di potenziale ancora da incontrare, comprendere e sostenere. Non è uno spazio da correggere, ma una bellezza da riconoscere nella sua unicità, nei suoi tempi e nei suoi modi.",
          "Per questo il metodo invita a rallentare: a sospendere il giudizio, ad ascoltare ciò che emerge oltre il comportamento visibile, a creare condizioni relazionali in cui la persona possa sentirsi vista, rispettata e accompagnata.",
        ],
      },
      {
        title: "La relazione empatica e risonante",
        paragraphs: [
          "Il cuore del Metodo M.U.R.E.N.A. è la relazione empatica e risonante: uno spazio vivo in cui educatore, bambino, ragazzo o adulto accompagnato si incontrano non solo attraverso le parole, ma anche attraverso emozioni, presenza, sguardi, silenzi, ritmo e fiducia.",
          "Le neuroscienze confermano quanto la relazione sia fondamentale nei processi di apprendimento, regolazione emotiva e sviluppo. In particolare, la risonanza empatica e il ruolo dei neuroni specchio mostrano come il cervello umano cresca e si trasformi dentro esperienze relazionali significative.",
        ],
      },
      {
        title: "Educare significa abitare la relazione",
        paragraphs: [
          "Nel Metodo M.U.R.E.N.A. l'operatore non è un esperto distante, ma una presenza consapevole. Educare non significa applicare tecniche in modo automatico, ma saper abitare la relazione con responsabilità, umiltà e apertura.",
          "Ogni percorso diventa così un'esperienza condivisa, in cui anche chi accompagna è chiamato a un lavoro interiore: osservare la propria postura, riconoscere le proprie risonanze, imparare a stare nella complessità senza ridurre l'altro a una definizione.",
        ],
      },
      {
        title: "Un metodo per restituire valore all'incontro",
        paragraphs: [
          "Il Metodo M.U.R.E.N.A. propone una scelta controcorrente: tornare all'essenziale dell'educazione, cioè all'incontro umano.",
          "In un tempo che spesso privilegia velocità, standardizzazione e risultati misurabili, questo metodo ricorda che ogni persona ha bisogno di essere incontrata nella propria unicità. La relazione diventa allora il primo spazio di cura, possibilità e trasformazione.",
        ],
      },
    ],
    objectives: [
      "Mettere al centro la persona, non la diagnosi",
      "Costruire relazioni fondate su fiducia, ascolto, empatia e reciprocità",
      "Accogliere la neurodiversità come potenziale da riconoscere e sostenere",
      "Restituire valore all'incontro umano nell'accompagnamento educativo",
    ],
    audience: "A chi si rivolge",
    audienceParagraphs: [
      "Il Metodo M.U.R.E.N.A. si rivolge a bambini, ragazzi e adulti con neurodiversità, autismo, fragilità relazionali o difficoltà nei processi educativi ed evolutivi.",
      "È pensato anche per famiglie, educatori, insegnanti e operatori che desiderano sviluppare una postura più consapevole, empatica e rispettosa nella relazione di cura e accompagnamento.",
    ],
    structure: "",
    activities: [],
    closingNote:
      "Vuoi conoscere il Metodo M.U.R.E.N.A. o avviare un percorso di accompagnamento psicopedagogico? Contattami per una consulenza o per ricevere maggiori informazioni sui percorsi dedicati a neurodiversità, autismo e relazione educativa.",
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
            className={`w-full h-full object-cover filter brightness-50 ${project.heroImagePosition || "object-center"}`}
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
              <p className="text-white/95 max-w-3xl text-lg font-light leading-relaxed">
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
              <div className="space-y-5 text-slate-600 font-light leading-relaxed text-base sm:text-lg">
                {(project.paragraphs ?? [project.longDesc]).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            {project.highlight && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border-l-4 border-glicine-400 bg-glicine-50/60 rounded-r-3xl p-8"
              >
                <p className="font-outfit text-lg sm:text-xl font-light italic text-glicine-900 leading-relaxed">
                  {project.highlight}
                </p>
              </motion.div>
            )}

            {project.book && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#b85c38] via-glicine-900 to-glicine-950 p-6 sm:p-8 md:p-10 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-center sm:items-start">
                  <div className="shrink-0 w-[min(100%,220px)] sm:w-[200px] md:w-[220px]">
                    <img
                      src={project.book.cover}
                      alt={`Copertina del libro ${project.book.title} di ${project.book.author}`}
                      className="w-full h-auto rounded-xl shadow-2xl ring-1 ring-white/20"
                    />
                  </div>
                  <div className="space-y-4 text-center sm:text-left text-white flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-glicine-200/80">
                      Il libro del progetto
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm text-glicine-200/90 font-light">{project.book.author}</p>
                      <h3 className="font-outfit text-2xl sm:text-3xl font-extrabold leading-tight">
                        {project.book.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-glicine-100/90 font-light leading-relaxed">
                      {project.book.subtitle}
                    </p>
                    <p className="font-outfit text-base sm:text-lg font-light italic text-glicine-200/80 leading-relaxed">
                      ({project.book.note})
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-glicine-300/70 pt-1">
                      {project.book.publisher}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {project.sections ? (
              <div className="space-y-8">
                {project.sections.map((section, idx) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="space-y-5 p-8 rounded-3xl border border-glicine-100/50 bg-glicine-50/30"
                  >
                    <h2 className="font-outfit text-xl sm:text-2xl font-bold text-glicine-900 leading-snug">
                      {section.title}
                    </h2>
                    <div className="space-y-4 text-slate-600 font-light leading-relaxed text-base">
                      {section.paragraphs.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <>
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

                {project.activities.length > 0 && (
                  <div className="space-y-6">
                    <h2 className="font-outfit text-2xl font-bold text-glicine-900 flex items-center gap-2.5">
                      <Target className="w-5 h-5 text-glicine-600" /> {project.highlight ? "Ogni percorso integra" : "Attività Previste"}
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
                )}
              </>
            )}

            {project.closingNote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-glicine-200 bg-glicine-50/50 p-8 shadow-sm"
              >
                <p className="text-slate-700 font-light leading-relaxed text-base sm:text-lg">
                  {project.closingNote}
                </p>
                {project.sections && (
                  <Link
                    href="/#contatti"
                    className="inline-flex mt-6 items-center gap-2 text-xs font-bold uppercase tracking-wider text-glicine-700 hover:text-glicine-950 transition-colors"
                  >
                    Vai ai contatti <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </motion.div>
            )}
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
                {project.audienceList ? (
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600 font-light leading-relaxed">
                      {project.audience}
                    </p>
                    <ul className="space-y-3">
                      {project.audienceList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-500 font-light leading-relaxed">
                          <ChevronRight className="w-3.5 h-3.5 text-glicine-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : project.audienceParagraphs ? (
                  <div className="space-y-4">
                    {project.audienceParagraphs.map((paragraph, idx) => (
                      <p key={idx} className="text-sm text-slate-600 font-light leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    {project.audience}
                  </p>
                )}
              </div>

              <div className="border-t border-glicine-50 pt-6 space-y-4">
                <h3 className="font-outfit font-bold text-lg text-glicine-900">
                  {project.highlight || project.sections ? "Obiettivi del percorso" : "Obiettivi Didattici"}
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
                action="mailto:monicafiocco00@gmail.com" 
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
