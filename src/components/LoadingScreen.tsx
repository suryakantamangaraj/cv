import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative h-28 w-28">
              {/* Rotating gradient ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, var(--primary), var(--highlight), var(--primary))",
                  WebkitMask: "radial-gradient(circle, transparent 56%, black 58%)",
                  mask: "radial-gradient(circle, transparent 56%, black 58%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
              {/* Pulse glow */}
              <motion.div
                className="absolute inset-1 rounded-full bg-primary/20 blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              <motion.img
                src="https://avatars.githubusercontent.com/u/60009788?v=4"
                alt="Surya Mangaraj"
                className="absolute inset-2 h-24 w-24 rounded-full ring-2 ring-background object-cover"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </div>
            <div className="text-center">
              <motion.h1
                className="text-2xl font-bold font-heading text-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Surya Mangaraj
              </motion.h1>
              <motion.p
                className="text-sm text-muted-foreground mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                RF System Engineer
              </motion.p>
            </div>
            <div className="w-48 h-1 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <motion.span
              className="text-xs font-mono text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
