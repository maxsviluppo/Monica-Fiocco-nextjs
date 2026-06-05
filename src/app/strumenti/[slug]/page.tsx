"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Heart, 
  Sparkles, 
  BookOpen, 
  UserCheck, 
  ArrowLeft, 
  ChevronRight, 
  Calendar,
  Info,
  Layers,
  Compass,
  Send
} from "lucide-react";
import Link from "next/link";

// Detailed data for each therapeutic tool
const toolsData: Record<string, {
  title: string;
  subtitle: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  heroImage: string;
  longDesc: string;
  points: { title: string; desc: string }[];
  methodology: string;
  benefits: string[];
}> = {
  "counseling": {
    title: "Counseling Umanistico",
    subtitle: "Counseling Umanistico ad Approccio Integrato",
    tagline: "Una “grammatica relazionale” di aiuto e sostegno alla persona per fare chiarezza interiore, ritrovare contatto con le proprie risorse e sviluppare autonomia.",
    icon: Heart,
    heroImage: "/counseling-hero-new.jpg",
    longDesc: "Il counseling è un approccio e una disciplina strutturata con una “grammatica relazionale” di aiuto e sostegno alla persona, che si realizza nella costruzione di uno spazio di ascolto attivo, empatico e non giudicante, in cui si accompagna il singolo, o il gruppo a fare chiarezza interiore, e a ritrovare contatto con le proprie risorse interiori. Attraverso un percorso di counseling è possibile sviluppare maggiore consapevolezza, autonomia nelle scelte e benessere emotivo; il processo attiva una maggiore chiarezza sui propri vissuti interiori, evitando schemi ripetitivi, riducendo i pregiudizi appresi e migliorando le proprie competenze comunicative e relazionali. Il percorso offre maggiore autonomia e fiducia in se stessi, riporta alla propria responsabilità le scelte, aiutando la persona a tener conto non solo degli aspetti cognitivi ma anche di quelli emotivi, motore di trasformazione e cambiamento. Come asseriva Carl Rogers: “Quello che sono è abbastanza, se solo posso esserlo”.",
    methodology: "Il mio lavoro si basa su un approccio umanistico olistico e socio-educativo integrato, che considera la persona nella sua globalità: corpo, emozioni, mente e dimensione relazionale. Il percorso unisce ascolto attivo ed empatico, comunicazione consapevole, lavoro sulla consapevolezza emotiva e valorizzazione del potenziale umano. L'esperienza ultraventennale nell'ambito del counseling e della formazione ha dato vita a un metodo che integra aspetti umanistici educativi, relazionali e olistici. Si sviluppa attraverso colloqui individuali, in un clima di ascolto, rispetto e riservatezza. La durata e la frequenza degli incontri vengono concordate insieme, in base alle esigenze della persona.",
    benefits: [
      "Affrontare momenti di cambiamento o crisi",
      "Migliorare la qualità delle relazioni personali e lavorative",
      "Gestire stress, confusione emotiva o blocchi decisionali",
      "Sviluppare autostima, consapevolezza e valorizzazione del Sé"
    ],
    points: [
      {
        title: "Chi è il Counselor?",
        desc: "Un professionista della relazione di aiuto che facilita processi di crescita personale, orientamento e trasformazione, valorizzando le risorse già presenti senza fornire soluzioni preconfezionate."
      },
      {
        title: "A chi è rivolto?",
        desc: "Indicato per adulti e giovani adulti che desiderano conoscersi più profondamente, migliorare la propria qualità di vita, attraversare momenti di ridefinizione o rafforzare competenze relazionali."
      },
      {
        title: "Counseling e Psicoterapia",
        desc: "Non è psicoterapia e non si occupa di diagnosi o trattamento di patologie. È un intervento di crescita, prevenzione e sostegno al benessere orientato all'autonomia."
      }
    ]
  },
  "costellazioni": {
    title: "Costellazioni Familiari",
    subtitle: "Dinamiche Sistemiche",
    tagline: "Le Costellazioni Familiari Sistemiche permettono di portare alla luce dinamiche profonde e memorie transgenerazionali, favorendo consapevolezza e trasformazione per ritrovare equilibrio interiore.",
    icon: Sparkles,
    heroImage: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200&auto=format&fit=crop",
    longDesc: "Le costellazioni familiari e sistemiche (teorizzate da Bert Hellinger) sono sia un metodo che un approccio di sviluppo della coscienza, utilissimo alla nostra crescita personale. Sono in grado di farci “vedere”, illuminando di consapevolezza, alcune dinamiche profonde che ci portiamo cucite addosso come una specie di destino invisibile. L'inconscio familiare è come un grande scantinato ricchissimo di memorie emotive che attraversa il tempo e lo spazio in modo longitudinale, in una specie di tempo sempre presente. In questo 'campo familiare' o 'campo morfogenetico' sono conservate le memorie emozionali dei nostri antenati, ed alcune di esse, rimaste incompiute, si sovrappongono alle nostre esistenze in attesa di una soluzione equilibrata. Come diceva C.G. Jung: 'Tutto ciò che non affiora a livello della coscienza diventa un destino'.",
    methodology: "La fusione tra Counseling e Costellazioni Familiari offre una sintesi straordinaria: il processo delle costellazioni è fenomenologico e sistemico, con un profondo significato pedagogico, mentre il Counseling ad Approccio Integrato funge da 'filo di Arianna' facilitandone l'accoglienza da parte della mente razionale ed emotiva. Durante l'esperienza (come nel seminario 'Destini Invisibili'), attraverso il cercatore, i suoi rappresentanti posti nel campo di coscienza ed il supporto del facilitatore, le gestalt che si producono offrono informazioni preziose sui legami tra la condizione attuale e gli schemi inconsci familiari, in un clima di risonanza empatica e totale assenza di giudizio.",
    benefits: [
      "Vedere le dinamiche profonde ereditate dal campo familiare",
      "Svincolarsi dai condizionamenti mentali e ripetizioni sistemiche",
      "Integrare l'esperienza fenomenologica nel proprio vissuto razionale ed emotivo",
      "Rivelare le trame invisibili per trasformarsi da attori ad autori della propria realtà"
    ],
    points: [
      {
        title: "Bert Hellinger",
        desc: "Lo studioso e ricercatore che ha integrato teologia, psicoanalisi, approccio umanistico e sistemico per fondare questo metodo negli anni 80."
      },
      {
        title: "Il Campo Familiare",
        desc: "Un archivio di memorie emotive transgenerazionali che attraversa il tempo, in attesa di una soluzione equilibrata."
      },
      {
        title: "Destini Invisibili",
        desc: "Seminario esperienziale per svelare l'ordito delle trame invisibili e orientare positivamente la propria consapevolezza."
      }
    ]
  },
  "pedagogia-transgenerazionale": {
    title: "Pedagogia Transgenerazionale",
    subtitle: "Educare partendo dalla storia che abita ognuno",
    tagline: "Molte delle difficoltà che emergono nei percorsi di crescita non appartengono soltanto alla biografia personale, ma affondano le loro radici in una storia familiare più ampia, che ci precede e ci attraversa.",
    icon: BookOpen,
    heroImage: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1200&auto=format&fit=crop",
    longDesc: "La pedagogia transgenerazionale rappresenta una chiave di lettura essenziale e una postura interiore di profonda consapevolezza. Ci insegna ad ampliare lo sguardo: dal sintomo alla storia, dal comportamento alle relazioni, dalla richiesta di “aggiustamento” al bisogno autentico di riconoscimento. Ciò che si manifesta come difficoltà educativa, fragilità emotiva o disagio può in alcuni casi esprimere un’eredità invisibile che chiede di essere vista, accolta e compresa. Il bambino — o l’adulto — non è mai considerato come un problema da risolvere, bensì come un portatore di significati, una persona che attraverso il proprio vissuto rende visibile ciò che, nel sistema familiare o relazionale, è rimasto nascosto. Questo significa assumersi la responsabilità etica di ascoltare con profondità ciò che si muove sotto la superficie della storia che incontriamo nell’altro.",
    methodology: "Educare, in questa visione, è prima di tutto un atto di cura che riguarda l'intero sistema di relazioni. Si attribuisce un significato più ampio a ciò che accade per restituire respiro, comprensione e nuove prospettive. Il corpo, le emozioni, il linguaggio simbolico e le dinamiche affettive occupano un ruolo centrale, poiché è attraverso di essi che la memoria intergenerazionale trova spesso espressione, consentendo di abitare la propria vita con maggiore presenza senza portare pesi che appartengono alle generazioni precedenti.",
    benefits: [
      "Integrare lo sguardo transgenerazionale come atto di cura dell'intero sistema di relazioni",
      "Esprimere e sciogliere la memoria intergenerazionale attraverso il corpo e le emozioni",
      "Abitare la propria vita con maggiore presenza, verità e libertà",
      "Dare dignità alle storie che ci hanno preceduto facilitando chi viene dopo"
    ],
    points: [
      {
        title: "Sguardo Ampliato",
        desc: "Passare dall'osservazione del singolo sintomo o comportamento alla comprensione profonda della storia relazionale complessiva."
      },
      {
        title: "A chi si rivolge?",
        desc: "Genitori, educatori, insegnanti, professionisti della cura e chiunque senta che la propria crescita richiede uno sguardo profondo."
      },
      {
        title: "Postura Interiore",
        desc: "Un cammino vivo che intreccia educazione, cura, ricerca e responsabilità etica per accogliere i dolori senza nome e fedeltà invisibili."
      }
    ]
  },
  "psicopedagogia": {
    title: "Psicopedagogia Relazionale",
    subtitle: "Mettere al centro la relazione come strumento di crescita",
    tagline: "Un approccio integrato, frutto di anni di studio e approfondimento che unisce la pedagogia e la psicologia, mettendo al centro la relazione come principale strumento di crescita, apprendimento e trasformazione.",
    icon: UserCheck,
    heroImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    longDesc: "La psicopedagogia relazionale si focalizza su come si costruiscono i legami, come si sviluppa il Sé nel contatto con l’altro, e come la qualità della relazione influenza lo sviluppo emotivo, cognitivo e comportamentale. L’essere umano cresce dentro le relazioni, non in isolamento. Pertanto, l'apprendimento, l'identità, l'autostima, la regolazione emotiva e persino i sintomi fisici ed emotivi vengono letti come complessi fenomeni relazionali, e non unicamente come dinamiche del singolo individuo isolato.",
    methodology: "Si utilizzano metodologie attive, esperienziali ed empatiche per favorire lo sblocco relazionale, la comprensione di sé e la crescita integrata. Gli ambiti di applicazione riguardano i contesti educativi, il sostegno alla genitorialità, la scuola, le relazioni familiari, la crescita personale, l'accompagnamento emotivo, il lavoro con bambini e adolescenti, i percorsi di consapevolezza e di inclusione con le persone di abilità diverse.",
    benefits: [
      "Comprendere i fenomeni emotivi e cognitivi a partire dalla qualità delle relazioni",
      "Sviluppare un Sé forte e consapevole nel contatto costruttivo con l'altro",
      "Migliorare l'inclusione, la cooperazione e l'espressione in contesti scolastici o familiari",
      "Attivare percorsi di sostegno alla genitorialità e alla crescita personale"
    ],
    points: [
      {
        title: "Relazione al Centro",
        desc: "La relazione vista come principale catalizzatore e risorsa indispensabile per l'apprendimento e lo sviluppo emotivo."
      },
      {
        title: "Ambiti di Applicazione",
        desc: "Dal sostegno genitoriale ai contesti scolastici, dalle relazioni familiari ai percorsi con bambini, adolescenti e persone con abilità diverse."
      },
      {
        title: "Sviluppo del Sé",
        desc: "Favorire la consapevolezza dei legami e dei condizionamenti esterni, orientando le risposte verso una crescita autentica."
      }
    ]
  }
};

export default function StrumentoPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const tool = toolsData[slug];

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h1 className="font-outfit text-3xl font-bold text-glicine-900 mb-4">Strumento non trovato</h1>
        <p className="text-slate-500 mb-8 text-center max-w-md">La pagina dello strumento richiesto non esiste o è stata spostata.</p>
        <Link href="/" className="px-6 py-3 rounded-full bg-glicine-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-glicine-800 transition-colors">
          Torna alla Home
        </Link>
      </div>
    );
  }

  const ToolIcon = tool.icon;

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden bg-glicine-950">
        <div className="absolute inset-0">
          <img
            src={tool.heroImage}
            alt={tool.title}
            className="w-full h-full object-cover object-center filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-glicine-950/70 to-glicine-950/20" />
        </div>

        {/* Shooting star effect overlay for Costellazioni page */}
        {slug === "costellazioni" && (
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            <motion.div
              initial={{ x: "10%", y: "10%", opacity: 0 }}
              animate={{ 
                x: ["10%", "80%"], 
                y: ["10%", "50%"], 
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                delay: 1.0,
                duration: 2.0,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 5
              }}
              className="absolute w-[120px] h-[1.5px] bg-gradient-to-r from-white via-glicine-300 to-transparent -rotate-[25deg]"
              style={{
                boxShadow: "0 0 10px 1.5px rgba(255, 255, 255, 0.8)"
              }}
            />
          </div>
        )}

        <div className="absolute inset-0 z-10 flex items-end">
          <div className="max-w-5xl mx-auto px-6 w-full pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Link 
                href="/#strumenti"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-glicine-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Strumenti
              </Link>
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-glicine-300">
                  <ToolIcon className="w-4 h-4 text-glicine-400" /> {tool.subtitle}
                </span>
                <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                  {tool.title}
                </h1>
              </div>
              <p className="text-glicine-100 max-w-3xl text-lg font-light leading-relaxed">
                {tool.tagline}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CONTENT CONTAINER */}
      <section className="max-w-5xl mx-auto px-6 mt-16">
        <div className="grid md:grid-cols-12 gap-12">
          
          {/* Main Info */}
          <div className="md:col-span-8 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-outfit text-2xl font-bold text-glicine-900 flex items-center gap-2.5">
                <Info className="w-5 h-5 text-glicine-600" /> Descrizione del Metodo
              </h2>
              <p className="text-slate-600 font-light leading-relaxed text-base sm:text-lg">
                {tool.longDesc}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 bg-glicine-50/30 p-8 rounded-3xl border border-glicine-100/50"
            >
              <h2 className="font-outfit text-2xl font-bold text-glicine-900 flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-glicine-600" /> Come Lavoriamo
              </h2>
              <p className="text-slate-600 font-light leading-relaxed">
                {tool.methodology}
              </p>
            </motion.div>

            {/* Core Points Details */}
            <div className="space-y-8">
              <h2 className="font-outfit text-2xl font-bold text-glicine-900 flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-glicine-600" /> Capisaldi Chiave
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {tool.points.map((pt, idx) => (
                  <motion.div
                    key={pt.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-3"
                  >
                    <h3 className="font-outfit font-bold text-sm text-glicine-800 uppercase tracking-wide leading-tight">
                      {pt.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      {pt.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info & Benefits */}
          <div className="md:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white border border-glicine-100 rounded-3xl p-8 shadow-sm space-y-6"
            >
              <h3 className="font-outfit font-bold text-lg text-glicine-900 border-b border-glicine-50 pb-4">
                Benefici Principali
              </h3>
              <ul className="space-y-4">
                {tool.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 font-light leading-relaxed">
                    <ChevronRight className="w-4 h-4 text-glicine-500 mt-1 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-glicine-950 text-white rounded-3xl p-8 shadow-xl space-y-6"
            >
              <h3 className="font-outfit font-extrabold text-xl leading-tight">
                Richiesta Rapida
              </h3>
              <p className="text-glicine-200 text-xs font-light leading-relaxed">
                Invia una richiesta immediata per questo servizio a Monica Fiocco.
              </p>
              
              <form 
                action="mailto:monica.fiocco.2012@gmail.com" 
                method="POST" 
                encType="text/plain"
                className="space-y-4 text-slate-900"
              >
                <input 
                  type="hidden" 
                  name="Servizio Richiesto" 
                  value={tool.title} 
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
                  Invia Ora <Send className="w-3 h-3" />
                </button>
              </form>

              <div className="text-center pt-2">
                <Link
                  href="/#contatti"
                  className="text-[10px] uppercase tracking-wider text-glicine-300 hover:text-white transition-colors"
                >
                  Oppure vai alla scheda contatti completa
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. FOOTER BACK BUTTON */}
      <section className="max-w-5xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 text-center">
        <Link 
          href="/#strumenti"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-glicine-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Torna a tutti i metodi
        </Link>
      </section>

    </div>
  );
}
