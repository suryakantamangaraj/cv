import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { MapPin, Clock, Star, Briefcase, GitFork, TrendingUp, Globe, Cpu, Radio, Zap, Search, Lightbulb, Code, TestTube, Rocket, Sparkles, Quote, MessageCircle, Award, FileText, FolderGit2, PenTool } from "lucide-react";
import { TextReveal } from "./TextReveal";
import { ConnectModal } from "./ConnectModal";
import { useRotatingAvailability } from "../hooks/useRotatingAvailability";

import type { Easing } from "framer-motion";

const oneLiners = [
  "Curiosity over comfort.",
  "Build in public.",
  "Stay close to hardware.",
  "Documentation is love.",
  "Empower the community.",
];

const achievements = [
  { icon: Briefcase, value: "8+", label: "Years of Experience", description: "RF Design across Telecom, Aerospace & Satellite", color: "text-primary", gradient: "from-primary/20 to-primary/5" },
  { icon: Award, value: "10+", label: "Awards & Honors", description: "Honeywell, Cadence & more", color: "text-highlight", gradient: "from-highlight/20 to-highlight/5" },
  { icon: FileText, value: "5+", label: "Publications & IPs", description: "Technical publications & proprietary assets", color: "text-chart-2", gradient: "from-chart-2/20 to-chart-2/5" },
  { icon: FolderGit2, value: "20+", label: "Projects & Open Source", description: "Industry projects and open‑source engagement", color: "text-chart-5", gradient: "from-chart-5/20 to-chart-5/5" },
];

const whatIDo = [
  { icon: Radio, title: "RF & Comm Systems", description: "EDA, Telecom, Avionics, Satellite, Automation" },
  { icon: Code, title: "AI, ML & Web Dev", description: "AI solutions, Full-stack, ML pipelines" },
  { icon: PenTool, title: "Authorship & Media", description: "Technical writing, Blogs, Publications" },
];

const processSteps = [
  { num: "01", title: "Discovery", description: "Understanding vision, goals & requirements through consultation.", duration: "1–2 days", items: ["Stakeholder interviews", "Market & domain research", "Feasibility analysis"], icon: Search },
  { num: "02", title: "Planning", description: "Defining roadmap, milestones & resource allocation.", duration: "2–3 days", items: ["Scope & timeline", "Technology/tool selection", "System architecture"], icon: Lightbulb },
  { num: "03", title: "Execution", description: "Iterative development and prototyping using Agile practices.", duration: "2–6 weeks (depending on scope)", items: ["Agile sprints", "Design & build cycles", "Integration workflows"], icon: Code },
  { num: "04", title: "Validation", description: "Testing and quality assurance across hardware & software.", duration: "3–5 days (depending on scope)", items: ["Functional testing", "Performance audits", "Cross‑platform/system checks"], icon: TestTube },
  { num: "05", title: "Launch", description: "Deployment or delivery with monitoring & ongoing support.", duration: "1–2 days", items: ["Production release", "Monitoring setup", "Post‑launch support"], icon: Rocket },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as Easing } }),
};

/* Typing one-liner — types in, holds, deletes, switches */
function TypingLine({ lines }: { lines: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const current = lines[idx];
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), 55);
      } else {
        timer = setTimeout(() => setPhase("holding"), 1600);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), 30);
      } else {
        setIdx((idx + 1) % lines.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, idx, lines]);

  return (
    <p className="text-base text-muted-foreground font-mono">
      <span className="text-gradient-primary font-semibold">{text}</span>
      <span className="inline-block w-[2px] h-4 bg-primary ml-1 animate-pulse align-middle" />
    </p>
  );
}


export function HeroSection() {
  const [connectOpen, setConnectOpen] = useState(false);
  const status = useRotatingAvailability();

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="w-full px-4 sm:px-8 py-20">
        <div className="w-full grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <motion.button
              variants={fadeUp} custom={0}
              onClick={() => setConnectOpen(true)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-all hover:scale-[1.02] ${status.available
                ? "border-primary/30 bg-primary/5 text-primary"
                : "border-destructive/30 bg-destructive/5 text-destructive"
                }`}
            >
              <span className={`h-2 w-2 rounded-full animate-pulse ${status.available ? "bg-primary" : "bg-destructive"}`} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={status.key}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.25 }}
                >
                  {status.available ? "Available" : "Not Available"} for {status.label}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <motion.div variants={fadeUp} custom={1} className="flex items-center gap-5">
              <img src="https://avatars.githubusercontent.com/u/60009788?v=4" alt="Surya Mangaraj" className="h-20 w-20 rounded-full ring-4 ring-primary/20" />
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-heading tracking-tight">
                  <TextReveal text="Surya Mangaraj" delay={0.3} gradientWords={[1]} />
                </h1>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /><span>India</span><span>•</span>
              <Clock className="h-4 w-4" /><span>IST (UTC+5:30)</span>
            </motion.div>

            <motion.p variants={fadeUp} custom={3} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              RF System Design, EDA & Test Automation <br />
              Communication Systems Engineering <br />
              AI/ML for Wireless Communication <br />
              Open‑Source Contributor
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="h-7">
              <TypingLine lines={oneLiners} />
            </motion.div>

            <motion.div variants={fadeUp} custom={6} className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setConnectOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-highlight px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
              >
                <Sparkles className="h-4 w-4" /> Let's Connect
              </button>
              <Link to="/experience" className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary">
                View Work →
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground font-heading">
                <TrendingUp className="h-5 w-5 text-primary" /> Key Achievements
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((a) => (
                  <div key={a.label} className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${a.gradient} p-4 group hover:scale-[1.02] transition-transform`}>
                    <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                      <a.icon className="h-10 w-10" />
                    </div>
                    <a.icon className={`h-5 w-5 ${a.color} mb-2`} />
                    <p className="text-2xl font-bold text-foreground font-heading leading-none">{a.value}</p>
                    <p className="text-xs font-semibold text-foreground mt-1">{a.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground font-heading">What I Do</h3>
              <div className="space-y-2">
                {whatIDo.map((item) => (
                  <div key={item.title} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ConnectModal open={connectOpen} onClose={() => setConnectOpen(false)} />
    </section>
  );
}

/* =================== HOW I WORK — vertical zig-zag flow =================== */
export function ProcessSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-highlight/5 blur-3xl" />
      </div>

      <div className="w-full px-4 sm:px-8 max-w-6xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary mb-4">
            <Sparkles className="h-3 w-3" /> Interactive process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-heading">
            How I <span className="text-gradient-primary">Work</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            A serpentine flow — hover or tap each node to see the work behind every step.
          </p>
        </motion.div>

        {/* Vertical spine connecting all 5 cards via horizontal branches */}
        <div className="relative">
          {/* Center vertical dashed line - desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px overflow-visible pointer-events-none">
            <div
              className="absolute inset-0 w-px"
              style={{
                backgroundImage: "linear-gradient(to bottom, var(--primary), var(--highlight))",
                maskImage: "repeating-linear-gradient(to bottom, black 0 6px, transparent 6px 12px)",
                WebkitMaskImage: "repeating-linear-gradient(to bottom, black 0 6px, transparent 6px 12px)",
                opacity: 0.5,
              }}
            />
            {/* travelling pulse */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-highlight shadow-[0_0_12px_var(--highlight)]"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative space-y-12 md:space-y-20">
            {processSteps.map((step, i) => {
              const active = activeIdx === i;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}
                >
                  <div
                    onMouseEnter={() => setActiveIdx(i)}
                    onMouseLeave={() => setActiveIdx(null)}
                    onClick={() => setActiveIdx(active ? null : i)}
                    className={`group cursor-pointer relative w-full md:w-[42%] rounded-2xl border bg-card/80 backdrop-blur p-6 transition-all ${active ? "border-primary/60 shadow-[0_0_40px_-10px_var(--primary)] -translate-y-1" : "border-border hover:border-primary/30"
                      }`}
                  >
                    {/* Horizontal branch connecting card edge to center spine */}
                    <div
                      className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px ${isLeft ? "left-full" : "right-full"}`}
                      style={{
                        width: "calc((100vw - 100%) / 2 - ((100vw - min(72rem, 100vw)) / 2) - 2rem)",
                        maxWidth: "20vw",
                        backgroundImage: "linear-gradient(to right, var(--primary), var(--highlight))",
                        maskImage: "repeating-linear-gradient(to right, black 0 4px, transparent 4px 8px)",
                        WebkitMaskImage: "repeating-linear-gradient(to right, black 0 4px, transparent 4px 8px)",
                        opacity: 0.6,
                      }}
                    />
                    {/* Connector dot at card edge */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-gradient-to-br from-primary to-highlight ring-4 ring-background z-10 ${isLeft ? "-right-1.5" : "-left-1.5"}`}>
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all ${active ? "bg-gradient-to-br from-primary to-highlight" : "bg-primary/15"}`}>
                        <step.icon className={`h-6 w-6 transition-colors ${active ? "text-primary-foreground" : "text-primary"}`} />
                        <span className="absolute -top-2 -right-2 text-[10px] font-mono text-muted-foreground bg-background border border-border rounded-full px-1.5 py-0.5">
                          {step.num}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground font-heading">{step.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 font-mono">{step.duration}</p>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{step.description}</p>

                        <AnimatePresence>
                          {active && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 overflow-hidden space-y-1"
                            >
                              {step.items.map((it) => (
                                <li key={it} className="text-xs text-foreground flex items-center gap-1.5">
                                  <span className="h-1 w-1 rounded-full bg-highlight" /> {it}
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== WORDS THAT MATTER — testimonials =================== */
interface Testimonial {
  id: string; name: string; role: string; avatar: string; quote: string;
}

const testimonials: Testimonial[] = [
  { id: "t1", name: "Aarav Sharma", role: "Sr. RF Engineer, Telecom Co.", avatar: "https://i.pravatar.cc/120?img=12", quote: "Surya's grasp of RF systems is unmatched. He spotted issues in our calibration pipeline that saved us months of debugging." },
  { id: "t2", name: "Priya Reddy", role: "Engineering Manager, Cadence", avatar: "https://i.pravatar.cc/120?img=47", quote: "A rare combination — deep technical chops and a builder's heart. Surya makes the team better just by being in the room." },
  { id: "t3", name: "Liang Wei", role: "Open-Source Maintainer", avatar: "https://i.pravatar.cc/120?img=33", quote: "His awesome-riscv repo is the first link I send to anyone serious about the ecosystem. Quality reflects the person." },
  { id: "t4", name: "Maya Nair", role: "Founder, IoT Startup", avatar: "https://i.pravatar.cc/120?img=49", quote: "We hired Surya as a consultant. Three weeks in, he'd shipped what we'd been planning for a quarter. Wild execution speed." },
  { id: "t5", name: "Rahul Verma", role: "Tech Lead, Avionics R&D", avatar: "https://i.pravatar.cc/120?img=15", quote: "Reliability-grade thinking with consumer-grade speed. That's the cheat code Surya brought to our project." },
  { id: "t6", name: "Sneha Iyer", role: "PhD Researcher, IIT", avatar: "https://i.pravatar.cc/120?img=44", quote: "Co-authored a paper with him. Crisp, rigorous, and never afraid to challenge an assumption. Best collaborator I've had." },
  { id: "t7", name: "Daniel Park", role: "Hackathon Mentor", avatar: "https://i.pravatar.cc/120?img=58", quote: "Surya's mentorship turned our prototype into a finalist project. Patient, sharp, generous with time." },
  { id: "t8", name: "Anika Bose", role: "Community Lead", avatar: "https://i.pravatar.cc/120?img=23", quote: "Every talk Surya gives leaves the audience with a clearer mental model. That's a superpower." },
];

export function TestimonialsSection() {
  const [active, setActive] = useState<Testimonial>(testimonials[0]);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate for infinite loop illusion
  const looped = useMemo(() => [...testimonials, ...testimonials], []);

  return (
    <section className="section-padding relative overflow-hidden bg-surface">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/3 h-72 w-72 rounded-full bg-highlight/5 blur-3xl" />
        <div className="absolute bottom-10 right-1/3 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="w-full relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 px-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-highlight/30 bg-highlight/5 px-3 py-1 text-xs text-highlight mb-4">
            <Quote className="h-3 w-3" /> Voices from the network
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-heading">
            Words That <span className="text-gradient-primary">Matter</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Tap a face to hear what they have to say.
          </p>
        </motion.div>

        {/* Avatar string — true seamless infinite loop, no gaps */}
        <div className="relative h-44 overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex items-center absolute top-1/2 -translate-y-1/2"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {looped.map((t, i) => {
              const isActive = active.id === t.id;
              return (
                <button
                  key={`${t.id}-${i}`}
                  onClick={() => setActive(t)}
                  className="shrink-0 group relative mr-6"
                  aria-label={`Show testimonial from ${t.name}`}
                >
                  <div
                    className={`relative h-20 w-20 rounded-full overflow-hidden ring-2 transition-all ${isActive ? "ring-highlight scale-110 shadow-[0_0_30px_-5px_var(--highlight)]" : "ring-border group-hover:ring-primary"}`}
                  >
                    <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                  </div>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-highlight animate-pulse" />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Bubble testimonial card */}
        <div className="px-4 sm:px-8 max-w-3xl mx-auto mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl border border-border bg-card p-8 shadow-2xl"
            >
              {/* Bubble tail */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rotate-45 border-l border-t border-border bg-card" />
              <MessageCircle className="h-5 w-5 text-highlight mb-3" />
              <p className="text-base sm:text-lg text-foreground italic leading-relaxed">"{active.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <img src={active.avatar} alt={active.name} className="h-10 w-10 rounded-full ring-2 ring-primary/40" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{active.name}</p>
                  <p className="text-xs text-muted-foreground">{active.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
