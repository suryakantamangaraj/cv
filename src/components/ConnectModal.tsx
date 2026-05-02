import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, GitBranch, Briefcase, Sparkles, Mail, Calendar, ArrowUpRight, Clock, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import { AVAILABILITY, type AvailabilityKey } from "../lib/availability";

interface ConnectModalProps {
  open: boolean;
  onClose: () => void;
}

const opportunities: { key: AvailabilityKey; icon: typeof Rocket; title: string; description: string; color: string; bg: string }[] = [
  { key: "projects",   icon: Rocket,    title: "New Projects",    description: "RF/Embedded, Web platforms & full-stack builds", color: "text-primary",   bg: "bg-primary/10" },
  { key: "openSource", icon: GitBranch, title: "Open Source",     description: "Collaborate on RISC-V, IoT or developer tooling", color: "text-chart-2",   bg: "bg-chart-2/10" },
  { key: "startup",    icon: Sparkles,  title: "Startup Partner", description: "Co-found, advise or technical leadership",        color: "text-highlight", bg: "bg-highlight/10" },
  { key: "expert",     icon: Briefcase, title: "Hire as Expert",  description: "Consulting, audits, technical reviews",          color: "text-chart-5",   bg: "bg-chart-5/10" },
];

export function ConnectModal({ open, onClose }: ConnectModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const statusFor = (k: AvailabilityKey) => AVAILABILITY.find((a) => a.key === k)!;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", damping: 24, stiffness: 240 }}
            className="fixed left-1/2 top-1/2 z-[201] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card shadow-2xl"
          >
            <div className="relative overflow-hidden rounded-t-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-highlight/10 to-chart-3/20" />
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-highlight/20 blur-3xl" />

              <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-background/40 backdrop-blur p-2 text-foreground hover:bg-background/60 transition" aria-label="Close">
                <X className="h-4 w-4" />
              </button>

              <div className="relative p-8 sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Live availability below
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground leading-tight">
                  I'm ready to <span className="text-gradient-primary">explore</span> what's next.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-lg">
                  Each opportunity below has its own real-time status — green means I'm actively taking it on, red means my plate's full for now.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-chart-2/10 border border-chart-2/20 px-3 py-1.5 text-xs text-chart-2">
                  <Clock className="h-3 w-3" />
                  Typical response time: <span className="font-semibold">24–48 hrs</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-3">
                {opportunities.map((opp, i) => {
                  const status = statusFor(opp.key);
                  return (
                    <motion.div
                      key={opp.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="group rounded-2xl border border-border bg-secondary/30 p-4 hover:border-primary/40 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${opp.bg}`}>
                          <opp.icon className={`h-5 w-5 ${opp.color}`} />
                        </div>
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-1 rounded-full ${
                          status.available ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${status.available ? "bg-primary" : "bg-destructive"}`} />
                          {status.available ? "Available" : "Not Available"}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground font-heading">{opp.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{opp.description}</p>
                      <p className="text-[10px] text-muted-foreground/80 mt-2 italic">{status.note}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href="mailto:contact@suryaraj.com?subject=Let's%20connect" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition glow-primary">
                  <Mail className="h-4 w-4" /> Send me an email <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="https://calendly.com/suryakantamangaraj" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/40 px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition">
                  <Calendar className="h-4 w-4" /> Book a 30-min call
                </a>
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-xl bg-highlight/5 border border-highlight/20 p-3">
                <MessageSquare className="h-4 w-4 text-highlight shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <span className="text-highlight font-medium">Pro tip:</span> Before booking a call, drop me an email with a brief about your idea — it helps me prepare and makes our conversation 10× more productive.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
