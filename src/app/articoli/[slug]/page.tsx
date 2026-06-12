"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Heart, MessageCircle, Link2, Check } from "lucide-react";
import { articles } from "@/data/articles";
import { supabase } from "@/data/supabase";

export default function ArticoloPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data: dbArticle, error } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;

        if (dbArticle) {
          setArticle({
            slug: dbArticle.slug,
            title: dbArticle.title,
            category: dbArticle.category,
            date: dbArticle.date,
            readTime: dbArticle.read_time,
            excerpt: dbArticle.excerpt,
            image: dbArticle.image,
            author: dbArticle.author,
            isFeatured: dbArticle.is_featured,
            isFavorite: dbArticle.is_favorite,
            content: dbArticle.content,
            orderPriority: dbArticle.order_priority,
            tags: dbArticle.tags || [],
            isEvent: dbArticle.is_event,
            featuredEndDate: dbArticle.featured_end_date,
            autoIndexing: dbArticle.auto_indexing,
            isTopFeatured: dbArticle.is_top_featured,
            topFeaturedEndDate: dbArticle.top_featured_end_date
          });
        } else {
          setArticle(null);
        }
      } catch (e) {
        console.error("Error loading article from Supabase:", e);
        // Fallback to static articles
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

        {/* Sharing Widget */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-outfit font-bold text-glicine-950 text-lg">Ti è piaciuto questo articolo?</h4>
            <p className="text-slate-500 text-sm font-light">Condividilo con i tuoi contatti o sui tuoi canali social.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Facebook Share Button */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-glicine-50 hover:bg-glicine-100 text-glicine-900 text-sm font-semibold transition-all duration-300 border border-glicine-200/50 hover:shadow-sm hover:scale-[1.01]"
            >
              <svg className="w-4 h-4 fill-current text-glicine-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
              <span>Facebook</span>
            </a>

            {/* WhatsApp Share Button */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " " + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-glicine-50 hover:bg-glicine-100 text-glicine-900 text-sm font-semibold transition-all duration-300 border border-glicine-200/50 hover:shadow-sm hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4 text-glicine-600" />
              <span>WhatsApp</span>
            </a>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-glicine-50 hover:bg-glicine-100 text-glicine-900 text-sm font-semibold transition-all duration-300 border border-glicine-200/50 hover:shadow-sm hover:scale-[1.01]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 animate-bounce" />
                  <span className="text-emerald-600">Copiato!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4 text-glicine-600" />
                  <span>Copia Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="clear-both" />
      </section>
    </article>
  );
}
