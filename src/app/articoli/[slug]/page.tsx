"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Heart } from "lucide-react";
import { articles } from "@/data/articles";
import { idbGet } from "@/data/db";

export default function ArticoloPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const stored = await idbGet("monica_articles");
        const list = stored ? stored : articles;
        const found = list.find((item: any) => item.slug === slug);
        setArticle(found || null);
      } catch (e) {
        setArticle(articles.find((item) => item.slug === slug) || null);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <span className="text-glicine-600 animate-pulse font-medium">Caricamento articolo...</span>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-outfit text-3xl font-extrabold text-glicine-900 mb-4">Articolo non trovato</h1>
        <p className="text-slate-500 mb-8 max-w-md">La scheda richiesta non esiste o verrà pubblicata più avanti.</p>
        <Link href="/articoli" className="px-6 py-3 rounded-full bg-glicine-900 text-white font-bold text-xs uppercase tracking-widest">
          Torna alla bacheca
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white min-h-screen pb-20">
      {/* Banner section */}
      <section className="relative w-full min-h-[460px] pt-36 pb-20 overflow-hidden bg-glicine-950 flex items-center">
        <div className="absolute inset-0">
          <img src={article.image} alt="" className="w-full h-full object-cover opacity-30 blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-glicine-950/80 to-glicine-950/95" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-8 w-full">
          <Link href="/articoli" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-glicine-200 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Bacheca articoli
          </Link>
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest font-bold">
              <span className="px-3 py-1 rounded-full bg-glicine-300 text-glicine-955">{article.category}</span>
              {article.isFavorite && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-glicine-100 border border-white/15">
                  <Heart className="w-3.5 h-3.5 fill-current text-amber-400" /> Preferito
                </span>
              )}
            </div>
            <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {article.title}
            </h1>
            <p className="text-glicine-100/90 text-lg leading-relaxed font-light max-w-3xl">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-5 text-glicine-150 text-sm">
              <span>{article.author}</span>
              <span>{article.date}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="max-w-4xl mx-auto px-6 mt-12">
        <div className="prose prose-slate max-w-none">
          {/* Main Article Image floated to the right */}
          <div className="w-full md:w-[350px] aspect-[4/3] md:aspect-[3/4] rounded-[2rem] overflow-hidden border border-glicine-100/80 shadow-lg md:float-right md:ml-8 mb-6 md:mb-6 hover:scale-[1.01] transition-transform duration-500">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          {article.content ? (
            article.content.split("\n").map((para: string, idx: number) => {
              const trimmed = para.trim();
              if (!trimmed) return null;
              return (
                <p key={idx} className="text-slate-600 leading-relaxed font-light text-base sm:text-lg mb-4">
                  {trimmed}
                </p>
              );
            })
          ) : (
            <p className="text-slate-600 leading-relaxed font-light text-base sm:text-lg">
              {article.excerpt}
            </p>
          )}
        </div>
        <div className="clear-both" />
      </section>
    </article>
  );
}
