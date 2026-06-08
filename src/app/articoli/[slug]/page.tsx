"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Heart } from "lucide-react";
import { articles } from "@/data/articles";

export default function ArticoloPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-outfit text-3xl font-extrabold text-glicine-900 mb-4">Articolo non trovato</h1>
        <p className="text-slate-500 mb-8 max-w-md">La scheda richiesta non esiste o verra pubblicata piu avanti.</p>
        <Link href="/articoli" className="px-6 py-3 rounded-full bg-glicine-900 text-white font-bold text-xs uppercase tracking-widest">
          Torna alla bacheca
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white min-h-screen pb-20">
      <section className="relative w-full min-h-[560px] pt-36 pb-20 overflow-hidden bg-glicine-950">
        <div className="absolute inset-0">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-glicine-950/80 to-glicine-950/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-8">
          <Link href="/articoli" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-glicine-200 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Bacheca articoli
          </Link>
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest font-bold">
              <span className="px-3 py-1 rounded-full bg-glicine-300 text-glicine-950">{article.category}</span>
              {article.isFavorite && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-glicine-100 border border-white/15">
                  <Heart className="w-3.5 h-3.5 fill-current" /> Preferito
                </span>
              )}
            </div>
            <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {article.title}
            </h1>
            <p className="text-glicine-100/90 text-lg leading-relaxed font-light max-w-3xl">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-5 text-glicine-100 text-sm">
              <span>{article.author}</span>
              <span>{article.date}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 mt-16">
        <div className="prose prose-slate max-w-none">
          <p className="text-xl leading-relaxed text-slate-700 font-light">
            Questo e un contenuto dimostrativo pensato per mostrare la composizione editoriale dell'articolo. Nel prossimo passaggio potremo collegare questa pagina a un modello backend con titolo, sintesi, categoria, copertina, stato di pubblicazione e corpo testuale modificabile da editor.
          </p>
          <h2 className="font-outfit text-2xl font-extrabold text-glicine-900 mt-12 mb-4">Una traccia di lettura</h2>
          <p className="text-slate-600 leading-relaxed font-light">
            Ogni articolo potra diventare uno spazio ordinato per approfondire temi di counseling, pedagogia, relazione e crescita personale. La struttura visiva mantiene in evidenza la sintesi iniziale, mentre il corpo centrale puo accogliere paragrafi, citazioni, immagini e richiami ai percorsi collegati.
          </p>
          <p className="text-slate-600 leading-relaxed font-light">
            La bacheca potra inoltre distinguere articoli in bozza, pubblicati, preferiti o programmati, lasciando all'editor la possibilita di curare categorie e ordine di lettura.
          </p>
        </div>
      </section>
    </article>
  );
}
