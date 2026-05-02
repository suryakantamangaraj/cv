import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export function DetailModal({ open, onClose, children, maxWidth = "max-w-3xl" }: DetailModalProps) {
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
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ type: "spring", damping: 24, stiffness: 240 }}
            className={`fixed left-1/2 top-1/2 z-[201] w-[calc(100%-2rem)] ${maxWidth} -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col`}
            style={{ maxHeight: "85vh" }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-background/60 p-2 text-foreground hover:bg-background transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
