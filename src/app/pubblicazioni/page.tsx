"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Heart, 
  ArrowLeft, 
  Check, 
  ShoppingBag, 
  ExternalLink,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  Download
} from "lucide-react";

export default function PubblicazioniPage() {
  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    notes: "",
    quantity: 1,
    format: "cartaceo" // "cartaceo" | "epub"
  });

  const [checkoutStep, setCheckoutStep] = useState<"idle" | "success">("idle");
  const [orderId, setOrderId] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // PDF.js State
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1); // Left page number (odd)
  const [totalPages, setTotalPages] = useState(0);
  const [loadingPdf, setLoadingPdf] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  const [leftPageNum, setLeftPageNum] = useState(1);
  const [rightPageNum, setRightPageNum] = useState(2);
  const [turningFrontPageNum, setTurningFrontPageNum] = useState<number | null>(null);
  const [turningBackPageNum, setTurningBackPageNum] = useState<number | null>(null);

  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const turningFrontCanvasRef = useRef<HTMLCanvasElement>(null);
  const turningBackCanvasRef = useRef<HTMLCanvasElement>(null);
  const mobileCanvasRef = useRef<HTMLCanvasElement>(null);
  const renderTasksRef = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("order_success") === "true") {
        setCheckoutStep("success");
        const customId = searchParams.get("custom") || "";
        setOrderId(customId);
        
        const orderFormat = searchParams.get("format") || "cartaceo";
        setOrderForm(prev => ({ ...prev, format: orderFormat }));
      }
    }
  }, []);

  // Load PDF.js from CDN and load document
  useEffect(() => {
    if (!showPreviewModal) return;

    const loadPdfjs = async () => {
      setLoadingPdf(true);
      if (typeof window === "undefined") return;
      try {
        if (!(window as any).pdfjsLib) {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
          script.onload = () => {
            const pdfjsLib = (window as any).pdfjsLib;
            pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
            loadPdfDocument(pdfjsLib);
          };
          document.head.appendChild(script);
        } else {
          loadPdfDocument((window as any).pdfjsLib);
        }
      } catch (e) {
        console.error("Error loading PDF.js", e);
        setLoadingPdf(false);
      }
    };

    const loadPdfDocument = async (pdfjsLib: any) => {
      try {
        const loadingTask = pdfjsLib.getDocument("/fiocco estratto.pdf");
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setLoadingPdf(false);
      } catch (e) {
        console.error("Error loading PDF document", e);
        setLoadingPdf(false);
      }
    };

    loadPdfjs();
  }, [showPreviewModal]);

  // Render PDF pages on canvas
  const renderPageOnCanvas = async (pageNum: number, canvas: HTMLCanvasElement | null, key: string) => {
    if (!pdfDoc || !canvas) return;
    
    // Cancel any pending render task for this canvas key
    if (renderTasksRef.current[key]) {
      try {
        renderTasksRef.current[key].cancel();
      } catch (err) {
        // Suppress errors if already cancelled or completed
      }
    }

    try {
      const page = await pdfDoc.getPage(pageNum);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      
      const renderTask = page.render(renderContext);
      renderTasksRef.current[key] = renderTask;
      
      await renderTask.promise;
      renderTasksRef.current[key] = null;
    } catch (e: any) {
      if (e.name === "RenderingCancelledException" || e.message?.includes("cancelled")) {
        // Normal cancellation of render task, do not log error
        return;
      }
      console.error("Error rendering page " + pageNum + " on key " + key, e);
    }
  };

  useEffect(() => {
    if (!isFlipping) {
      setLeftPageNum(currentPage);
      setRightPageNum(currentPage + 1);
      setTurningFrontPageNum(null);
      setTurningBackPageNum(null);
    }
  }, [currentPage, isFlipping]);

  useEffect(() => {
    if (!pdfDoc || loadingPdf) return;

    // Render left page
    if (leftPageNum > 0 && leftPageNum <= totalPages) {
      renderPageOnCanvas(leftPageNum, leftCanvasRef.current, "left");
    }

    // Render right page
    if (rightPageNum > 0 && rightPageNum <= totalPages) {
      renderPageOnCanvas(rightPageNum, rightCanvasRef.current, "right");
    } else {
      const rightCanvas = rightCanvasRef.current;
      if (rightCanvas) {
        const ctx = rightCanvas.getContext("2d");
        ctx?.clearRect(0, 0, rightCanvas.width, rightCanvas.height);
      }
    }

    // Render turning front page
    if (turningFrontPageNum !== null && turningFrontPageNum > 0 && turningFrontPageNum <= totalPages) {
      renderPageOnCanvas(turningFrontPageNum, turningFrontCanvasRef.current, "turningFront");
    }

    // Render turning back page
    if (turningBackPageNum !== null && turningBackPageNum > 0 && turningBackPageNum <= totalPages) {
      renderPageOnCanvas(turningBackPageNum, turningBackCanvasRef.current, "turningBack");
    }

    // Single page rendering (Mobile)
    renderPageOnCanvas(currentPage, mobileCanvasRef.current, "mobile");
  }, [pdfDoc, leftPageNum, rightPageNum, turningFrontPageNum, turningBackPageNum, currentPage, loadingPdf, totalPages]);

  const handleNextPage = () => {
    if (currentPage + 2 > totalPages) return;
    setFlipDirection("next");
    
    // Set up pages for the flip before animating
    setLeftPageNum(currentPage);
    setRightPageNum(currentPage + 3);
    setTurningFrontPageNum(currentPage + 1);
    setTurningBackPageNum(currentPage + 2);
    
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 2);
      setIsFlipping(false);
    }, 800);
  };

  const handlePrevPage = () => {
    if (currentPage - 2 < 1) return;
    setFlipDirection("prev");
    
    // Set up pages for the flip before animating
    setLeftPageNum(currentPage - 2);
    setRightPageNum(currentPage + 1);
    setTurningFrontPageNum(currentPage);
    setTurningBackPageNum(currentPage - 1);
    
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(prev => prev - 2);
      setIsFlipping(false);
    }, 800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (val: number) => {
    if (val < 1) return;
    setOrderForm(prev => ({ ...prev, quantity: val }));
  };

  const bookPrice = orderForm.format === "cartaceo" ? 18.00 : 8.00;
  const shippingCost = orderForm.format === "cartaceo" ? 3.50 : 0.00;
  const totalCost = (bookPrice * orderForm.quantity) + shippingCost;

  const handleStartRealPayment = (e: React.FormEvent) => {
    e.preventDefault();

    const randomId = "MF-" + Math.floor(100000 + Math.random() * 900000);

    // Store order lead locally in localStorage/IndexedDB
    try {
      const existing = localStorage.getItem("monica_contact_leads") || "[]";
      const leads = JSON.parse(existing);
      leads.push({
        id: randomId,
        name: orderForm.name,
        email: orderForm.email,
        phone: orderForm.phone,
        message: `Ordine Libro "Il filo che resta" [FORMATO: ${orderForm.format.toUpperCase()}] - Quantità: ${orderForm.quantity} copie. Indirizzo: ${orderForm.format === 'cartaceo' ? `${orderForm.address}, ${orderForm.city} (${orderForm.zip})` : 'Digital Delivery (E-Mail)'}. Note: ${orderForm.notes}`,
        date: new Date().toISOString().split("T")[0],
        status: "Nuovo",
        isOrder: true
      });
      localStorage.setItem("monica_contact_leads", JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }

    // Redirect to real PayPal payment URL
    const paypalEmail = "monica.fiocco.2012@gmail.com";
    const formatName = orderForm.format === "cartaceo" ? "Cartaceo Autografato" : "eBook EPUB";
    const itemName = encodeURIComponent(`Libro "Il filo che resta" (${formatName}) - Monica Fiocco (Rif: ${randomId})`);
    const amount = bookPrice.toFixed(2);
    const shipping = shippingCost.toFixed(2);
    
    const nameParts = orderForm.name.trim().split(/\s+/);
    const firstName = encodeURIComponent(nameParts[0] || "");
    const lastName = encodeURIComponent(nameParts.slice(1).join(" ") || "");
    const email = encodeURIComponent(orderForm.email);
    
    // Address parameters (only if physical book)
    let addressParams = "";
    if (orderForm.format === "cartaceo") {
      const address = encodeURIComponent(orderForm.address);
      const city = encodeURIComponent(orderForm.city);
      const zip = encodeURIComponent(orderForm.zip);
      addressParams = `&no_shipping=2&address_override=1&address1=${address}&city=${city}&zip=${zip}`;
    } else {
      addressParams = `&no_shipping=1`; // Digital delivery, no shipping address required in PayPal
    }

    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${itemName}&amount=${amount}&currency_code=EUR&quantity=${orderForm.quantity}&shipping=${shipping}${addressParams}&first_name=${firstName}&last_name=${lastName}&email=${email}&custom=${randomId}&format=${orderForm.format}&return=${encodeURIComponent(window.location.origin + '/pubblicazioni?order_success=true&custom=' + randomId + '&format=' + orderForm.format)}&cancel_return=${encodeURIComponent(window.location.origin + '/pubblicazioni')}`;

    window.location.href = paypalUrl;
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-[460px] overflow-hidden bg-glicine-950 pt-36 pb-20 flex items-center">
        <div className="absolute inset-0">
          <img
            src="/copertina.png"
            alt="Il filo che resta sfondo"
            className="w-full h-full object-cover opacity-15 blur-[4px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-glicine-950 via-glicine-950/85 to-glicine-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-glicine-100 text-xs font-bold uppercase tracking-widest">
              <BookOpen className="w-4 h-4" /> Pubblicazioni editoriali
            </span>
            <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              IL FILO CHE RESTA
            </h1>
            <p className="text-glicine-300 text-xl font-medium tracking-wide font-outfit">
              di Monica Fiocco
            </p>
            <p className="text-glicine-100/90 text-base sm:text-lg leading-relaxed max-w-3xl font-light">
              Un quaderno di crescita personale e consapevolezza emotiva attraverso lo strumento delle favole radice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Left Column: Book cover, publisher logos & Purchase buttons */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Book Cover Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] max-w-[380px] mx-auto rounded-[2.5rem] overflow-hidden border border-glicine-100 shadow-2xl hover:scale-[1.01] transition-transform duration-500 bg-glicine-50"
            >
              <img 
                src="/copertina.png" 
                alt="Copertina Libro Il Filo Che Resta" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Read Extract Button */}
            <div className="max-w-[380px] mx-auto">
              <button
                onClick={() => setShowPreviewModal(true)}
                className="w-full py-4.5 rounded-2xl bg-glicine-800 hover:bg-glicine-750 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg border border-glicine-700/60 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <BookOpen className="w-5 h-5" /> Sfoglia l'Estratto (3D Flip)
              </button>
            </div>

            {/* Publishing details & External platforms */}
            <div className="p-8 rounded-3xl bg-glicine-50/40 border border-glicine-100/60 space-y-6 max-w-[380px] mx-auto">
              <h4 className="font-outfit font-extrabold text-lg text-glicine-950 border-b border-glicine-100 pb-2">
                Disponibile anche su:
              </h4>

              {/* Amazon button */}
              <a 
                href="https://www.amazon.it/dp/8869012719?ref=cm_sw_r_ffobk_cso_cp_mwn_dp_G26ZRJ7X0DRJEG33YPQY&ref_=cm_sw_r_ffobk_cso_cp_mwn_dp_G26ZRJ7X0DRJEG33YPQY&social_share=cm_sw_r_ffobk_cso_cp_mwn_dp_G26ZRJ7X0DRJEG33YPQY&bestFormat=true" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-amber-500 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src="/amazon.png" 
                    alt="Logo Amazon" 
                    className="h-8 w-8 object-contain shrink-0" 
                  />
                  <div>
                    <span className="font-bold text-sm block text-slate-800">Amazon Store</span>
                    <span className="text-slate-400 text-[10px] block">Edizione Cartacea</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
              </a>

              {/* Terre Sommerse button */}
              <a 
                href="https://www.terresommersegroup.com/store/p998/IL_FILO_CHE_RESTA__-_di_Monica_Fiocco.html?fbclid=IwY2xjawSCUn9leHRuA2FlbQIxMQBzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEekeoBgb9uPGbIofihRyNSC73MlmE8RT7no1FOdCXc-vaW0-pptvkRgdekqHs_aem_6IZXl0jc2S1sY0jVMNO38g" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-glicine-400 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src="/terre-sommerse-group.png" 
                    alt="Logo Terre Sommerse Editore" 
                    className="h-8 w-auto object-contain shrink-0" 
                  />
                  <div>
                    <span className="font-bold text-sm block text-slate-800">Terre Sommerse</span>
                    <span className="text-slate-400 text-[10px] block">Sito Editore Ufficiale</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-glicine-600 transition-colors" />
              </a>
            </div>

          </div>

          {/* Right Column: Book Synopsis & Order Form */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Synopsis */}
            <div className="space-y-6">
              <h2 className="font-outfit text-3xl font-extrabold text-glicine-950 border-l-3 border-glicine-400 pl-4">
                Sinossi dell'Opera
              </h2>
              <div className="text-slate-650 font-light leading-relaxed space-y-5 text-base sm:text-lg">
                <p>
                  <strong>Il filo che resta</strong> è un quaderno di crescita personale che, attraverso lo strumento delle favole radice — racconti fantastici, simbolici e archetipici — offre uno spazio di consapevolezza per districare quei nodi emotivi che il femminile porta con sé, consapevolmente e inconsapevolmente. Nodi che affondano nelle memorie profonde, spesso transgenerazionali, della propria storia.
                </p>
                <p>
                  È un breve viaggio interiore attraverso la lettura di dieci favole, ognuna delle quali rappresenta un passaggio possibile nel cammino evolutivo della coscienza femminile. Temi come la separazione, la rinascita, il desiderio, la colpa, il potere, diventano simboli vivi, specchi attraverso cui riconoscersi.
                </p>
                <p>
                  Il quaderno è anche uno spazio interattivo, che invita chi legge a raccontarsi mentre legge, a cercare risonanze e differenze con la propria esperienza, a rendere la lettura un’esperienza emotiva e trasformativa. Un modo per riannodare quei fili invisibili che ci legano alla nostra storia più profonda — quella che chiede di essere vista, accolta, forse riscritta.
                </p>
              </div>
            </div>

            {/* Author Bio */}
            <div className="p-8 rounded-[2rem] bg-glicine-50/20 border border-glicine-100 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-glicine-100 flex items-center justify-center text-glicine-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-outfit font-extrabold text-xl text-glicine-900">Monica Fiocco - L'autrice</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                Monica Fiocco è una professionista italiana con un profilo multidisciplinare che integra pedagogia, counseling, formazione, ricerca sulla crescita personale e scrittura creativa con un approccio poliedrico transgenerazionale e umanistico. Nata a Napoli, è attiva da anni nel campo della relazione d’aiuto, con particolare attenzione all’educazione affettiva e alla comunicazione empatica.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                Ha collaborato con diverse realtà, private e pubbliche, ricoprendo ruoli di responsabilità nella gestione delle aree formative e della crescita personale. Da oltre vent’anni è docente nei corsi di counseling e relazione d’aiuto, e nei corsi professionalizzanti di figure legate al mondo dell’educazione e della disabilità. È autrice di articoli dedicati ai temi della relazione, dell’educazione emotiva, della consapevolezza del Sé, della comunicazione efficace empatica e risonante.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed font-light font-outfit italic text-glicine-950">
                Accanto alla sua attività professionale, coltiva la passione per la scrittura suggestiva e per una visione olistica dell’esistenza, che integra in ambiti educativi, terapeutici e artistici. Il suo intento è promuovere il benessere emotivo e relazionale e di sviluppo del potenziale umano, come fondamento di una vita più consapevole e autentica.
              </p>
            </div>

            {/* Local Purchase Form with simulated PayPal integration */}
            <div id="ordina-libro" className="p-8 rounded-[2.2rem] bg-slate-900 text-white space-y-6 shadow-xl border border-slate-800">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-glicine-400 uppercase tracking-widest">Acquista direttamente</span>
                <h3 className="font-outfit font-extrabold text-2xl">Richiedi la tua copia</h3>
                <p className="text-slate-400 text-xs font-light">
                  Scegli tra la versione cartacea autografata o la versione digitale eBook (EPUB) e procedi al pagamento sicuro con PayPal.
                </p>
              </div>

              {checkoutStep === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-5 text-center"
                >
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-outfit font-bold text-lg text-emerald-400">Acquisto Completato con Successo!</h4>
                  <p className="text-slate-300 text-xs leading-relaxed max-w-md mx-auto">
                    Il pagamento su PayPal è andato a buon fine. Il tuo ordine è stato registrato con ID: <strong>{orderId}</strong>.
                  </p>
                  
                  {orderForm.format === "epub" && (
                    <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/40 space-y-3 max-w-sm mx-auto">
                      <span className="text-xs text-emerald-300 block font-semibold">Il tuo eBook è pronto per il download:</span>
                      <a 
                        href="/fiocco2.epub" 
                        download="Monica_Fiocco_Il_Filo_Che_Resta.epub"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                      >
                        <Download className="w-4 h-4" /> Scarica eBook (.epub)
                      </a>
                    </div>
                  )}

                  <button 
                    onClick={() => {
                      // Remove success search params to clean the URL
                      if (typeof window !== "undefined") {
                        window.history.replaceState({}, document.title, window.location.pathname);
                      }
                      setCheckoutStep("idle");
                    }}
                    className="mt-2 text-xs text-glicine-300 underline hover:text-white"
                  >
                    Effettua un altro ordine
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleStartRealPayment} className="space-y-4 text-xs">
                  
                  {/* Format Selector */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold uppercase tracking-wider block">Seleziona Formato</label>
                    <select 
                      name="format"
                      value={orderForm.format}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-glicine-400 transition-colors cursor-pointer font-bold text-sm"
                    >
                      <option value="cartaceo">Libro Cartaceo Autografato — €18.00 (+ €3.50 sped.)</option>
                      <option value="epub">eBook Digitale (Formato EPUB) — €8.00 (Invio immediato)</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold uppercase tracking-wider block">Nome Completo</label>
                      <input 
                        type="text" 
                        name="name"
                        value={orderForm.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Nome e Cognome"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:border-glicine-400 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold uppercase tracking-wider block">E-mail</label>
                      <input 
                        type="email" 
                        name="email"
                        value={orderForm.email}
                        onChange={handleInputChange}
                        required
                        placeholder="La tua email (per ricevere l'ordine)"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:border-glicine-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold uppercase tracking-wider block">Telefono</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={orderForm.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Cellulare"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:border-glicine-400 transition-colors"
                    />
                  </div>

                  {/* Shipping Address - Only shown for physical book */}
                  <AnimatePresence>
                    {orderForm.format === "cartaceo" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden space-y-4"
                      >
                        <div className="space-y-1.5 pt-2">
                          <label className="text-slate-300 font-semibold uppercase tracking-wider block">Indirizzo di Spedizione</label>
                          <input 
                            type="text" 
                            name="address"
                            value={orderForm.address}
                            onChange={handleInputChange}
                            required={orderForm.format === "cartaceo"}
                            placeholder="Via, Piazza, Numero Civico"
                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:border-glicine-400 transition-colors"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-slate-300 font-semibold uppercase tracking-wider block">Città</label>
                            <input 
                              type="text" 
                              name="city"
                              value={orderForm.city}
                              onChange={handleInputChange}
                              required={orderForm.format === "cartaceo"}
                              placeholder="Città (Provincia)"
                              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:border-glicine-400 transition-colors"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-slate-300 font-semibold uppercase tracking-wider block">CAP</label>
                            <input 
                              type="text" 
                              name="zip"
                              value={orderForm.zip}
                              onChange={handleInputChange}
                              required={orderForm.format === "cartaceo"}
                              placeholder="Codice Postale"
                              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:border-glicine-400 transition-colors"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Quantity selector */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 mt-2">
                    <div>
                      <span className="font-bold text-sm block">Quantità</span>
                      <span className="text-[10px] text-slate-500">€{bookPrice.toFixed(2)} a copia</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={() => handleQuantityChange(orderForm.quantity - 1)}
                        className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all font-bold text-base cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm min-w-[20px] text-center">{orderForm.quantity}</span>
                      <button 
                        type="button"
                        onClick={() => handleQuantityChange(orderForm.quantity + 1)}
                        className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all font-bold text-base cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-4 rounded-xl bg-glicine-950/40 border border-glicine-900/60 space-y-2 mt-4">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Costo Copie ({orderForm.quantity}):</span>
                      <span className="font-semibold">€{(bookPrice * orderForm.quantity).toFixed(2)}</span>
                    </div>
                    {orderForm.format === "cartaceo" && (
                      <div className="flex justify-between">
                        <span className="text-slate-300">Spedizione Express:</span>
                        <span className="font-semibold">€{shippingCost.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-slate-800 pt-2 text-sm">
                      <strong className="text-white font-bold">Totale:</strong>
                      <strong className="text-glicine-400 font-bold">€{totalCost.toFixed(2)}</strong>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4.5 rounded-full bg-[#ffc439] hover:bg-[#f4b41a] text-[#111] font-bold text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <ShoppingBag className="w-4 h-4" /> Procedi al pagamento con PayPal
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 3D PDF Page-Flip Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="w-full max-w-6xl h-[85vh] bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border border-slate-800"
            >
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-outfit font-extrabold text-xl text-white">Anteprima Sfogliabile (Estratto)</h3>
                  <span className="text-xs text-glicine-400">Il filo che resta — Monica Fiocco</span>
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body: Book Flip area */}
              <div className="flex-1 bg-slate-950 relative flex items-center justify-center p-4 sm:p-8 overflow-hidden">
                {loadingPdf ? (
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="h-8 w-8 rounded-full border-3 border-t-glicine-400 border-slate-800 animate-spin" />
                    <span className="text-slate-400 text-xs font-semibold">Caricamento pagine in corso...</span>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    
                    {/* Dual Page View (Desktop/Tablet) */}
                    <div className="hidden md:flex w-full max-w-5xl aspect-[1.465] max-h-full relative perspective-[2000px] shadow-2xl select-none">
                      
                      {/* Left Page (Canvas) */}
                      <div className="absolute left-0 top-0 w-1/2 h-full bg-white rounded-l-2xl shadow-[inset_-12px_0_30px_rgba(0,0,0,0.06),-10px_10px_30px_rgba(0,0,0,0.15)] overflow-hidden border-r border-black/10 origin-right">
                        <canvas ref={leftCanvasRef} className="w-full h-full object-contain" />
                        <div className="absolute bottom-3 left-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-black/5 px-2.5 py-1 rounded-full backdrop-blur-xs">
                          Pagina {leftPageNum}
                        </div>
                      </div>

                      {/* Right Page (Canvas) */}
                      <div className="absolute right-0 top-0 w-1/2 h-full bg-white rounded-r-2xl shadow-[inset_12px_0_30px_rgba(0,0,0,0.06),10px_10px_30px_rgba(0,0,0,0.15)] overflow-hidden origin-left">
                        <canvas ref={rightCanvasRef} className="w-full h-full object-contain" />
                        {rightPageNum <= totalPages && (
                          <div className="absolute bottom-3 right-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-black/5 px-2.5 py-1 rounded-full backdrop-blur-xs">
                            Pagina {rightPageNum}
                          </div>
                        )}
                      </div>

                      {/* 3D Flipping page transition overlay */}
                      {isFlipping && (
                        <motion.div
                          initial={{ rotateY: flipDirection === "next" ? 0 : -180 }}
                          animate={{ rotateY: flipDirection === "next" ? -180 : 0 }}
                          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                          style={{ transformStyle: "preserve-3d", perspective: 2000 }}
                          className={`absolute top-0 w-1/2 h-full z-30 ${
                            flipDirection === "next" 
                              ? "right-0 origin-left" 
                              : "left-0 origin-right"
                          }`}
                        >
                          {/* FRONT SIDE (visible at 0 to 90 deg) */}
                          <div 
                            className="absolute inset-0 w-full h-full bg-white rounded-r-2xl overflow-hidden border-r border-slate-200"
                            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                          >
                            <canvas ref={turningFrontCanvasRef} className="w-full h-full object-contain" />
                            {/* Front Shadow overlay */}
                            <motion.div 
                              className="absolute inset-0 z-10 pointer-events-none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: flipDirection === "next" ? [0, 0.5, 0.8] : [0.8, 0.5, 0] }}
                              transition={{ duration: 0.8 }}
                              style={{
                                background: "linear-gradient(to left, rgba(0,0,0,0) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)"
                              }}
                            />
                          </div>

                          {/* BACK SIDE (visible at 90 to 180 deg) */}
                          <div 
                            className="absolute inset-0 w-full h-full bg-white rounded-l-2xl overflow-hidden border-l border-slate-200"
                            style={{ 
                              backfaceVisibility: "hidden", 
                              WebkitBackfaceVisibility: "hidden",
                              transform: "rotateY(180deg)" 
                            }}
                          >
                            <canvas ref={turningBackCanvasRef} className="w-full h-full object-contain" />
                            {/* Back Shadow overlay */}
                            <motion.div 
                              className="absolute inset-0 z-10 pointer-events-none"
                              initial={{ opacity: 1 }}
                              animate={{ opacity: flipDirection === "next" ? [0.8, 0.4, 0] : [0, 0.4, 0.8] }}
                              transition={{ duration: 0.8 }}
                              style={{
                                background: "linear-gradient(to right, rgba(0,0,0,0) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)"
                              }}
                            />
                          </div>

                          {/* Dynamic page curl & shadow effect */}
                          <motion.div 
                            className="absolute inset-0 pointer-events-none z-20"
                            initial={{ scaleX: 1, skewY: 0 }}
                            animate={{ 
                              scaleX: [1, 0.98, 0.94, 0.98, 1],
                              skewY: flipDirection === "next" ? [0, -2, -4, -2, 0] : [0, 2, 4, 2, 0]
                            }}
                            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                          />
                        </motion.div>
                      )}

                      {/* Central Book spine shadow */}
                      <div className="absolute left-1/2 top-0 -ml-[4px] w-[8px] h-full bg-gradient-to-r from-black/20 via-black/40 to-black/20 z-20 pointer-events-none" />
                    </div>

                    {/* Single Page View (Mobile) */}
                    <div className="md:hidden w-full max-w-[340px] aspect-[1/1.414] relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                      <canvas ref={mobileCanvasRef} className="w-full h-full object-contain" />
                      <div className="absolute bottom-3 left-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-black/5 px-2.5 py-1 rounded-full backdrop-blur-xs">
                        Pagina {currentPage}
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Modal Footer: Page turn controls */}
              <div className="p-6 border-t border-slate-800 flex items-center justify-between text-sm text-white bg-slate-900/60">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage - 2 < 1 || loadingPdf || isFlipping}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-755 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Precedente
                </button>
                
                <span className="text-slate-400 font-semibold text-xs">
                  Pagina {currentPage} - {currentPage + 1 <= totalPages ? currentPage + 1 : currentPage} di {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage + 2 > totalPages || loadingPdf || isFlipping}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-755 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Successiva <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Back link */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-glicine-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Torna alla Home Page
        </Link>
      </section>

    </div>
  );
}
