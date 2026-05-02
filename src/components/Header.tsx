import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Download, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectModal } from "./ConnectModal";
import { ResumeModal } from "./ResumeModal";

const navLinks = [
  { to: "/" as const, label: "Home" },
  { to: "/about" as const, label: "About" },
  { to: "/experience" as const, label: "Experience" },
  { to: "/skills" as const, label: "Skills" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="w-full flex h-16 items-center justify-between px-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://avatars.githubusercontent.com/u/60009788?v=4"
              alt="Surya Mangaraj"
              className="h-8 w-8 rounded-full ring-2 ring-primary/30"
            />
            <div className="leading-tight">
              <span className="text-sm font-semibold text-foreground font-heading">Surya Mangaraj</span>
              <span className="hidden sm:block text-xs text-muted-foreground">RF System Engineer</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "px-3 py-2 text-sm font-medium text-primary border-b-2 border-primary" }}
                activeOptions={{ exact: true }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setResumeOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-secondary"
            >
              <Download className="h-4 w-4" />
              Resume
            </button>
            <button
              onClick={() => setConnectOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-highlight px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
            >
              <Sparkles className="h-4 w-4" />
              Let's Connect
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
                    activeProps={{ className: "px-3 py-3 text-sm font-medium text-primary bg-primary/10 rounded-lg" }}
                    activeOptions={{ exact: true }}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => { setMobileOpen(false); setResumeOpen(true); }}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </button>
                <button
                  onClick={() => { setMobileOpen(false); setConnectOpen(true); }}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-highlight px-4 py-3 text-sm font-semibold text-primary-foreground"
                >
                  <Sparkles className="h-4 w-4" />
                  Let's Connect
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <ConnectModal open={connectOpen} onClose={() => setConnectOpen(false)} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
