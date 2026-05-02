import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Clock, AlertTriangle, FileText } from "lucide-react";
import { useEffect } from "react";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

// Update these two whenever you refresh the resume
const RESUME_URL = "https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I0J/view?usp=sharing";
const RESUME_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1A2B3C4D5E6F7G8H9I0J";
const LAST_UPDATED = "2025-09-20"; // YYYY-MM-DD

function isStale(dateStr: string) {
  const last = new Date(dateStr).getTime();
  if (Number.isNaN(last)) return true;
  const months = (Date.now() - last) / (1000 * 60 * 60 * 24 * 30);
  return months > 6;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
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

  const stale = isStale(LAST_UPDATED);
  const validLink = RESUME_URL.startsWith("http") && !RESUME_URL.includes("placeholder");

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
            className="fixed left-1/2 top-1/2 z-[201] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-card shadow-2xl overflow-hidden"
          >
            <div className="relative p-6 bg-gradient-to-br from-primary/15 via-transparent to-highlight/15">
              <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-background/40 p-2 text-foreground hover:bg-background/60" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 mb-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold font-heading text-foreground">A quick heads-up before you grab my resume</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                This resume is hand-crafted by me — not auto-generated. It captures my journey best, but life moves fast and so does my work.
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-3">
                <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="text-foreground font-medium">Last updated</p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {new Date(LAST_UPDATED).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </div>

              {stale && (
                <div className="flex items-start gap-3 rounded-xl border border-highlight/40 bg-highlight/10 p-3">
                  <AlertTriangle className="h-4 w-4 text-highlight mt-0.5 shrink-0" />
                  <p className="text-xs text-foreground leading-relaxed">
                    Heads up — this version is older than 6 months and may not reflect my latest projects. Ping me on the <span className="text-highlight font-medium">Let's Connect</span> button for the freshest details.
                  </p>
                </div>
              )}

              {!validLink ? (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-foreground">
                  Resume link isn't configured yet. Please reach out via Let's Connect.
                </div>
              ) : (
                <a
                  href={RESUME_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-highlight px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition glow-primary"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
