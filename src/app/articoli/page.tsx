"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Heart, Search, Sparkles, Star } from "lucide-react";
import { articleCategories, articles } from "@/data/articles";
import { idbGet } from "@/data/db";

export default function ArticoliPage() {
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const [displayArticles, setDisplayArticles] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await idbGet("monica_articles");
        if (stored) {
          setDisplayArticles(stored);
        } else {
          setDisplayArticles(articles);
        }

        const storedCats = localStorage.getItem("monica_categories");
        if (storedCats) {
          setCategoriesList(["Tutti", ...JSON.parse(storedCats)]);
        } else {
          setCategoriesList(articleCategories);
        }
      } catch (e) {
        setDisplayArticles(articles);
        setCategoriesList(articleCategories);
      }
    };
    loadData();
  }, []);

  const featuredArticle = useMemo(() => {
    if (displayArticles.length === 0) return null;
    const today = new Date().toISOString().split("T")[0];

    // Find valid Top Featured or standard Featured article
    const top = displayArticles.find(art => 
      art.isTopFeatured && (!art.topFeaturedEndDate || today <= art.topFeaturedEndDate)
    );
    if (top) return top;

    const feat = displayArticles.find(art => 
      art.isFeatured && (!art.featuredEndDate || today <= art.featuredEndDate)
    );
    if (feat) return feat;

    return displayArticles[0];
  }, [displayArticles]);

  const favoriteArticles = useMemo(() => {
    return displayArticles.filter((article) => article.isFavorite);
  }, [displayArticles]);

  const filteredArticles = useMemo(() => {
    return activeCategory === "Tutti"
      ? displayArticles
      : displayArticles.filter((article) => article.category === activeCategory);
  }, [activeCategory, displayArticles]);

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-glicine-950 pt-36 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1800&auto=format&fit=crop"
            alt="Scrivania editoriale con seminari"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-glicine-950 via-glicine-950/85 to-glicine-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-4xl space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-glicine-100 text-xs font-bold uppercase tracking-widest">
              <BookOpen className="w-4 h-4" /> Bacheca editoriale
            </span>
            <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Articoli, seminari e percorsi di consapevolezza
            </h1>
            <p className="text-glicine-100/90 text-base sm:text-lg leading-relaxed max-w-3xl font-light">
              Una raccolta dinamica di contenuti divulgativi organizzati per categorie, preferiti e temi. Per ora i contenuti sono dimostrativi; la struttura e gia pronta per un editoriale con pubblicazione da backend.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-glicine-50/30 border-b border-glicine-100/50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 group bg-white border border-glicine-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <div className="grid md:grid-cols-2 h-full">
              <div className="relative min-h-[300px] overflow-hidden">
                {featuredArticle && (
                  <>
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-glicine-400 text-glicine-950 text-[10px] font-extrabold uppercase tracking-widest shadow-lg">
                      <Star className="w-3.5 h-3.5 fill-current" /> {featuredArticle.isTopFeatured ? "Top in evidenza" : "In evidenza"}
                    </div>
                  </>
                )}
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-between gap-8">
                {featuredArticle && (
                  <>
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest font-bold">
                        <span className="px-3 py-1 rounded-full bg-glicine-100 text-glicine-800">
                          {featuredArticle.category}
                        </span>
                        <span className="text-slate-400">{featuredArticle.date}</span>
                      </div>
                      <h2 className="font-outfit text-2xl sm:text-3xl font-extrabold text-glicine-900 leading-tight">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed font-light">
                        {featuredArticle.excerpt}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                      <span className="inline-flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                        <Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}
                      </span>
                      <Link href={`/articoli/${featuredArticle.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-glicine-700 hover:text-glicine-950 transition-colors group/link">
                        Apri articolo <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.article>

          <aside className="lg:col-span-4 bg-white border border-glicine-100 rounded-[2rem] p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-glicine-600">Preferiti</span>
                <h2 className="font-outfit text-2xl font-extrabold text-glicine-900">Da leggere prima</h2>
              </div>
              <Heart className="w-6 h-6 text-glicine-500 fill-glicine-200" />
            </div>
            <div className="space-y-4">
              {favoriteArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articoli/${article.slug}`}
                  className="block rounded-2xl border border-glicine-100 p-4 hover:bg-glicine-50/60 transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-widest font-bold text-glicine-600">
                    {article.category}
                  </span>
                  <h3 className="font-outfit font-bold text-glicine-950 leading-snug mt-1">
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-glicine-600 font-bold uppercase tracking-[0.25em] text-xs font-outfit block">
                Archivio
              </span>
              <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-glicine-900">
                Tutti gli articoli
              </h2>
            </div>
            <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
              {categoriesList.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 px-4 py-2 rounded-full border text-[11px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === category
                      ? "bg-glicine-900 border-glicine-900 text-white shadow-md"
                      : "bg-white border-glicine-100 text-glicine-700 hover:border-glicine-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {filteredArticles.map((article, idx) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="group bg-white border border-glicine-100 rounded-[1.7rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {article.isFavorite && (
                      <div className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white/90 text-glicine-600 flex items-center justify-center shadow-md">
                        <Heart className="w-4 h-4 fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-widest font-bold">
                      <span className="text-glicine-600">{article.category}</span>
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-outfit text-xl font-extrabold text-glicine-900 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                    <Link href={`/articoli/${article.slug}`} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-glicine-700 hover:text-glicine-950 transition-colors group/link">
                      Leggi scheda <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-glicine-50/50 border border-glicine-100 rounded-[1.7rem] p-7 space-y-4">
                <Search className="w-6 h-6 text-glicine-600" />
                <h3 className="font-outfit text-xl font-extrabold text-glicine-900">Prossimo step backend</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  Qui collegheremo ricerca, stato bozza/pubblicato, categorie modificabili, immagine di copertina, preferiti e composizione dell'articolo da editor.
                </p>
              </div>
              <div className="bg-glicine-950 text-white rounded-[1.7rem] p-7 space-y-4">
                <Sparkles className="w-6 h-6 text-glicine-300" />
                <h3 className="font-outfit text-xl font-extrabold">Composizione editoriale</h3>
                <p className="text-glicine-100 text-sm leading-relaxed font-light">
                  Il layout prevede titolo, occhiello, sintesi, categoria, autore, tempi di lettura, preferito, copertina e corpo contenuto.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
