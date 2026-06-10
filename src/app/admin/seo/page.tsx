"use client";

import React, { useEffect, useState } from "react";
import { 
  Check, 
  X, 
  Globe, 
  Save,
  Tag,
  Edit3
} from "lucide-react";

interface PageSeo {
  path: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
}

const defaultSeoData: PageSeo[] = [
  {
    path: "/",
    name: "Homepage",
    title: "Monica Fiocco | Counselor ad Approccio Integrato e Psicopedagogista",
    description: "Percorsi di counseling individuale, costellazioni familiari e pedagogia transgenerazionale a Napoli e online con Monica Fiocco per sbloccare le dinamiche interiori.",
    keywords: ["counseling napoli", "costellazioni familiari napoli", "monica fiocco", "psicopedagogista napoli", "crescita personale", "pedagogia transgenerazionale"]
  },
  {
    path: "/chi-sono",
    name: "Chi Sono",
    title: "Chi Sono | Monica Fiocco | Counselor e Formatrice a Napoli",
    description: "Scopri la storia e la metodologia di Monica Fiocco, Counselor Umanistica ad approccio Rogersiano, Psicopedagogista e Formatrice con oltre 25 anni di esperienza.",
    keywords: ["monica fiocco biografia", "counselor rogersiano napoli", "psicopedagogista", "formatrice relazionale"]
  },
  {
    path: "/strumenti/counseling",
    name: "Counseling Umanistico",
    title: "Counseling Umanistico Integrato | Monica Fiocco",
    description: "Colloqui di counseling individuale basati sull'ascolto empatico e l'accettazione incondizionata rogersiana per attivare le tue risorse interne di autorealizzazione.",
    keywords: ["counseling umanistico", "colloquio counseling napoli", "carl rogers", "ascolto empatico", "relazione di aiuto"]
  },
  {
    path: "/strumenti/costellazioni",
    name: "Costellazioni Familiari",
    title: "Costellazioni Familiari e Relazionali | Monica Fiocco",
    description: "Esplora e sciogli i nodi familiari invisibili attraverso il metodo delle costellazioni sistemiche familiari per ritrovare armonia e benessere nelle relazioni.",
    keywords: ["costellazioni familiari", "costellazioni sistemiche", "nodi familiari", "sistemica familiare napoli", "risoluzione dinamiche familiari"]
  },
  {
    path: "/strumenti/pedagogia-transgenerazionale",
    name: "Pedagogia Transgenerazionale",
    title: "Pedagogia Transgenerazionale e Genosociogramma | Monica Fiocco",
    description: "Analisi dell'albero genealogico (genosociogramma) ed esplorazione delle eredità emotive transgenerazionali per liberarsi da ripetizioni inconsce.",
    keywords: ["pedagogia transgenerazionale", "genosociogramma", "albero genealogico emotivo", "psicogenealogia napoli"]
  },
  {
    path: "/strumenti/psicopedagogia",
    name: "Psicopedagogia Relazionale",
    title: "Psicopedagogia Relazionale e Supporto Educativo | Monica Fiocco",
    description: "Consulenza e percorsi educativi per coppie, genitori e professionisti delle relazioni d'aiuto per favorire una genitorialità consapevole ed evolutiva.",
    keywords: ["psicopedagogia relazionale", "supporto genitorialità napoli", "consulenza educativa", "professioni aiuto supervisione"]
  },
  {
    path: "/progetti/fiabe-radice",
    name: "Fiabe Radice",
    title: "Fiabe Radice | Crescita Attraverso la Narrazione | Monica Fiocco",
    description: "Percorsi esperienziali basati sul potere metaforico ed archetipico delle fiabe per far emergere vissuti profondi e favorire la comprensione di sé.",
    keywords: ["fiabe radice", "crescita personale narrazione", "archetipi fiabe", "psicologia delle fiabe napoli"]
  },
  {
    path: "/progetti/murena",
    name: "Metodo M.U.R.E.N.A.",
    title: "Metodo M.U.R.E.N.A. | Risoluzione Conflitti e Comunicazione | Monica Fiocco",
    description: "Un modello teorico-pratico per agevolare l'ascolto, la gestione delle emozioni e la comunicazione assertiva nei contesti educativi, personali e professionali.",
    keywords: ["metodo murena", "gestione conflitti", "comunicazione assertiva", "ascolto attivo napoli"]
  },
  {
    path: "/progetti/formazione",
    name: "Formazione Integrata",
    title: "Formazione Integrata, Seminari e Supervisioni | Monica Fiocco",
    description: "Corsi di aggiornamento e formazione per docenti, educatori, genitori e operatori sociali incentrati sull'empatia, l'ascolto e la facilitazione dei gruppi.",
    keywords: ["formazione docenti napoli", "aggiornamento educatori", "supervisione pedagogica", "corsi comunicazione empatica"]
  },
  {
    path: "/articoli",
    name: "Blog Articoli",
    title: "Blog e Riflessioni | Monica Fiocco | Counselor e Psicopedagogista",
    description: "Approfondimenti, riflessioni e articoli dedicati al counseling, alla pedagogia transgenerazionale, alle relazioni sistemiche e alla crescita personale.",
    keywords: ["blog counseling", "articoli crescita personale", "riflessioni transgenerazionali", "monica fiocco blog"]
  },
  {
    path: "/pubblicazioni",
    name: "Pubblicazioni",
    title: "Pubblicazioni e Libri | Monica Fiocco | Il Filo Che Resta",
    description: "Scopri le opere letterarie e i quaderni di crescita personale scritti da Monica Fiocco. Ordina e acquista direttamente online il libro 'Il filo che resta'.",
    keywords: ["il filo che resta", "monica fiocco libro", "favole radice", "pubblicazioni monica fiocco", "quaderno crescita personale"]
  }
];

export default function AdminSeoPage() {
  const [seoData, setSeoData] = useState<PageSeo[]>([]);
  const [editingPath, setEditingPath] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PageSeo | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Load from localStorage or seed
  useEffect(() => {
    try {
      const stored = localStorage.getItem("monica_pages_seo");
      if (stored) {
        const storedData: PageSeo[] = JSON.parse(stored);
        
        // Merge missing default data (like /pubblicazioni) into local storage
        let updated = [...storedData];
        let hasChanges = false;
        
        defaultSeoData.forEach(defaultPage => {
          const exists = storedData.some(p => p.path === defaultPage.path);
          if (!exists) {
            updated.push(defaultPage);
            hasChanges = true;
          }
        });
        
        if (hasChanges) {
          localStorage.setItem("monica_pages_seo", JSON.stringify(updated));
        }
        setSeoData(updated);
      } else {
        localStorage.setItem("monica_pages_seo", JSON.stringify(defaultSeoData));
        setSeoData(defaultSeoData);
      }
    } catch (e) {
      console.error(e);
      setSeoData(defaultSeoData);
    }
  }, []);

  const handleEditClick = (page: PageSeo) => {
    setEditingPath(page.path);
    setEditForm({
      ...page,
      keywords: [...page.keywords]
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editForm) return;
    const { name, value } = e.target;
    setEditForm(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return;
    const keysArray = e.target.value.split(",").map(k => k.trim());
    setEditForm(prev => prev ? { ...prev, keywords: keysArray } : null);
  };

  const saveSeoChanges = () => {
    if (!editForm) return;
    const updated = seoData.map(page => {
      if (page.path === editForm.path) {
        return editForm;
      }
      return page;
    });

    setSeoData(updated);
    try {
      localStorage.setItem("monica_pages_seo", JSON.stringify(updated));
      showToast("SEO salvato con successo!", "success");
    } catch (e) {
      console.error(e);
      showToast("Errore durante il salvataggio", "info");
    }

    setEditingPath(null);
    setEditForm(null);
  };

  return (
    <div className="space-y-8 relative">
      
      {/* Toast alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-glicine-900 border border-glicine-800 shadow-2xl text-xs font-semibold text-white animate-fade-in">
          <div className={`p-1 rounded-full ${toast.type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"}`}>
            <Check className="h-4 w-4" />
          </div>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Title */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-glicine-400 font-semibold text-xs uppercase tracking-widest font-outfit">Configurazioni SEO</span>
          <h2 className="font-outfit text-3xl font-extrabold text-white">Metatags &amp; Indicizzazione</h2>
          <p className="text-glicine-300/80 text-sm">Visualizza ed aggiorna i metadati nominali caricati dai motori di ricerca.</p>
        </div>
      </section>

      {/* Pages list */}
      <section className="space-y-6">
        {seoData.map((page) => {
          const isEditing = editingPath === page.path;
          return (
            <div key={page.path} className="bg-glicine-900/40 border border-glicine-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 transition-all duration-300">
              
              {/* Page header title */}
              <div className="flex items-center justify-between border-b border-glicine-900 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-glicine-950 text-glicine-300 border border-glicine-900 flex-shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-outfit font-extrabold text-xl text-white">{page.name}</h3>
                    <code className="text-xs text-glicine-400">{page.path}</code>
                  </div>
                </div>

                {!isEditing ? (
                  <button
                    onClick={() => handleEditClick(page)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-glicine-800 hover:bg-glicine-750 text-glicine-300 hover:text-white border border-glicine-700 text-xs font-semibold transition-all duration-300"
                  >
                    <Edit3 className="h-3.5 w-3.5" /> Modifica SEO
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={saveSeoChanges}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-glicine-700 hover:bg-glicine-600 text-white text-xs font-semibold transition-all duration-300 shadow-md"
                    >
                      <Save className="h-3.5 w-3.5" /> Salva
                    </button>
                    <button
                      onClick={() => { setEditingPath(null); setEditForm(null); }}
                      className="p-2 rounded-xl bg-glicine-800 hover:bg-glicine-750 text-glicine-400 hover:text-white border border-glicine-700 transition-all duration-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Page metatags details */}
              {!isEditing ? (
                <div className="grid md:grid-cols-12 gap-6 text-sm">
                  {/* Left block info */}
                  <div className="md:col-span-8 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-glicine-400 uppercase tracking-wider block">Meta Title</span>
                      <strong className="text-white block text-base font-outfit">{page.title}</strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-glicine-400 uppercase tracking-wider block">Meta Description</span>
                      <p className="text-glicine-200 leading-relaxed text-sm">{page.description}</p>
                    </div>
                  </div>
                  {/* Right block keywords */}
                  <div className="md:col-span-4 space-y-2 border-t md:border-t-0 md:border-l border-glicine-900 pt-4 md:pt-0 md:pl-6">
                    <span className="text-[10px] font-bold text-glicine-400 uppercase tracking-wider block mb-1">Keywords</span>
                    <div className="flex flex-wrap gap-1.5">
                      {page.keywords && page.keywords.length > 0 ? (
                        page.keywords.map((key, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-glicine-950 text-glicine-300 text-xs border border-glicine-900 font-medium">
                            <Tag className="h-3 w-3 text-glicine-500" /> {key}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-glicine-550 italic">Nessuna parola chiave inserita</span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Interactive edit form fields */
                <div className="space-y-4 text-sm" onClick={(e) => e.stopPropagation()}>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block">Meta Title</label>
                    <input 
                      type="text" 
                      name="title"
                      value={editForm?.title || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white placeholder-glicine-700 text-sm focus:outline-none focus:border-glicine-400 transition-all font-outfit font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block">Meta Description</label>
                    <textarea 
                      name="description"
                      rows={3}
                      value={editForm?.description || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white placeholder-glicine-700 text-sm focus:outline-none focus:border-glicine-400 transition-all resize-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block">Keywords (separate da virgola)</label>
                    <input 
                      type="text" 
                      name="keywords"
                      value={editForm?.keywords.join(", ") || ""}
                      onChange={handleKeywordsChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white placeholder-glicine-700 text-sm focus:outline-none focus:border-glicine-400 transition-all"
                    />
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </section>

    </div>
  );
}
