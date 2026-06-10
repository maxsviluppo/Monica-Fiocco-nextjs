"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  Search, 
  ArrowLeft,
  Menu,
  X,
  BookOpen
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = sessionStorage.getItem("admin_logged_in") === "true";
      setIsAuthenticated(loggedIn);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "Fiocco" && password === "Fiocco2026!") {
      sessionStorage.setItem("admin_logged_in", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Credenziali non valide!");
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Contatti e Iscrizioni", href: "/admin/contatti", icon: Users },
    { name: "Gestione Articoli", href: "/admin/articoli", icon: BookOpen },
    { name: "SEO Pagine", href: "/admin/seo", icon: Search },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-glicine-950 flex items-center justify-center p-6 antialiased font-sans">
        <div className="w-full max-w-md bg-glicine-900/40 border border-glicine-800/80 p-8 rounded-3xl shadow-2xl backdrop-blur-md space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-2xl bg-glicine-500/10 border border-glicine-500/30 flex items-center justify-center text-glicine-300 mx-auto">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="font-outfit font-extrabold text-2xl text-white tracking-wide">Area Amministratore</h2>
            <p className="text-glicine-400 text-xs">Inserisci le credenziali per accedere alla console</p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans text-left">
            <div className="space-y-1.5">
              <label className="text-glicine-300 font-semibold uppercase tracking-wider block">Nome Utente</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                className="w-full px-4 py-3 rounded-xl bg-glicine-950 border border-glicine-800 text-white placeholder-glicine-700 focus:outline-none focus:border-glicine-400 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-glicine-300 font-semibold uppercase tracking-wider block">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-glicine-950 border border-glicine-800 text-white placeholder-glicine-700 focus:outline-none focus:border-glicine-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-glicine-600 hover:bg-glicine-550 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg border border-glicine-500/40 cursor-pointer mt-2"
            >
              Accedi
            </button>
          </form>

          <div className="text-center pt-2">
            <Link 
              href="/"
              className="text-xs text-glicine-400 hover:text-white underline transition-colors"
            >
              Torna al sito
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-glicine-950 text-glicine-100 flex flex-col md:flex-row antialiased font-sans pt-[130px]">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-glicine-900 bg-glicine-950 flex flex-col flex-shrink-0 z-40 transition-all duration-300">
        {/* Top brand heading */}
        <div className="p-6 h-20 border-b border-glicine-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-glicine-500/10 border border-glicine-500/30 flex items-center justify-center text-glicine-300">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-outfit font-extrabold text-sm text-white tracking-wide">Monica Fiocco</h2>
              <span className="text-[10px] text-glicine-400 font-medium">Console Amministratore</span>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-glicine-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav className={`p-4 space-y-1.5 flex-grow ${mobileMenuOpen ? "block" : "hidden md:block"}`}>
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  active 
                    ? "bg-glicine-800 text-white shadow-lg shadow-glicine-900/50 border border-glicine-700/50" 
                    : "text-glicine-300 hover:text-white hover:bg-glicine-900/60"
                }`}
              >
                <Icon className="h-4.5 w-4.5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Link */}
        <div className={`p-4 border-t border-glicine-900 ${mobileMenuOpen ? "block" : "hidden md:block"}`}>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-glicine-900 hover:bg-glicine-800 text-xs font-bold text-glicine-300 hover:text-white transition-all border border-glicine-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Torna al Sito
          </Link>
        </div>
      </aside>

      {/* Main panel content rendering */}
      <div className="flex-grow flex flex-col min-h-0 bg-glicine-950/40">
        <main className="flex-grow p-6 sm:p-10 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
