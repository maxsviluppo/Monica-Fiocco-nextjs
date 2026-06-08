"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Compass, GraduationCap, Heart, Sparkles, Users } from "lucide-react";

const milestones = [
  {
    title: "Napoli e la formazione",
    text:
      "Sono nata a Napoli alla fine degli anni Sessanta, in una citta difficile e incantevole, un chiaroscuro potente che mi ha insegnato presto a osservare la complessita delle cose. Qui ho vissuto, studiato e mi sono laureata con il massimo dei voti in Pedagogia a indirizzo psicologico.",
    icon: Compass,
  },
  {
    title: "L'approccio umanistico",
    text:
      "Intorno alla meta degli anni Novanta ho sentito il bisogno di una ricerca piu profonda. L'incontro con l'approccio umanistico di Carl Rogers ha orientato la mia professione verso la relazione d'aiuto, la comunicazione empatica e il counseling.",
    icon: Heart,
  },
  {
    title: "Formazione e gruppi",
    text:
      "Sono diventata formatrice per docenti, allievi delle scuole di formazione e gruppi di genitori. Ho insegnato nelle scuole di counseling e accompagnato molte persone a riconoscere strumenti nuovi per comprendere se stesse e le relazioni.",
    icon: Users,
  },
  {
    title: "Olismo e transgenerazionale",
    text:
      "Dal 2009 il mio percorso si e aperto a una visione olistica dell'essere umano: unita inscindibile di mente, emozioni, corpo, relazioni e dimensione spirituale. Da qui l'approfondimento della pedagogia transgenerazionale e delle costellazioni familiari sistemiche.",
    icon: Sparkles,
  },
];

const focusAreas = [
  "Counseling ad approccio integrato e transgenerazionale",
  "Psicopedagogia relazionale e consulenza educativa",
  "Costellazioni familiari sistemiche",
  "Formazione per docenti, professionisti e genitori",
  "Metodo M.U.R.E.N.A. per relazione, empatia e comunicazione",
  "Accompagnamento consapevole alla crescita personale",
];

export default function ChiSonoPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative min-h-[620px] overflow-hidden bg-glicine-950 pt-36 pb-20">
        <div className="absolute inset-0">
          <img
            src="/monica-portrait.jpg"
            alt="Monica Fiocco"
            className="w-full h-full object-cover object-[center_25%] opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-glicine-950 via-glicine-950/85 to-glicine-900/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-end min-h-[440px]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 space-y-7"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-glicine-100 text-xs font-bold uppercase tracking-widest">
              <Heart className="w-4 h-4" /> Chi sono
            </span>
            <div className="space-y-4">
              <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Monica Fiocco
              </h1>
              <p className="text-glicine-100/95 text-lg sm:text-xl leading-relaxed max-w-3xl font-light">
                Psicopedagogista, formatrice, counselor ad approccio integrato e transgenerazionale, facilitatrice in costellazioni familiari sistemiche.
              </p>
            </div>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-3xl font-light">
              Accompagno persone, famiglie e professionisti in percorsi di crescita, consapevolezza e trasformazione, integrando educazione, emozioni e sistemi relazionali.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 bg-white/95 backdrop-blur-sm border border-glicine-100 rounded-[2rem] p-7 shadow-2xl"
          >
            <p className="font-outfit text-2xl font-light italic leading-relaxed text-glicine-950">
              "Credo in un'educazione che non corregge, ma comprende."
            </p>
            <div className="w-12 h-1 bg-glicine-400 rounded-full my-5" />
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              In un accompagnamento che non guida dall'alto, ma cammina accanto.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-glicine-600 font-bold uppercase tracking-[0.25em] text-xs font-outfit block">
                Il mio lavoro
              </span>
              <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-glicine-900 leading-tight">
                Ritrovare il proprio posto, il proprio ritmo, la propria verita
              </h2>
            </div>

            <div className="space-y-6 text-slate-600 leading-relaxed font-light">
              <p>
                Il mio lavoro nasce dall'ascolto profondo e dall'incontro tra educazione, emozioni e sistemi relazionali. Integro strumenti psicopedagogici, counseling e costellazioni familiari per aiutare ogni individuo a ritrovare il proprio posto e una relazione piu autentica con se stesso e con gli altri.
              </p>
              <p>
                Offro percorsi individuali, formazione e consulenze educative orientate al benessere emotivo, alla crescita personale e all'armonia delle relazioni.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {focusAreas.map((area) => (
                <div key={area} className="flex items-start gap-3 rounded-2xl border border-glicine-100 bg-glicine-50/40 p-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-glicine-500 shrink-0" />
                  <p className="text-sm font-semibold text-glicine-950 leading-relaxed">{area}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-glicine-950 text-white rounded-[2rem] p-8 space-y-5">
              <BookOpen className="w-7 h-7 text-glicine-300" />
              <h3 className="font-outfit text-2xl font-extrabold">Una ricerca viva</h3>
              <p className="text-glicine-100 leading-relaxed font-light">
                La mia formazione non e stata una linea retta, ma un cammino di domande, intuizioni, incontri e passaggi decisivi. Ogni metodo che utilizzo nasce dall'esperienza e da una ricerca di senso concreta.
              </p>
            </div>
            <div className="bg-white border border-glicine-100 rounded-[2rem] p-8 shadow-sm space-y-4">
              <GraduationCap className="w-7 h-7 text-glicine-600" />
              <h3 className="font-outfit text-2xl font-extrabold text-glicine-900">Metodo M.U.R.E.N.A.</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Un approccio di cui vado profondamente orgogliosa, attraverso il quale ho formato sul campo oltre duecento professionisti, mettendo al centro risonanza, empatia e dignita dell'esperienza umana.
              </p>
              <Link href="/progetti/murena" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-glicine-700 hover:text-glicine-950 transition-colors group">
                Scopri il metodo <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-20 bg-glicine-50/30 border-y border-glicine-100/50">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-glicine-600 font-bold uppercase tracking-[0.25em] text-xs font-outfit block">
              Il percorso
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-glicine-900 leading-tight">
              Dal chiaroscuro alla visione integrata dell'essere umano
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {milestones.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="bg-white border border-glicine-100 rounded-[2rem] p-7 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-glicine-100 text-glicine-700 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-outfit text-2xl font-extrabold text-glicine-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <div className="rounded-[2rem] border border-glicine-100 bg-glicine-50/50 p-8 sm:p-10">
            <p className="font-outfit text-2xl sm:text-3xl font-light italic leading-relaxed text-glicine-950">
              "Mi si spalancavano le porte dello conoscibile umano, inteso non piu come territorio frammentato, ma come campo unitario e coerente."
            </p>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed font-light">
            <p>
              Negli ultimi anni questo interesse si e ulteriormente approfondito grazie alla lunga esperienza maturata sul campo come docente nella formazione psicopedagogica e relazionale rivolta alle figure professionali che operano nell'ambito delle diverse abilita.
            </p>
            <p>
              L'impegno in progetti dedicati al miglioramento della relazione e della comunicazione mi ha permesso di affinare uno sguardo sempre piu attento alla persona, oltre la diagnosi e oltre i modelli standardizzati.
            </p>
            <p>
              In questa fase della mia vita, il mio cammino di studio e di ricerca si concentra su due traiettorie fondamentali: la pedagogia transgenerazionale, come chiave di lettura delle eredita invisibili che attraversano le storie familiari, e l'accompagnamento consapevole alla relazione, intesa come spazio sacro di trasformazione, cura e possibilita.
            </p>
          </div>

          <div className="border-l-4 border-glicine-400 pl-6 py-2">
            <p className="font-outfit text-xl sm:text-2xl font-light italic text-glicine-900 leading-relaxed">
              "Forse e cosi che la vita chiede di essere attraversata: come un viaggio in esplorazione, dove il chiaroscuro non e un limite, ma il luogo stesso in cui si impara a vedere."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
