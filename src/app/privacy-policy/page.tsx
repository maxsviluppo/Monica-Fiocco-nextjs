import type { Metadata } from "next";
import Link from "next/link";
import {
  CONTACT_EMAIL,
  CONTACT_LOCATION,
  CONTACT_NAME,
  CONTACT_PHONE_DISPLAY,
} from "@/data/contact";

export const metadata: Metadata = {
  title: "Privacy Policy | Monica Fiocco",
  description:
    "Informativa sul trattamento dei dati personali e sull'utilizzo dei cookie, ai sensi del Regolamento UE 2016/679 (GDPR).",
};

const sections = [
  {
    title: "1. Titolare del trattamento",
    content: (
      <>
        <p>
          Il Titolare del trattamento dei dati personali è <strong>{CONTACT_NAME}</strong>, con sede
          operativa a <strong>{CONTACT_LOCATION}</strong>, contattabile ai seguenti recapiti:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            E-mail:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-glicine-700 hover:text-glicine-900 underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>
          </li>
          <li>Telefono / WhatsApp: {CONTACT_PHONE_DISPLAY}</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. Tipologie di dati trattati",
    content: (
      <>
        <p>Attraverso questo sito web possono essere trattate le seguenti categorie di dati:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Dati di contatto</strong> (nome, cognome, indirizzo e-mail, numero di telefono)
            forniti volontariamente tramite i moduli di contatto presenti sul sito o via e-mail/WhatsApp.
          </li>
          <li>
            <strong>Dati di navigazione</strong> (indirizzo IP, tipo di browser, sistema operativo,
            pagine visitate, data e ora della visita) raccolti in forma aggregata o anonima per finalità
            tecniche e, ove autorizzato, statistiche.
          </li>
          <li>
            <strong>Preferenze sui cookie</strong>, memorizzate localmente sul dispositivo dell&apos;utente
            per registrare le scelte espresse tramite il banner cookie.
          </li>
        </ul>
        <p className="mt-4">
          Il Titolare non raccoglie intenzionalmente dati particolari (ex art. 9 GDPR) tramite i moduli
          del sito. Si invita l&apos;utente a non inserire informazioni di natura sanitaria o altamente
          sensibile nei campi liberi, salvo che ciò non sia strettamente necessario al rapporto professionale
          e avvenga con modalità sicure concordate.
        </p>
      </>
    ),
  },
  {
    title: "3. Finalità e base giuridica del trattamento",
    content: (
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>Rispondere a richieste di informazioni</strong> inviate tramite moduli, e-mail o
          messaggistica istantanea — base giuridica: esecuzione di misure precontrattuali su richiesta
          dell&apos;interessato (art. 6, par. 1, lett. b GDPR) e/o consenso (art. 6, par. 1, lett. a GDPR).
        </li>
        <li>
          <strong>Gestire appuntamenti e rapporti professionali</strong> — base giuridica: esecuzione di
          un contratto o misure precontrattuali (art. 6, par. 1, lett. b GDPR).
        </li>
        <li>
          <strong>Garantire il funzionamento tecnico e la sicurezza del sito</strong> — base giuridica:
          legittimo interesse del Titolare (art. 6, par. 1, lett. f GDPR).
        </li>
        <li>
          <strong>Analisi statistiche anonime o aggregate</strong>, ove attivate — base giuridica: consenso
          dell&apos;utente (art. 6, par. 1, lett. a GDPR), espresso tramite il banner cookie.
        </li>
        <li>
          <strong>Adempiere a obblighi di legge</strong> — base giuridica: obbligo legale (art. 6, par. 1,
          lett. c GDPR).
        </li>
      </ul>
    ),
  },
  {
    title: "4. Modalità di trattamento e tempi di conservazione",
    content: (
      <>
        <p>
          I dati personali sono trattati con strumenti informatici e telematici, nel rispetto dei principi
          di liceità, correttezza, trasparenza, minimizzazione e sicurezza previsti dal GDPR.
        </p>
        <p className="mt-4">I dati sono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <strong>Richieste di informazioni:</strong> fino a 24 mesi dall&apos;ultimo contatto, salvo
            instaurazione di un rapporto professionale.
          </li>
          <li>
            <strong>Rapporti professionali:</strong> per la durata del rapporto e, successivamente, per
            il periodo previsto dalla normativa civilistica e fiscale applicabile.
          </li>
          <li>
            <strong>Dati di navigazione tecnici:</strong> per il tempo necessario all&apos;erogazione del
            servizio, generalmente non superiore a 12 mesi.
          </li>
          <li>
            <strong>Preferenze cookie:</strong> fino a 12 mesi, salvo revoca anticipata.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Comunicazione e destinatari dei dati",
    content: (
      <>
        <p>
          I dati personali non sono diffusi. Possono essere comunicati, solo se necessario, a soggetti
          che forniscono servizi strumentali al Titolare, quali:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>fornitori di hosting e infrastruttura web;</li>
          <li>fornitori di servizi di posta elettronica e messaggistica;</li>
          <li>consulenti professionali (legali, fiscali, informatici), ove strettamente necessario.</li>
        </ul>
        <p className="mt-4">
          Tali soggetti operano come Responsabili del trattamento ai sensi dell&apos;art. 28 GDPR, oppure
          come autonomi titolari, in base alla natura del servizio erogato.
        </p>
      </>
    ),
  },
  {
    title: "6. Trasferimento di dati verso Paesi extra-UE",
    content: (
      <p>
        Qualora alcuni fornitori tecnologici utilizzati per l&apos;erogazione del sito o dei servizi di
        comunicazione trattino dati al di fuori dello Spazio Economico Europeo, il trasferimento avverrà
        solo in presenza di adeguate garanzie previste dal GDPR (ad esempio decisioni di adeguatezza della
        Commissione Europea o Clausole Contrattuali Standard).
      </p>
    ),
  },
  {
    title: "7. Diritti dell'interessato",
    content: (
      <>
        <p>
          In qualità di interessato, hai il diritto di rivolgerti al Titolare per esercitare i diritti
          previsti dagli artt. 15-22 GDPR, tra cui:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>ottenere conferma dell&apos;esistenza dei tuoi dati e accedervi;</li>
          <li>richiedere la rettifica o l&apos;aggiornamento dei dati inesatti;</li>
          <li>richiedere la cancellazione dei dati, nei casi previsti dalla legge;</li>
          <li>richiedere la limitazione del trattamento;</li>
          <li>opporsi al trattamento basato su legittimo interesse;</li>
          <li>ricevere i dati in formato strutturato (portabilità), ove applicabile;</li>
          <li>revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente.</li>
        </ul>
        <p className="mt-4">
          Per esercitare i tuoi diritti puoi scrivere a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-glicine-700 hover:text-glicine-900 underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>
          . Hai inoltre il diritto di proporre reclamo all&apos;
          <a
            href="https://www.garanteprivacy.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-glicine-700 hover:text-glicine-900 underline underline-offset-2"
          >
            Autorità Garante per la protezione dei dati personali
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "8. Cookie e tecnologie simili",
    content: (
      <>
        <p>Il sito utilizza cookie e tecnologie analoghe per le seguenti finalità:</p>
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-glicine-100 bg-glicine-50/50 p-5">
            <h3 className="font-outfit font-bold text-glicine-900 mb-2">Cookie tecnici (necessari)</h3>
            <p className="text-sm leading-relaxed">
              Indispensabili al corretto funzionamento del sito e alla memorizzazione delle preferenze
              espresse tramite il banner cookie. Non richiedono consenso e non possono essere disattivati
              tramite il banner, in quanto essenziali per la navigazione.
            </p>
          </div>
          <div className="rounded-2xl border border-glicine-100 bg-glicine-50/50 p-5">
            <h3 className="font-outfit font-bold text-glicine-900 mb-2">Cookie analitici (facoltativi)</h3>
            <p className="text-sm leading-relaxed">
              Eventualmente utilizzati per raccogliere informazioni statistiche aggregate sull&apos;uso
              del sito. Sono installati solo previo consenso espresso selezionando &quot;Accetta tutti&quot;
              nel banner cookie. Selezionando &quot;Solo necessari&quot;, tali cookie non vengono attivati.
            </p>
          </div>
        </div>
        <p className="mt-4">
          Puoi modificare le tue preferenze in qualsiasi momento tramite il link &quot;Gestione cookie&quot;
          presente nel footer del sito, oppure configurando le impostazioni del tuo browser per bloccare o
          eliminare i cookie già installati.
        </p>
      </>
    ),
  },
  {
    title: "9. Natura del conferimento dei dati",
    content: (
      <p>
        Il conferimento dei dati di contatto è facoltativo ma necessario per ricevere riscontro alle
        richieste inviate tramite i moduli del sito o per instaurare un rapporto professionale. Il mancato
        conferimento può comportare l&apos;impossibilità di evadere la richiesta.
      </p>
    ),
  },
  {
    title: "10. Processo decisionale automatizzato",
    content: (
      <p>
        I dati personali non sono oggetto di processi decisionali automatizzati, inclusa la profilazione,
        ai sensi dell&apos;art. 22 GDPR.
      </p>
    ),
  },
  {
    title: "11. Aggiornamenti della presente informativa",
    content: (
      <p>
        Il Titolare si riserva il diritto di modificare la presente informativa in qualsiasi momento,
        pubblicando la versione aggiornata su questa pagina. Si consiglia di consultarla periodicamente.
        Ultimo aggiornamento: giugno 2026.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-glicine-950 pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-glicine-100 text-xs font-bold uppercase tracking-widest">
            Informativa legale
          </span>
          <h1 className="font-outfit text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Privacy Policy
          </h1>
          <p className="text-glicine-100/90 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            Informativa sul trattamento dei dati personali ai sensi del Regolamento (UE) 2016/679
            (&quot;GDPR&quot;) e del D.Lgs. 196/2003, come modificato dal D.Lgs. 101/2018.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section) => (
            <article key={section.title} className="space-y-4">
              <h2 className="font-outfit text-2xl font-extrabold text-glicine-900">{section.title}</h2>
              <div className="text-slate-600 leading-relaxed font-light space-y-4">{section.content}</div>
            </article>
          ))}

          <div className="pt-8 border-t border-glicine-100">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-glicine-700 hover:text-glicine-950 transition-colors"
            >
              ← Torna alla home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
