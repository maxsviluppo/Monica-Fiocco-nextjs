export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  author: string;
  isFeatured: boolean;
  isFavorite: boolean;
  content?: string;
};

export const articles: Article[] = [
  {
    slug: "linguaggio-emozioni-relazione-aiuto",
    title: "Il linguaggio delle emozioni nella relazione di aiuto",
    category: "Counseling",
    date: "12 Giugno 2026",
    readTime: "6 min",
    excerpt:
      "Riconoscere cio che si muove dentro di noi e imparare a nominarlo e il primo passo per trasformare la confusione emotiva in una possibilita di ascolto, scelta e presenza.",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1200&auto=format&fit=crop",
    author: "Monica Fiocco",
    isFeatured: true,
    isFavorite: true,
    content: "Riconoscere ciò che si muove dentro di noi e imparare a nominarlo è il primo passo per trasformare la confusione emotiva in una possibilità di ascolto, scelta e presenza.\n\nLe emozioni non sono nostre nemiche, bensì messaggere preziose che indicano bisogni profondi. Nella relazione di aiuto, imparare a decodificare questo linguaggio corporeo e verbale ci permette di connetterci in modo autentico con l'altro e di accogliere le sue fragilità senza giudizio.",
  },
  {
    slug: "fiabe-archetipi-crescita-personale",
    title: "Fiabe, archetipi e crescita personale",
    category: "Narrazione",
    date: "20 Giugno 2026",
    readTime: "5 min",
    excerpt:
      "Le fiabe non parlano soltanto all'infanzia: custodiscono immagini profonde, passaggi interiori e simboli capaci di accompagnare l'adulto verso nuove comprensioni di se.",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1200&auto=format&fit=crop",
    author: "Monica Fiocco",
    isFeatured: false,
    isFavorite: true,
    content: "Le fiabe non parlano soltanto all'infanzia: custodiscono immagini profonde, passaggi interiori e simboli capaci di accompagnare l'adulto verso nuove comprensioni di sé.\n\nAttraverso il viaggio dell'eroe e gli archetipi che popolano i racconti tradizionali, possiamo ritrovare tracce del nostro vissuto personale e riscoprire risorse sopite in grado di guidarci nelle sfide quotidiane.",
  },
  {
    slug: "eredita-familiari-invisibili",
    title: "Eredita familiari invisibili: come riconoscerle",
    category: "Transgenerazionale",
    date: "2 Luglio 2026",
    readTime: "7 min",
    excerpt:
      "Alcune fatiche personali sembrano non nascere solo dalla nostra storia individuale. Uno sguardo transgenerazionale puo restituire ordine, senso e respiro.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    author: "Monica Fiocco",
    isFeatured: false,
    isFavorite: true,
    content: "Alcune fatiche personali sembrano non nascere solo dalla nostra storia individuale. Uno sguardo transgenerazionale può restituire ordine, senso e respiro.\n\nComprendere le eredità emotive invisibili che ci collegano ai nostri antenati ci permette di sciogliere i nodi del passato familiare e di camminare nel presente con una ritrovata leggerezza e libertà di scelta.",
  },
  {
    slug: "educare-relazione-presenza-confini-ascolto",
    title: "Educare alla relazione: presenza, confini e ascolto",
    category: "Psicopedagogia",
    date: "15 Luglio 2026",
    readTime: "8 min",
    excerpt:
      "Nei contesti educativi la relazione e il primo strumento di lavoro: richiede cura, confini chiari, ascolto attivo e una postura capace di sostenere senza sostituirsi.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    author: "Monica Fiocco",
    isFeatured: false,
    isFavorite: false,
    content: "Nei contesti educativi la relazione è il primo strumento di lavoro: richiede cura, confini chiari, ascolto attivo e una postura capace di sostenere senza sostituirsi.\n\nAccompagnare l'altro nel suo percorso evolutivo significa saper abitare la relazione con presenza consapevole, definendo uno spazio sicuro all'interno del quale la persona possa esprimere se stessa in totale libertà.",
  },
  {
    slug: "costellazioni-sguardo-sistemico",
    title: "Costellazioni familiari: uno sguardo sistemico",
    category: "Costellazioni",
    date: "24 Luglio 2026",
    readTime: "6 min",
    excerpt:
      "Portare alla luce dinamiche familiari profonde permette di osservare con delicatezza cio che agisce nelle relazioni e di aprire possibilita nuove.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    author: "Monica Fiocco",
    isFeatured: false,
    isFavorite: false,
    content: "Portare alla luce dinamiche familiari profonde permette di osservare con delicatezza ciò che agisce nelle relazioni e di aprire possibilità nuove.\n\nAttraverso il metodo fenomenologico e sistemico, le costellazioni offrono una mappa visiva ed emotiva dei legami familiari, aiutandoci a reintegrare gli esclusi e a rimettere in circolo l'amore e l'equilibrio interrotto.",
  },
  {
    slug: "burnout-professioni-aiuto",
    title: "Prevenire il burnout nelle professioni di aiuto",
    category: "Formazione",
    date: "31 Luglio 2026",
    readTime: "9 min",
    excerpt:
      "Chi accompagna gli altri ha bisogno di spazi di supervisione, confini sostenibili e strumenti per riconoscere il proprio carico emotivo.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    author: "Monica Fiocco",
    isFeatured: false,
    isFavorite: false,
    content: "Chi accompagna gli altri ha bisogno di spazi di supervisione, confini sostenibili e strumenti per riconoscere il proprio carico emotivo.\n\nLa prevenzione del burnout passa attraverso la consapevolezza dei propri limiti e la cura della propria ecologia interiore, garantendo così una qualità dell'ascolto che sia sempre risonante, empatica ed efficace.",
  },
];

export const articleCategories = ["Tutti", ...Array.from(new Set(articles.map((article) => article.category)))];
