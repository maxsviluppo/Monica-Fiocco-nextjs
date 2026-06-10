"use client";

import React, { useEffect, useState } from "react";
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MessageSquare,
  CheckCircle,
  Clock,
  Trash2,
  Search,
  Filter,
  Check,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  course: string;
  date: string;
  status: string;
}

const defaultSeededLeads: Lead[] = [];

export default function AdminContattiPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tutti");
  const [expandedLead, setExpandedLead] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("monica_contact_leads");
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        localStorage.setItem("monica_contact_leads", JSON.stringify(defaultSeededLeads));
        setLeads(defaultSeededLeads);
      }
    } catch (e) {
      console.error("Errore nel caricamento dei lead:", e);
      setLeads(defaultSeededLeads);
    }
  }, []);

  // Update localStorage when leads change
  const saveLeads = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    try {
      localStorage.setItem("monica_contact_leads", JSON.stringify(updatedLeads));
    } catch (e) {
      console.error("Errore nel salvataggio dei lead:", e);
    }
  };

  const toggleLeadStatus = (id: number) => {
    const updated = leads.map(lead => {
      if (lead.id === id) {
        const nextStatus = lead.status === "Nuovo" ? "Contattato" : lead.status === "Contattato" ? "Archiviato" : "Nuovo";
        showToast(`Stato aggiornato a "${nextStatus}"`, "info");
        return { ...lead, status: nextStatus };
      }
      return lead;
    });
    saveLeads(updated);
  };

  const executeDeleteLead = (id: number) => {
    const updated = leads.filter(lead => lead.id !== id);
    saveLeads(updated);
    if (expandedLead === id) setExpandedLead(null);
    showToast("Richiesta eliminata", "success");
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.message || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.course || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === "Tutti" || lead.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 relative">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-glicine-900 border border-glicine-800 shadow-2xl text-xs font-semibold text-white animate-fade-in">
          <div className={`p-1 rounded-full ${toast.type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"}`}>
            <Check className="h-4 w-4" />
          </div>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-glicine-900 border border-glicine-800 rounded-3xl p-6 max-w-sm w-full space-y-6 shadow-2xl">
            <div className="space-y-2 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-3">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="font-outfit font-extrabold text-xl text-white">Elimina Richiesta</h3>
              <p className="text-glicine-300 text-xs leading-relaxed">
                Sei sicuro di voler eliminare questa richiesta? L'azione è irreversibile.
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
                onClick={() => {
                  executeDeleteLead(showDeleteModal);
                  setShowDeleteModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-all"
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Title block */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-glicine-400 font-semibold text-xs uppercase tracking-widest font-outfit">Gestione Richieste</span>
          <h2 className="font-outfit text-3xl font-extrabold text-white">Contatti &amp; Iscrizioni</h2>
          <p className="text-glicine-300/80 text-sm">Leads reali inseriti dagli utenti tramite il modulo del sito web.</p>
        </div>
      </section>

      {/* Filter and Search controls */}
      <section className="grid sm:grid-cols-12 gap-4 bg-glicine-900/30 p-4 rounded-2xl border border-glicine-900">
        <div className="sm:col-span-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-glicine-400" />
          <input 
            type="text" 
            placeholder="Cerca per nome, email o messaggio..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white placeholder-glicine-500 focus:outline-none focus:border-glicine-400 text-sm transition-all"
          />
        </div>
        <div className="sm:col-span-4 relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-glicine-400" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glicine-800 bg-glicine-950/60 text-white focus:outline-none focus:border-glicine-400 text-sm transition-all appearance-none cursor-pointer"
          >
            <option value="Tutti">Stato: Tutti</option>
            <option value="Nuovo">Stato: Nuovi</option>
            <option value="Contattato">Stato: Contattati</option>
            <option value="Archiviato">Stato: Archiviati</option>
          </select>
        </div>
      </section>

      {/* Leads Table / List */}
      <section className="bg-glicine-900/40 border border-glicine-800/80 rounded-3xl overflow-hidden shadow-xl">
        {filteredLeads.length === 0 ? (
          <div className="p-16 text-center text-glicine-400 space-y-4">
            <MessageSquare className="h-12 w-12 mx-auto text-glicine-500" />
            <p className="text-sm">Nessuna richiesta corrisponde ai criteri di ricerca impostati.</p>
          </div>
        ) : (
          <div className="divide-y divide-glicine-900">
            {/* Header for desktop layout */}
            <div className="hidden lg:grid grid-cols-12 gap-4 p-6 bg-glicine-950/20 text-xs font-semibold text-glicine-300 uppercase tracking-wider">
              <div className="col-span-3">Nome / Mittente</div>
              <div className="col-span-3">Modulo Provenienza</div>
              <div className="col-span-3">Dati Contatto</div>
              <div className="col-span-2">Data &amp; Stato</div>
              <div className="col-span-1 text-right">Azioni</div>
            </div>

            {/* Leads entries list */}
            {filteredLeads.map((lead) => {
              const isExpanded = expandedLead === lead.id;
              return (
                <div key={lead.id} className="transition-colors hover:bg-glicine-900/20">
                  {/* Row content */}
                  <div 
                    onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-6 items-center cursor-pointer select-none"
                  >
                    {/* Name */}
                    <div className="col-span-3 flex items-center gap-3">
                      <div>
                        <h4 className="font-semibold text-white text-base font-outfit">{lead.name}</h4>
                        <span className="text-[10px] text-glicine-400 flex items-center gap-1">
                          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />} Clicca per leggere il messaggio
                        </span>
                      </div>
                    </div>

                    {/* Module info */}
                    <div className="col-span-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-glicine-200">
                        <BookOpen className="h-3.5 w-3.5 text-glicine-400" /> {lead.course}
                      </span>
                    </div>

                    {/* Contact Details */}
                    <div className="col-span-3 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-glicine-300">
                        <Mail className="h-3.5 w-3.5 text-glicine-500 flex-shrink-0" /> <span>{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-glicine-300">
                        <Phone className="h-3.5 w-3.5 text-glicine-500 flex-shrink-0" /> <span>{lead.phone}</span>
                      </div>
                    </div>

                    {/* Date and Status */}
                    <div className="col-span-2 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-center gap-2">
                      <span className="text-xs text-glicine-400">{lead.date}</span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.status === "Nuovo" 
                          ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                          : lead.status === "Contattato"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-glicine-800 text-glicine-400 border border-glicine-700"
                      }`}>
                        {lead.status === "Nuovo" ? <Clock className="h-2.5 w-2.5" /> : <CheckCircle className="h-2.5 w-2.5" />}
                        {lead.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleLeadStatus(lead.id)}
                        className="p-2 rounded-lg bg-glicine-800 hover:bg-glicine-700 text-glicine-200 hover:text-white border border-glicine-700 transition-all duration-300"
                        title="Cambia Stato"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(lead.id)}
                        className="p-2 rounded-lg bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 border border-red-900/30 hover:border-red-900/60 transition-all duration-300"
                        title="Elimina"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                  </div>

                  {/* Message Detail Expansion */}
                  {isExpanded && (
                    <div className="bg-glicine-950/40 border-t border-glicine-900 px-6 py-5 text-sm space-y-3">
                      <h5 className="font-semibold text-xs text-glicine-400 uppercase tracking-wider font-outfit">Contenuto del Messaggio:</h5>
                      <p className="text-glicine-200 leading-relaxed max-w-4xl italic whitespace-pre-line bg-glicine-950/20 p-4 rounded-xl border border-glicine-900">
                        "{lead.message}"
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        )}
      </section>

    </div>
  );
}
