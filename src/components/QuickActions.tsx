import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, User, Briefcase, Award, X, Download, Sparkles } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { ConnectModal } from "./ConnectModal";
import { ResumeModal } from "./ResumeModal";

const actions = [
  { label: "Home", icon: Home, to: "/" },
  { label: "About", icon: User, to: "/about" },
  { label: "Experience", icon: Briefcase, to: "/experience" },
  { label: "Skills", icon: Award, to: "/skills" },
  { label: "Let's Connect", icon: Sparkles, to: "__connect__" },
  { label: "Download Resume", icon: Download, to: "__resume__" },
];

export function QuickActions() {
  const [open, setOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = useCallback((to: string) => {
    setOpen(false);
    setSearch("");
    if (to === "__resume__") setResumeOpen(true);
    else if (to === "__connect__") setConnectOpen(true);
    else navigate({ to: to as any });
  }, [navigate]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-card border border-border px-4 py-3 text-sm text-muted-foreground shadow-lg hover:border-primary/50 hover:text-foreground transition-all"
        aria-label="Quick actions"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Quick actions</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 z-[101] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-2 shadow-2xl"
            >
              <div className="flex items-center gap-3 px-3 py-2 border-b border-border">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search actions..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
              </div>
              <div className="mt-2 max-h-64 overflow-y-auto">
                {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">No results found</p>}
                {filtered.map((action) => (
                  <button key={action.label} onClick={() => handleSelect(action.to)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors">
                    <action.icon className="h-4 w-4 text-muted-foreground" />
                    {action.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConnectModal open={connectOpen} onClose={() => setConnectOpen(false)} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
