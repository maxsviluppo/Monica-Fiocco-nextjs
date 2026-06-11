"use client";

import React, { useEffect, useState } from "react";
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Calendar, 
  Star, 
  Tag, 
  Layers, 
  ArrowUpDown,
  Search,
  Globe,
  Settings,
  Upload,
  Heart,
  Award
} from "lucide-react";
import { articles as initialArticles, Article as BaseArticle } from "@/data/articles";
import { supabase } from "@/data/supabase";

interface ExtendedArticle extends BaseArticle {
  orderPriority?: number;
  tags?: string[];
  isEvent?: boolean;
  featuredEndDate?: string;
  autoIndexing?: boolean;
  isTopFeatured?: boolean;
  topFeaturedEndDate?: string;
}

const defaultCategories = [
  "Counseling",
  "Costellazioni",
  "Narrazione",
  "Transgenerazionale",
  "Psicopedagogia",
  "Formazione"
];

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ExtendedArticle[]>([]);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tutti");
  const [typeFilter, setTypeFilter] = useState("Tutti"); // Tutti, Articoli, Eventi, In Evidenza, Top Evidenza
  
  // Category Panel State
  const [showCategoryPanel, setShowCategoryPanel] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategoryIdx, setEditingCategoryIdx] = useState<number | null>(null);
  const [editingCategoryVal, setEditingCategoryVal] = useState("");

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<ExtendedArticle | null>(null);
  const [hasManuallyEditedTags, setHasManuallyEditedTags] = useState(false);
  const [formValues, setFormValues] = useState({
    slug: "",
    title: "",
    category: "",
    excerpt: "",
    content: "",
    image: "",
    author: "Monica Fiocco",
    readTime: "5 min",
    isFeatured: false,
    isFavorite: false,
    orderPriority: 10,
    tags: "",
    isEvent: false,
    featuredEndDate: "",
    autoIndexing: true,
    isTopFeatured: false,
    topFeaturedEndDate: ""
  });

  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  
  // Featured Settings Modal
  const [featuredModalArticle, setFeaturedModalArticle] = useState<ExtendedArticle | null>(null);
  const [modalIsFeatured, setModalIsFeatured] = useState(false);
  const [modalIsTopFeatured, setModalIsTopFeatured] = useState(false);
  const [modalFeaturedEndDate, setModalFeaturedEndDate] = useState("");
  const [modalTopFeaturedEndDate, setModalTopFeaturedEndDate] = useState("");

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Load articles & categories from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: dbArticles, error: artError } = await supabase
          .from("articles")
          .select("*")
          .order("order_priority", { ascending: true });

        if (artError) throw artError;

        let loadedArticles: ExtendedArticle[] = [];
        if (dbArticles && dbArticles.length > 0) {
          loadedArticles = dbArticles.map((art: any) => ({
            slug: art.slug,
            title: art.title,
            category: art.category,
            date: art.date,
            readTime: art.read_time,
            excerpt: art.excerpt,
            image: art.image,
            author: art.author,
            isFeatured: art.is_featured,
            isFavorite: art.is_favorite,
            content: art.content,
            orderPriority: art.order_priority,
            tags: art.tags || [],
            isEvent: art.is_event,
            featuredEndDate: art.featured_end_date,
            autoIndexing: art.auto_indexing,
            isTopFeatured: art.is_top_featured,
            topFeaturedEndDate: art.top_featured_end_date
          }));
        } else {
          // Database is empty, seed it!
          const initialExtended = initialArticles.map((art, idx) => ({
            ...art,
            orderPriority: (idx + 1) * 10,
            tags: [art.category.toLowerCase()],
            isEvent: false,
            featuredEndDate: art.isFeatured ? "2026-12-31" : "",
            autoIndexing: true,
            isTopFeatured: idx === 0,
            topFeaturedEndDate: idx === 0 ? "2026-12-31" : ""
          }));
          
          const seedData = initialExtended.map(art => ({
            slug: art.slug,
            title: art.title,
            category: art.category,
            date: art.date,
            read_time: art.readTime,
            excerpt: art.excerpt,
            image: art.image,
            author: art.author,
            is_featured: art.isFeatured,
            is_favorite: art.isFavorite,
            content: art.content || "",
            order_priority: art.orderPriority,
            tags: art.tags,
            is_event: art.isEvent,
            featured_end_date: art.featuredEndDate,
            auto_indexing: art.autoIndexing,
            is_top_featured: art.isTopFeatured,
            top_featured_end_date: art.topFeaturedEndDate
          }));
          
          await supabase.from("articles").insert(seedData);
          loadedArticles = initialExtended;
        }
        setArticles(loadedArticles);

        const { data: dbCats, error: catError } = await supabase
          .from("categories")
          .select("*")
          .order("name", { ascending: true });

        if (catError) throw catError;

        let loadedCats: string[] = [];
        if (dbCats && dbCats.length > 0) {
          loadedCats = dbCats.map((c: any) => c.name);
        } else {
          // Seed default categories
          const seedCats = defaultCategories.map(name => ({ name }));
          await supabase.from("categories").insert(seedCats);
          loadedCats = defaultCategories;
        }
        setCustomCategories(loadedCats);
      } catch (e) {
        console.error("Error loading data from Supabase:", e);
      }
    };
    loadData();
  }, []);

  const saveArticles = async (updated: ExtendedArticle[]) => {
    const sorted = [...updated].sort((a, b) => {
      const priorityA = a.orderPriority ?? 99;
      const priorityB = b.orderPriority ?? 99;
      return priorityA - priorityB;
    });
    setArticles(sorted);
    
    try {
      const dbData = sorted.map(art => ({
        slug: art.slug,
        title: art.title,
        category: art.category,
        date: art.date,
        read_time: art.readTime,
        excerpt: art.excerpt,
        image: art.image,
        author: art.author,
        is_featured: art.isFeatured,
        is_favorite: art.isFavorite,
        content: art.content || "",
        order_priority: art.orderPriority,
        tags: art.tags || [],
        is_event: art.isEvent || false,
        featured_end_date: art.featuredEndDate || "",
        auto_indexing: art.autoIndexing ?? true,
        is_top_featured: art.isTopFeatured || false,
        top_featured_end_date: art.topFeaturedEndDate || ""
      }));
      
      const { error } = await supabase.from("articles").upsert(dbData, { onConflict: "slug" });
      if (error) throw error;
    } catch (e) {
      console.error("Error saving articles to Supabase:", e);
      showToast("Errore durante il salvataggio nel database", "info");
    }
  };

  const saveCategories = (updatedCats: string[]) => {
    setCustomCategories(updatedCats);
  };

  // Vercel Blob file upload helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast("L'immagine supera i 10MB. Scegli un file più leggero.", "info");
        return;
      }
      
      try {
        showToast("Caricamento immagine in corso...", "info");
        const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
          method: "POST",
          body: file,
        });

        if (!response.ok) {
          throw new Error("Errore durante l'upload");
        }

        const data = await response.json();
        
        setFormValues(prev => ({
          ...prev,
          image: data.url
        }));
        showToast("Immagine caricata su Vercel Blob!", "success");
      } catch (err: any) {
        console.error(err);
        showToast("Impossibile caricare l'immagine su Vercel", "info");
      } finally {
        e.target.value = ""; // Reset to allow re-selection
      }
    }
  };

  // Categories Operations
  const handleAddCategory = async () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (customCategories.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      showToast("Questa categoria esiste già!", "info");
      return;
    }
    try {
      const { error } = await supabase.from("categories").insert({ name: trimmed });
      if (error) throw error;
      setCustomCategories([...customCategories, trimmed]);
      setNewCategoryName("");
      showToast("Categoria aggiunta", "success");
    } catch (e) {
      console.error("Error adding category:", e);
      showToast("Errore durante il salvataggio della categoria", "info");
    }
  };

  const handleStartEditCategory = (index: number, val: string) => {
    setEditingCategoryIdx(index);
    setEditingCategoryVal(val);
  };

  const handleSaveCategoryEdit = async (index: number) => {
    const trimmed = editingCategoryVal.trim();
    if (!trimmed) return;
    const oldName = customCategories[index];
    if (customCategories.some((c, idx) => idx !== index && c.toLowerCase() === trimmed.toLowerCase())) {
      showToast("Esiste già un'altra categoria con questo nome!", "info");
      return;
    }
    
    try {
      const { error: catErr } = await supabase
        .from("categories")
        .update({ name: trimmed })
        .eq("name", oldName);
      if (catErr) throw catErr;

      const { error: artErr } = await supabase
        .from("articles")
        .update({ category: trimmed })
        .eq("category", oldName);
      if (artErr) throw artErr;

      const updatedCats = customCategories.map((c, idx) => idx === index ? trimmed : c);
      setCustomCategories(updatedCats);

      const updatedArticles = articles.map(art => {
        if (art.category === oldName) {
          return { ...art, category: trimmed };
        }
        return art;
      });
      setArticles(updatedArticles);

      setEditingCategoryIdx(null);
      setEditingCategoryVal("");
      showToast("Categoria rinominata con successo", "success");
    } catch (e) {
      console.error("Error updating category:", e);
      showToast("Errore durante la modifica della categoria", "info");
    }
  };

  const handleDeleteCategory = async (index: number) => {
    const nameToDelete = customCategories[index];
    const isUsed = articles.some(art => art.category === nameToDelete);
    if (isUsed) {
      showToast(`Impossibile eliminare: categoria in uso`, "info");
      return;
    }
    
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("name", nameToDelete);
      if (error) throw error;
      
      const updated = customCategories.filter((_, idx) => idx !== index);
      setCustomCategories(updated);
      showToast("Categoria eliminata", "success");
    } catch (e) {
      console.error("Error deleting category:", e);
      showToast("Errore durante l'eliminazione della categoria", "info");
    }
  };

  // Handle open Form for creation
  const handleAddNew = () => {
    setCurrentArticle(null);
    setHasManuallyEditedTags(false);
    const initialCat = customCategories.length > 0 ? customCategories[0] : "Counseling";
    setFormValues({
      slug: "",
      title: "",
      category: initialCat,
      excerpt: "",
      content: "",
      image: "",
      author: "Monica Fiocco",
      readTime: "5 min",
      isFeatured: false,
      isFavorite: false,
      orderPriority: (articles.length + 1) * 10,
      tags: "",
      isEvent: false,
      featuredEndDate: "",
      autoIndexing: true,
      isTopFeatured: false,
      topFeaturedEndDate: ""
    });
    setIsEditing(true);
  };

  // Handle open Form for editing
  const handleEditClick = (article: ExtendedArticle) => {
    setCurrentArticle(article);
    setHasManuallyEditedTags(true); // Don't overwrite existing article tags unless they clear and retrain it
    setFormValues({
      slug: article.slug,
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      content: article.content || "",
      image: article.image,
      author: article.author,
      readTime: article.readTime,
      isFeatured: article.isFeatured,
      isFavorite: article.isFavorite,
      orderPriority: article.orderPriority ?? 10,
      tags: (article.tags || []).join(", "),
      isEvent: article.isEvent || false,
      featuredEndDate: article.featuredEndDate || "",
      autoIndexing: article.autoIndexing ?? true,
      isTopFeatured: article.isTopFeatured || false,
      topFeaturedEndDate: article.topFeaturedEndDate || ""
    });
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "tags") {
      setHasManuallyEditedTags(true);
    }
    
    setFormValues(prev => {
      const updated = { ...prev, [name]: value };
      
      if (name === "title" && !currentArticle) {
        // Auto-generate slug from title
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
          
        if (!hasManuallyEditedTags) {
          // Auto-generate tags/keywords from title
          const stopwords = new Set([
            "il", "la", "lo", "i", "gli", "le", "un", "una", "uno", "di", "a", "da", "in", 
            "con", "su", "per", "tra", "fra", "e", "o", "della", "dello", "dell", "delle", 
            "degli", "dei", "alla", "allo", "all", "alle", "agli", "ai", "dal", "dallo", 
            "dall", "dalle", "dagli", "dai", "nel", "nello", "nell", "nelle", "negli", "nei", 
            "sul", "sullo", "sull", "sulle", "sugli", "sui", "col", "coi", "da", "perché", 
            "come", "cosa", "questo", "questa", "questi", "queste", "che"
          ]);
          
          const titleWords = value
            .toLowerCase()
            .replace(/[^a-z0-9\s]+/g, "")
            .split(/\s+/)
            .filter(w => w.length > 2 && !stopwords.has(w));
            
          const categoryTag = updated.category ? [updated.category.toLowerCase()] : [];
          const mergedTags = Array.from(new Set([...categoryTag, ...titleWords]));
          updated.tags = mergedTags.join(", ");
        }
      }
      
      if (name === "category" && !currentArticle && !hasManuallyEditedTags) {
        // If they change category, replace/update the category tag in the tags list
        const currentTags = prev.tags.split(",").map(t => t.trim()).filter(t => t.length > 0);
        const oldCategory = prev.category.toLowerCase();
        const newCategory = value.toLowerCase();
        
        const filtered = currentTags.filter(t => t !== oldCategory);
        updated.tags = Array.from(new Set([newCategory, ...filtered])).join(", ");
      }
      
      return updated;
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: checked
    }));

    // If Top Featured is selected in the form, suggest standard isFeatured also
    if (name === "isTopFeatured" && checked) {
      setFormValues(prev => ({
        ...prev,
        isFeatured: true
      }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formValues.title || !formValues.slug) {
      showToast("Titolo e Slug sono obbligatori", "info");
      return;
    }

    const tagsArray = formValues.tags
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const formattedArticle: ExtendedArticle = {
      slug: formValues.slug,
      title: formValues.title,
      category: formValues.category,
      excerpt: formValues.excerpt,
      content: formValues.content,
      image: formValues.image || "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1200&auto=format&fit=crop",
      author: formValues.author,
      readTime: formValues.readTime,
      isFeatured: formValues.isFeatured,
      isFavorite: formValues.isFavorite,
      orderPriority: Number(formValues.orderPriority),
      tags: tagsArray,
      isEvent: formValues.isEvent,
      featuredEndDate: formValues.isFeatured ? formValues.featuredEndDate : "",
      autoIndexing: formValues.autoIndexing,
      isTopFeatured: formValues.isTopFeatured,
      topFeaturedEndDate: formValues.isTopFeatured ? formValues.topFeaturedEndDate : "",
      date: currentArticle ? currentArticle.date : new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })
    };

    let updatedArticles = [];
    
    // Ensure only one article is Top Featured
    let baseList = [...articles];
    if (formattedArticle.isTopFeatured) {
      baseList = baseList.map(art => art.slug !== currentArticle?.slug ? { ...art, isTopFeatured: false, topFeaturedEndDate: "" } : art);
    }

    if (currentArticle) {
      updatedArticles = baseList.map(art => art.slug === currentArticle.slug ? formattedArticle : art);
      showToast("Articolo modificato con successo!", "success");
    } else {
      if (articles.some(art => art.slug === formattedArticle.slug)) {
        showToast("Uno slug identico esiste già!", "info");
        return;
      }
      updatedArticles = [formattedArticle, ...baseList];
      showToast("Nuovo articolo pubblicato!", "success");
    }

    saveArticles(updatedArticles);
    setIsEditing(false);
    setCurrentArticle(null);
  };

  const handleDeleteExecute = async (slug: string) => {
    try {
      const { error } = await supabase.from("articles").delete().eq("slug", slug);
      if (error) throw error;
      const updated = articles.filter(art => art.slug !== slug);
      // We pass the updated list, but saveArticles will only upsert. Since it was already deleted from DB above, 
      // upserting the remaining ones will keep it in sync. Locally, we update state:
      setArticles(updated.sort((a, b) => (a.orderPriority ?? 99) - (b.orderPriority ?? 99)));
      showToast("Articolo eliminato definitivamente", "success");
    } catch (e) {
      console.error("Error deleting article:", e);
      showToast("Errore durante l'eliminazione dell'articolo", "info");
    }
    setShowDeleteModal(null);
  };

  // Open Quick Highlights Modal
  const openFeaturedModal = (article: ExtendedArticle) => {
    setFeaturedModalArticle(article);
    setModalIsFeatured(article.isFeatured || false);
    setModalIsTopFeatured(article.isTopFeatured || false);
    
    const defaultFeaturedDate = article.featuredEndDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const defaultTopFeaturedDate = article.topFeaturedEndDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    setModalFeaturedEndDate(defaultFeaturedDate);
    setModalTopFeaturedEndDate(defaultTopFeaturedDate);
  };

  const saveFeaturedModalSettings = () => {
    if (!featuredModalArticle) return;
    
    let updatedList = [...articles];

    // If making this one Top Featured, unset all other articles
    if (modalIsTopFeatured) {
      updatedList = updatedList.map(art => 
        art.slug !== featuredModalArticle.slug 
          ? { ...art, isTopFeatured: false, topFeaturedEndDate: "" } 
          : art
      );
    }

    const updated = updatedList.map(art => {
      if (art.slug === featuredModalArticle.slug) {
        return {
          ...art,
          isFeatured: modalIsFeatured || modalIsTopFeatured, // Top Featured implicitly is featured
          featuredEndDate: modalIsFeatured ? modalFeaturedEndDate : "",
          isTopFeatured: modalIsTopFeatured,
          topFeaturedEndDate: modalIsTopFeatured ? modalTopFeaturedEndDate : ""
        };
      }
      return art;
    });

    saveArticles(updated);
    showToast("Impostazioni evidenza aggiornate", "success");
    setFeaturedModalArticle(null);
  };

  const filteredArticles = articles.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (art.tags || []).join(" ").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "Tutti" || art.category === categoryFilter;

    let matchesType = true;
    if (typeFilter === "Eventi") matchesType = art.isEvent === true;
    else if (typeFilter === "In Evidenza") matchesType = art.isFeatured === true;
    else if (typeFilter === "Top Evidenza") matchesType = art.isTopFeatured === true;
    else if (typeFilter === "Articoli") matchesType = !art.isEvent;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-8 relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-glicine-900 border border-glicine-800 shadow-2xl text-xs font-semibold text-white animate-fade-in">
          <div className="p-1 rounded-full bg-glicine-500/10 text-glicine-300">
            <Check className="h-4 w-4" />
          </div>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Featured Settings Modal */}
      {featuredModalArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-glicine-900 border border-glicine-800 rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl">
            <div className="space-y-1 text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
                <Star className="h-5 w-5 fill-current" />
              </div>
              <h3 className="font-outfit font-extrabold text-lg text-white">Opzioni Evidenza</h3>
              <p className="text-glicine-300 text-[11px] leading-relaxed">
                Configura lo stato in evidenza per questo post.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              
              {/* Option 1: Standard Featured */}
              <div className="space-y-2 p-3 bg-glicine-950/40 rounded-xl border border-glicine-900">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={modalIsFeatured}
                    onChange={(e) => {
                      setModalIsFeatured(e.target.checked);
                      if (!e.target.checked) setModalIsTopFeatured(false);
                    }}
                    className="h-4 w-4 rounded border-glicine-800 text-glicine-600 bg-glicine-950"
                  />
                  <span className="text-white text-xs font-semibold">Standard In Evidenza (Blog)</span>
                </label>
                {modalIsFeatured && (
                  <div className="pl-6 space-y-1">
                    <span className="text-[10px] text-glicine-400 block uppercase">Data Termine</span>
                    <input 
                      type="date"
                      value={modalFeaturedEndDate}
                      onChange={(e) => setModalFeaturedEndDate(e.target.value)}
                      className="w-full px-2 py-1.5 rounded bg-glicine-950 text-white border border-glicine-800 text-xs focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Option 2: Top Featured (Homepage Large) */}
              <div className="space-y-2 p-3 bg-glicine-950/40 rounded-xl border border-glicine-900">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={modalIsTopFeatured}
                    onChange={(e) => {
                      setModalIsTopFeatured(e.target.checked);
                      if (e.target.checked) setModalIsFeatured(true);
                    }}
                    className="h-4 w-4 rounded border-glicine-800 text-glicine-600 bg-glicine-950"
                  />
                  <span className="text-white text-xs font-semibold flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-amber-400 fill-amber-400/20" /> Top Evidenza (Home Page)
                  </span>
                </label>
                <p className="text-[9px] text-glicine-400 pl-6">Nota: puoi avere un solo Top Evidenza. Selezionandolo, quello precedente verrà rimosso.</p>
                {modalIsTopFeatured && (
                  <div className="pl-6 space-y-1">
                    <span className="text-[10px] text-glicine-400 block uppercase">Data Termine</span>
                    <input 
                      type="date"
                      value={modalTopFeaturedEndDate}
                      onChange={(e) => setModalTopFeaturedEndDate(e.target.value)}
                      className="w-full px-2 py-1.5 rounded bg-glicine-950 text-white border border-glicine-800 text-xs focus:outline-none"
                    />
                  </div>
                )}
              </div>

            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setFeaturedModalArticle(null)}
                className="flex-1 py-2 rounded-xl bg-glicine-800 hover:bg-glicine-750 text-glicine-300 font-semibold text-xs border border-glicine-700"
              >
                Annulla
              </button>
              <button
                onClick={saveFeaturedModalSettings}
                className="flex-1 py-2 rounded-xl bg-glicine-600 hover:bg-glicine-500 text-white font-semibold text-xs"
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-glicine-900 border border-glicine-800 rounded-3xl p-6 max-w-sm w-full space-y-6 shadow-2xl">
            <div className="space-y-2 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-3">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="font-outfit font-extrabold text-xl text-white">Elimina Articolo</h3>
              <p className="text-glicine-300 text-xs leading-relaxed">
                Sei sicuro di voler eliminare definitivamente questo articolo? L'azione è irreversibile.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-glicine-800 hover:bg-glicine-750 text-glicine-300 font-semibold text-xs transition-all border border-glicine-700"
              >
                Annulla
              </button>
              <button
                onClick={() => handleDeleteExecute(showDeleteModal)}
                className="flex-1 py-2.5 rounded-xl bg-red-650 hover:bg-red-550 text-white font-semibold text-xs transition-all"
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-glicine-400 font-semibold text-xs uppercase tracking-widest font-outfit">Gestione Editoriale</span>
          <h2 className="font-outfit text-3xl font-extrabold text-white">Articoli &amp; Eventi</h2>
          <p className="text-glicine-300/80 text-sm">Pubblica nuovi articoli, gestisci i blocchi in evidenza ed eventi della scuola.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCategoryPanel(!showCategoryPanel)}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-white font-bold text-xs uppercase tracking-widest transition-all border shadow-md ${
              showCategoryPanel 
                ? "bg-glicine-700 border-glicine-600 shadow-glicine-800/20" 
                : "bg-glicine-900 border-glicine-800 hover:bg-glicine-800 shadow-glicine-900/10"
            } cursor-pointer`}
          >
            <Settings className="h-4 w-4" /> Categorie
          </button>
          {!isEditing && (
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-glicine-800 hover:bg-glicine-750 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-glicine-900/20 border border-glicine-700/50 cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Scrivi Nuovo
            </button>
          )}
        </div>
      </section>

      {/* Collapsible Categories Panel */}
      {showCategoryPanel && (
        <section className="bg-glicine-900/30 border border-glicine-800/60 rounded-[2rem] p-6 sm:p-8 shadow-xl space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-glicine-900 pb-3">
            <h3 className="font-outfit font-extrabold text-lg text-white flex items-center gap-2">
              <Layers className="h-4.5 w-4.5 text-glicine-400" /> Gestione Categorie
            </h3>
            <button
              onClick={() => { setShowCategoryPanel(false); setEditingCategoryIdx(null); }}
              className="p-1 rounded-lg hover:bg-glicine-850 text-glicine-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex gap-3 max-w-md">
            <input
              type="text"
              placeholder="Aggiungi nuova categoria..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-grow px-4 py-2.5 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white placeholder-glicine-600 text-xs focus:outline-none focus:border-glicine-400 transition-all"
            />
            <button
              onClick={handleAddCategory}
              className="px-4 py-2.5 bg-glicine-700 hover:bg-glicine-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Aggiungi
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {customCategories.map((cat, idx) => {
              const isCatEditing = editingCategoryIdx === idx;
              return (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-glicine-950/40 border border-glicine-900 text-xs">
                  {isCatEditing ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        value={editingCategoryVal}
                        onChange={(e) => setEditingCategoryVal(e.target.value)}
                        className="flex-grow px-2 py-1 bg-glicine-950 text-white border border-glicine-800 rounded focus:outline-none text-[11px]"
                      />
                      <button onClick={() => handleSaveCategoryEdit(idx)} className="text-emerald-450 hover:text-white" title="Salva">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => setEditingCategoryIdx(null)} className="text-red-400 hover:text-white" title="Annulla">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-white font-semibold">{cat}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStartEditCategory(idx, cat)}
                          className="text-glicine-400 hover:text-white"
                          title="Rinomina"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(idx)}
                          className="text-red-400/80 hover:text-red-400"
                          title="Elimina"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Form Section */}
      {isEditing && (
        <section className="bg-glicine-900/40 border border-glicine-800/80 rounded-[2rem] p-6 sm:p-10 shadow-2xl space-y-8 animate-fade-in">
          <div className="flex items-center justify-between border-b border-glicine-900 pb-4">
            <h3 className="font-outfit font-extrabold text-xl text-white">
              {currentArticle ? "Modifica Articolo" : "Crea Nuovo Articolo o Evento"}
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-xl bg-glicine-800 hover:bg-glicine-750 text-glicine-300 hover:text-white border border-glicine-700 transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6 text-sm">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block">Titolo</label>
                <input 
                  type="text" 
                  name="title"
                  value={formValues.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Es. Il potere della consapevolezza emotiva"
                  className="w-full px-4 py-3 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white placeholder-glicine-700 focus:outline-none focus:border-glicine-400 transition-all font-outfit"
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block">Slug URL (nominale)</label>
                <input 
                  type="text" 
                  name="slug"
                  value={formValues.slug}
                  readOnly
                  required
                  placeholder="Generato automaticamente dal titolo..."
                  className="w-full px-4 py-3 rounded-xl border border-glicine-900 bg-glicine-950/30 text-glicine-400 placeholder-glicine-800 cursor-not-allowed opacity-75 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block">Categoria</label>
                <select 
                  name="category"
                  value={formValues.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white focus:outline-none focus:border-glicine-400 transition-all cursor-pointer"
                >
                  {customCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Author */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block">Autore</label>
                <input 
                  type="text" 
                  name="author"
                  value={formValues.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white focus:outline-none focus:border-glicine-400 transition-all"
                />
              </div>

              {/* Read Time */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block">Tempo di Lettura (es. 5 min)</label>
                <input 
                  type="text" 
                  name="readTime"
                  value={formValues.readTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white focus:outline-none focus:border-glicine-400 transition-all"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block">Riassunto / Anteprima del Post</label>
              <textarea 
                name="excerpt"
                rows={3}
                value={formValues.excerpt}
                onChange={handleInputChange}
                placeholder="Inserisci un breve estratto del testo che comparirà nelle schede..."
                className="w-full px-4 py-3 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white placeholder-glicine-700 focus:outline-none focus:border-glicine-400 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Content / Body */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block">Corpo dell'articolo / Testo Completo</label>
              <textarea 
                name="content"
                rows={10}
                value={formValues.content}
                onChange={handleInputChange}
                placeholder="Inserisci il testo completo dell'articolo. Puoi usare gli a capo per creare i paragrafi..."
                className="w-full px-4 py-3 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white placeholder-glicine-700 focus:outline-none focus:border-glicine-400 transition-all leading-relaxed"
              />
            </div>

            {/* Image Upload and Link input */}
            <div className="grid sm:grid-cols-2 gap-6 p-4 bg-glicine-950/20 border border-glicine-900 rounded-2xl">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> URL Immagine (Link Esterno)
                </label>
                <input 
                  type="text" 
                  name="image"
                  value={(formValues.image || "").startsWith("data:") ? "" : formValues.image || ""}
                  onChange={handleInputChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white placeholder-glicine-700 focus:outline-none focus:border-glicine-400 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block flex items-center gap-1.5">
                  <Upload className="h-3.5 w-3.5" /> Carica File Immagine
                </label>
                <div className="relative w-full h-[46px] border border-dashed border-glicine-800 bg-glicine-950/40 hover:bg-glicine-950/80 rounded-xl transition-all flex items-center justify-center cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <span className="text-xs text-glicine-400 font-semibold flex items-center gap-2">
                    <Upload className="h-4 w-4" /> Seleziona un file (Max 10MB)
                  </span>
                </div>
              </div>

              {formValues.image && (
                <div className="sm:col-span-2 flex items-center gap-4 pt-2">
                  <div className="h-14 w-20 rounded-lg overflow-hidden border border-glicine-800 bg-glicine-950 flex-shrink-0">
                    <img src={formValues.image} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <span className="text-glicine-350 font-bold block">Anteprima Immagine</span>
                    <span className="text-glicine-500 font-light truncate max-w-md block">
                      {(formValues.image || "").startsWith("data:") ? "Immagine caricata in Base64 (Local File)" : formValues.image}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {/* Priority / Order */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block">Ordinamento / Priorità (minore = primo)</label>
                <input 
                  type="number" 
                  name="orderPriority"
                  value={formValues.orderPriority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white focus:outline-none focus:border-glicine-400 transition-all"
                />
              </div>

              {/* Tags */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-semibold text-glicine-300 uppercase tracking-wider block">Tags (separati da virgola)</label>
                <input 
                  type="text" 
                  name="tags"
                  value={formValues.tags}
                  onChange={handleInputChange}
                  placeholder="counseling, emozioni, consapevolezza"
                  className="w-full px-4 py-3 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white placeholder-glicine-700 focus:outline-none focus:border-glicine-400 transition-all"
                />
              </div>
            </div>

            {/* Config & Meta flags */}
            <div className="p-6 bg-glicine-950/40 rounded-2xl border border-glicine-850/80 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-glicine-400 block mb-2 border-b border-glicine-900 pb-2">
                Parametri Avanzati &amp; Indicizzazione
              </h4>

              <div className="grid sm:grid-cols-4 gap-6">
                {/* Event flag */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    name="isEvent"
                    checked={formValues.isEvent}
                    onChange={handleCheckboxChange}
                    className="h-4.5 w-4.5 rounded border-glicine-800 text-glicine-600 focus:ring-glicine-500 cursor-pointer bg-glicine-950"
                  />
                  <div>
                    <span className="text-white block font-semibold text-xs">Flag Eventi / Corsi</span>
                    <span className="text-[10px] text-glicine-400 font-light">Identifica come evento</span>
                  </div>
                </label>

                {/* Featured flag */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    name="isFeatured"
                    checked={formValues.isFeatured}
                    onChange={handleCheckboxChange}
                    className="h-4.5 w-4.5 rounded border-glicine-800 text-glicine-600 focus:ring-glicine-500 cursor-pointer bg-glicine-950"
                  />
                  <div>
                    <span className="text-white block font-semibold text-xs">In Evidenza (Blog)</span>
                    <span className="text-[10px] text-glicine-400 font-light">Sezione superiore blog</span>
                  </div>
                </label>

                {/* Top Featured flag */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    name="isTopFeatured"
                    checked={formValues.isTopFeatured}
                    onChange={handleCheckboxChange}
                    className="h-4.5 w-4.5 rounded border-glicine-800 text-glicine-600 focus:ring-glicine-500 cursor-pointer bg-glicine-950"
                  />
                  <div>
                    <span className="text-white block font-semibold text-xs flex items-center gap-1">
                      <Award className="h-3 w-3 text-amber-400" /> Top Evidenza (Home)
                    </span>
                    <span className="text-[10px] text-glicine-400 font-light">Post grande Home Page</span>
                  </div>
                </label>

                {/* Auto Indexing flag */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    name="autoIndexing"
                    checked={formValues.autoIndexing}
                    onChange={handleCheckboxChange}
                    className="h-4.5 w-4.5 rounded border-glicine-800 text-glicine-600 focus:ring-glicine-500 cursor-pointer bg-glicine-950"
                  />
                  <div>
                    <span className="text-white block font-semibold text-xs">Indicizzazione</span>
                    <span className="text-[10px] text-glicine-400 font-light">Invia ping a Google</span>
                  </div>
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-2 border-t border-glicine-900 mt-2">
                {formValues.isFeatured && (
                  <div className="space-y-1 max-w-sm animate-fade-in">
                    <label className="text-[10px] font-bold text-glicine-300 uppercase block">Data Termine Evidenza Blog</label>
                    <input 
                      type="date" 
                      name="featuredEndDate"
                      value={formValues.featuredEndDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-glicine-800 bg-glicine-950 text-white focus:outline-none focus:border-glicine-400 text-xs"
                    />
                  </div>
                )}

                {formValues.isTopFeatured && (
                  <div className="space-y-1 max-w-sm animate-fade-in">
                    <label className="text-[10px] font-bold text-glicine-300 uppercase block">Data Termine Top Evidenza Home</label>
                    <input 
                      type="date" 
                      name="topFeaturedEndDate"
                      value={formValues.topFeaturedEndDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-glicine-800 bg-glicine-950 text-white focus:outline-none focus:border-glicine-400 text-xs"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-glicine-700 hover:bg-glicine-600 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-glicine-800/20 cursor-pointer"
              >
                <Check className="h-4 w-4" /> {currentArticle ? "Salva Modifiche" : "Pubblica Post"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-glicine-800 hover:bg-glicine-750 text-glicine-300 font-bold text-xs uppercase tracking-widest transition-all border border-glicine-700/80 cursor-pointer"
              >
                Annulla
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Search & Filters */}
      {!isEditing && (
        <section className="grid sm:grid-cols-12 gap-4 bg-glicine-900/30 p-4 rounded-2xl border border-glicine-900">
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-glicine-400" />
            <input 
              type="text" 
              placeholder="Cerca per titolo, estratto o tag..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white placeholder-glicine-500 focus:outline-none focus:border-glicine-400 text-sm transition-all"
            />
          </div>
          <div className="sm:col-span-3 relative">
            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-glicine-400" />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white focus:outline-none focus:border-glicine-400 text-sm transition-all appearance-none cursor-pointer"
            >
              <option value="Tutti">Categoria: Tutti</option>
              {customCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-3 relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-glicine-400" />
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white focus:outline-none focus:border-glicine-400 text-sm transition-all appearance-none cursor-pointer"
            >
              <option value="Tutti">Filtro: Tutti i post</option>
              <option value="Articoli">Filtro: Solo Articoli</option>
              <option value="Eventi">Filtro: Solo Eventi/Corsi</option>
              <option value="In Evidenza">Filtro: Solo in Evidenza</option>
              <option value="Top Evidenza">Filtro: Solo Top Evidenza</option>
            </select>
          </div>
        </section>
      )}

      {/* Articles List Table */}
      {!isEditing && (
        <section className="bg-glicine-900/40 border border-glicine-800/80 rounded-3xl overflow-hidden shadow-xl">
          {filteredArticles.length === 0 ? (
            <div className="p-16 text-center text-glicine-400 space-y-4">
              <BookOpen className="h-12 w-12 mx-auto text-glicine-500" />
              <p className="text-sm">Nessun articolo caricato o corrispondente ai filtri selezionati.</p>
            </div>
          ) : (
            <div className="divide-y divide-glicine-900">
              
              {/* Table Header */}
              <div className="hidden lg:grid grid-cols-12 gap-4 p-6 bg-glicine-950/20 text-xs font-semibold text-glicine-300 uppercase tracking-wider">
                <div className="col-span-1">Priorità</div>
                <div className="col-span-5">Articolo / Dettagli</div>
                <div className="col-span-2">Categoria</div>
                <div className="col-span-3">Stati &amp; Scadenze</div>
                <div className="col-span-1 text-right">Azioni</div>
              </div>

              {/* Table Entries */}
              {filteredArticles.map((art) => (
                <div key={art.slug} className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-6 items-center hover:bg-glicine-900/20 transition-all duration-300">
                  
                  {/* Priority Order */}
                  <div className="col-span-1 flex items-center gap-2 lg:justify-start">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-glicine-950 border border-glicine-900 text-glicine-300">
                      #{art.orderPriority ?? 10}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="col-span-5 flex items-start gap-4">
                    {art.image && (
                      <div className="h-10 w-14 rounded overflow-hidden border border-glicine-900 bg-glicine-950 flex-shrink-0 hidden sm:block">
                        <img src={art.image} alt="" className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <h4 className="font-semibold text-white text-base font-outfit leading-snug">{art.title}</h4>
                      <p className="text-glicine-300/80 text-xs line-clamp-2 max-w-xl">{art.excerpt}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {(art.tags || []).map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded bg-glicine-950 text-glicine-400 font-semibold border border-glicine-900">
                            <Tag className="h-2.5 w-2.5" /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-glicine-950 text-glicine-300 text-xs font-bold border border-glicine-900">
                      {art.category}
                    </span>
                  </div>

                  {/* Parametri flags & EndDate */}
                  <div className="col-span-3 space-y-2.5">
                    <div className="flex flex-wrap gap-2">
                      {/* Event Badge */}
                      {art.isEvent && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-purple-550/20 text-purple-300 border border-purple-800/40">
                          <Calendar className="h-2.5 w-2.5" /> Evento/Corso
                        </span>
                      )}

                      {/* Top Featured Badge */}
                      {art.isTopFeatured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-500 text-glicine-950 border border-amber-400 animate-pulse">
                          <Award className="h-2.5 w-2.5 fill-current" /> Top Evidenza
                        </span>
                      )}

                      {/* Featured Badge */}
                      {art.isFeatured && !art.isTopFeatured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-550/20 text-amber-300 border border-amber-800/40">
                          <Star className="h-2.5 w-2.5 fill-current" /> In Evidenza
                        </span>
                      )}

                      {/* Standard Badge */}
                      {!art.isFeatured && !art.isTopFeatured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-glicine-950 text-glicine-550 border border-glicine-900">
                          Standard
                        </span>
                      )}

                      {/* Auto Indexing Badge */}
                      {art.autoIndexing && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-550/20 text-emerald-300 border border-emerald-800/40">
                          <Globe className="h-2.5 w-2.5" /> SEO Ping
                        </span>
                      )}
                    </div>

                    {/* Expiry Date Standard */}
                    {art.isFeatured && !art.isTopFeatured && art.featuredEndDate && (
                      <div className="text-[10px] text-glicine-400 flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-glicine-500" />
                        <span>Termine blog: <strong className="text-white">{art.featuredEndDate}</strong></span>
                      </div>
                    )}

                    {/* Expiry Date Top */}
                    {art.isTopFeatured && art.topFeaturedEndDate && (
                      <div className="text-[10px] text-amber-400 flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-amber-550" />
                        <span>Termine Home: <strong className="text-white">{art.topFeaturedEndDate}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openFeaturedModal(art)}
                      className={`p-2 rounded-lg border transition-all duration-300 ${
                        art.isFeatured || art.isTopFeatured
                          ? "bg-amber-955/20 text-amber-300 border-amber-900/60" 
                          : "bg-glicine-800 hover:bg-glicine-750 text-glicine-350 hover:text-white border-glicine-700"
                      }`}
                      title="Gestisci Stato Evidenze"
                    >
                      <Star className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditClick(art)}
                      className="p-2 rounded-lg bg-glicine-800 hover:bg-glicine-750 text-glicine-200 hover:text-white border-glicine-700 transition-all duration-300"
                      title="Modifica Post"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(art.slug)}
                      className="p-2 rounded-lg bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 border border-red-900/30 hover:border-red-900/60 transition-all duration-300"
                      title="Elimina Post"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              ))}

            </div>
          )}
        </section>
      )}

    </div>
  );
}
