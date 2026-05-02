import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { MapPin, Building, BookOpen, ExternalLink, Trophy, Star, Award, Sparkles, Coffee, Code2, Radio, Target, Zap, Languages, Search, Heart } from "lucide-react";
import { useState, useMemo } from "react";
import { TextReveal } from "../components/TextReveal";
import { QuickActions } from "../components/QuickActions";
import { ScrollToTop } from "../components/ScrollToTop";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Surya Mangaraj" },
      { name: "description", content: "Learn about Surya Mangaraj's journey in RF Design, Communication Technologies, and open-source contributions." },
      { property: "og:title", content: "About — Surya Mangaraj" },
      { property: "og:description", content: "Learn about Surya Mangaraj's journey in RF Design, Communication Technologies, and open-source contributions." },
    ],
  }),
  component: AboutPage,
});

const articles = [
  { title: "What is Makefile and how to use it?", url: "https://surya-raj.medium.com/what-is-makefile-and-how-to-use-it-f02297f0ecdd" },
  { title: "How to use GUI applications in WSL/WSL2 Distros using VcXsrv", url: "https://surya-raj.medium.com/how-to-use-gui-applications-in-wsl-wsl2-distros-using-vcxsrv-5a10eef14073" },
  { title: "What could possibly go wrong with GPT-3", url: "https://surya-raj.medium.com/what-could-possibly-go-wrong-with-gpt-3-9fd575c97647" },
  { title: "Building a personal Digital Garden — lessons learned", url: "https://surya-raj.medium.com" },
  { title: "RISC-V from zero to your first taped-out core", url: "https://surya-raj.medium.com" },
];

const personalityCards = [
  { icon: Radio, title: "RF Engineer", description: "Passionate about wireless systems & signal magic", color: "text-primary", bg: "bg-primary/10" },
  { icon: Code2, title: "Open Sourcerer", description: "395+ stars across community projects", color: "text-highlight", bg: "bg-highlight/10" },
  { icon: Coffee, title: "Lifelong Learner", description: "Maintaining a Digital Garden of curiosity", color: "text-chart-3", bg: "bg-chart-3/10" },
  { icon: Heart, title: "Community Builder", description: "Mentoring & contributing to dev culture", color: "text-chart-5", bg: "bg-chart-5/10" },
];

type RewardCategory = "Open Source" | "Community" | "Speaking" | "Hackathon" | "Workplace";
interface Reward {
  icon: typeof Trophy; title: string; organization: string; year: string; description: string; color: string; category: RewardCategory; link?: string; linkLabel?: string;
}

const rewards: Reward[] = [
  { icon: Trophy,   title: "PSPICE Winner",                        organization: "Academic Competition",     year: "2017",           description: "Won the PSPICE circuit simulation competition.",        color: "text-highlight", category: "Hackathon",   link: "https://example.com/pspice-cert.pdf", linkLabel: "View Certificate" },
  { icon: Zap,      title: "Texas Instruments India WEBENCH Design Contest", organization: "Texas Instruments",  year: "2018",      description: "Recognized in TI's WEBENCH design challenge for innovative circuit design.", color: "text-primary", category: "Workplace", link: "https://example.com/ti-webench-cert.pdf", linkLabel: "View Certificate" },
  { icon: Award,    title: "ADAA 2017",                            organization: "Academic / Industry Award", year: "2017",          description: "Awarded for academic and design excellence.",           color: "text-chart-2",   category: "Workplace",   link: "https://example.com/adaa-cert.pdf", linkLabel: "View Certificate" },
  { icon: Star,     title: "CADENCE DESIGN CONTEST 2018",          organization: "Cadence Design Systems",   year: "2018",           description: "Recognized in Cadence's design contest for EDA innovation.", color: "text-chart-3", category: "Workplace",   link: "https://example.com/cadence-contest-cert.pdf", linkLabel: "View Certificate" },
  { icon: Trophy,   title: "awesome-riscv — 344+ Stars",           organization: "Open Source Community",    year: "2021 — Present", description: "Curated list became a top RISC-V community resource.",   color: "text-highlight", category: "Open Source", link: "https://github.com/suryakantamangaraj/awesome-riscv", linkLabel: "View Repo" },
  { icon: Star,     title: "GitHub Profile Templates — 51+ Stars", organization: "GitHub Community",         year: "2022",           description: "Featured collection helping developers build profiles.", color: "text-primary",   category: "Open Source", link: "https://github.com/suryakantamangaraj/AwesomeGithubProfileTemplates", linkLabel: "View Repo" },
  { icon: Sparkles, title: "Speaker — Tech Communities",           organization: "Various Meetups",          year: "2021 — Present", description: "Talks on RF design, embedded systems, and open source.", color: "text-chart-5",   category: "Speaking" },
];

const rewardFilters: { key: "all" | RewardCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Open Source", label: "Open Source" },
  { key: "Community", label: "Community" },
  { key: "Speaking", label: "Speaking" },
  { key: "Hackathon", label: "Hackathon" },
  { key: "Workplace", label: "Workplace" },
];

const languages = [
  { name: "English", level: "Fluent",     percent: 95, native: "English",   flag: "🇬🇧", color: "from-primary to-highlight" },
  { name: "Hindi",   level: "Fluent",     percent: 90, native: "हिन्दी",     flag: "🇮🇳", color: "from-highlight to-chart-5" },
  { name: "Odia",    level: "Native",     percent: 100, native: "ଓଡ଼ିଆ",     flag: "🇮🇳", color: "from-chart-2 to-primary" },
];



function AboutPage() {
  const [rewardFilter, setRewardFilter] = useState<typeof rewardFilters[number]["key"]>("all");
  const [rewardSearch, setRewardSearch] = useState("");

  const filteredRewards = useMemo(
    () => rewards.filter((r) => {
      const matchCat = rewardFilter === "all" || r.category === rewardFilter;
      const q = rewardSearch.toLowerCase();
      const matchSearch = !q || r.title.toLowerCase().includes(q) || r.organization.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    }),
    [rewardFilter, rewardSearch],
  );
  const rewardCounts = useMemo(() => {
    const m: Record<string, number> = { all: rewards.length };
    for (const r of rewards) m[r.category] = (m[r.category] || 0) + 1;
    return m;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-20 right-1/4 h-72 w-72 rounded-full bg-highlight/10 blur-3xl" />

          <div className="relative w-full px-4 sm:px-8">
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
              <div>
                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary mb-4">
                  <Sparkles className="h-3 w-3" /> The story so far
                </motion.span>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl sm:text-7xl font-bold font-heading leading-[1.05]">
                  <TextReveal text="Hi, I'm Surya." gradientWords={[2]} />
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                  An RF engineer by training, an open-source builder by passion, and a perpetual student of how things actually work — from radio waves to deep learning.
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-6">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> India</span>
                  <span className="flex items-center gap-1.5"><Building className="h-4 w-4" /> Cadence</span>
                  <span className="flex items-center gap-1.5"><Coffee className="h-4 w-4" /> Always learning</span>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 gap-4">
                {personalityCards.map((card, i) => (
                  <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className={`rounded-2xl border border-border bg-card p-5 card-hover ${i % 2 === 1 ? "translate-y-6" : ""}`}>
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${card.bg} mb-3`}>
                      <card.icon className={`h-5 w-5 ${card.color}`} />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground font-heading">{card.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{card.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story + Values + LANGUAGES (floating) */}
        <section className="section-padding bg-surface relative">
          <div className="w-full px-4 sm:px-8">
            <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
              <div className="space-y-6">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold font-heading text-foreground">
                  Building at the intersection of <span className="text-gradient-primary">radio, code & community.</span>
                </motion.h2>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                  <p>I specialize in ideating and developing technology-enabled products with a focus on the <strong className="text-foreground">Telecom, Avionics, and Satellite</strong> domains — the kinds of systems where every dB and every nanosecond matters.</p>
                  <p>My passion lies in exploring <strong className="text-foreground">Automation, IoT, AI, and ML</strong> within these communication domains, then sharing what I learn through a personal wiki, blog posts, and open-source projects.</p>
                  <p>I believe the best engineers stay curious, write things down, and lift others up. That's what this site — and most of what I do — is really about.</p>
                </motion.div>
              </div>

              <div className="space-y-6">
                {/* Languages — floating creative card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
                  className="relative rounded-2xl border border-border bg-card p-6 overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
                  <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-highlight/10 blur-2xl" />
                  <div className="relative">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground font-heading mb-4">
                      <Languages className="h-4 w-4 text-highlight" /> Languages I speak
                    </h3>
                    <div className="space-y-4">
                      {languages.map((lang, i) => (
                        <motion.div
                          key={lang.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + i * 0.1 }}
                          className="group"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{lang.flag}</span>
                              <span className="text-sm text-foreground font-medium">{lang.name}</span>
                              <span className="text-xs text-muted-foreground italic">{lang.native}</span>
                            </div>
                            <span className="text-[10px] font-mono text-highlight bg-highlight/10 px-2 py-0.5 rounded-full">
                              {lang.level}
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${lang.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${lang.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <p className="mt-4 text-[11px] text-muted-foreground italic">
                      Code switches faster than my Wi-Fi 📡
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Rewards & Recognition with filters */}
        <section className="section-padding">
          <div className="w-full px-4 sm:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-highlight/30 bg-highlight/5 px-3 py-1 text-xs text-highlight mb-4">
                <Trophy className="h-3 w-3" /> Wall of Fame
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground">
                Rewards & <span className="text-gradient-primary">Recognition</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                Milestones, mentions, and moments that keep me building.
              </p>
            </motion.div>

            <div className="relative mb-5 max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={rewardSearch}
                onChange={(e) => setRewardSearch(e.target.value)}
                placeholder="Search rewards by title, organization, or description..."
                className="w-full rounded-xl border border-border bg-card pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {rewardFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setRewardFilter(f.key)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    rewardFilter === f.key
                      ? "bg-gradient-to-r from-primary to-highlight text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {f.label}
                  <span className={`rounded-full px-1.5 text-[10px] ${rewardFilter === f.key ? "bg-background/20" : "bg-muted text-muted-foreground"}`}>
                    {rewardCounts[f.key] || 0}
                  </span>
                </button>
              ))}
            </div>

            {filteredRewards.length === 0 ? (
              <div className="text-center py-10 text-sm text-muted-foreground">No rewards in this category yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredRewards.map((r, i) => (
                  <motion.div key={r.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative rounded-2xl border border-border bg-card p-6 card-hover overflow-hidden">
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition" />
                    <div className="relative">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 mb-4">
                        <r.icon className={`h-6 w-6 ${r.color}`} />
                      </div>
                      <h3 className="text-base font-semibold text-foreground font-heading leading-tight">{r.title}</h3>
                      <p className="text-xs text-primary mt-1">{r.organization}</p>
                      <p className="text-xs font-mono text-muted-foreground mt-1">{r.year}</p>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{r.description}</p>
                      <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                        <span className="inline-block text-[10px] bg-secondary px-2 py-0.5 rounded-md text-muted-foreground">{r.category}</span>
                        {r.link && (
                          <a href={r.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline">
                            <ExternalLink className="h-3 w-3" /> {r.linkLabel || "View"}
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Articles */}
        <section className="section-padding bg-surface">
          <div className="w-full px-4 sm:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-3">
                Thoughts & Insights
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground">
                Articles & <span className="text-gradient-primary">Blogs</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                Sharing knowledge through technical writing and tutorials.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="relative overflow-hidden -mx-4 sm:-mx-8">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
                <motion.div
                  className="flex gap-4 w-max"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                >
                  {[...articles, ...articles].map((article, i) => (
                    <a key={`${article.title}-${i}`} href={article.url} target="_blank" rel="noopener noreferrer" className="shrink-0 w-72 flex flex-col justify-between gap-4 p-5 rounded-2xl border border-border bg-card card-hover">
                      <span className="text-sm font-medium text-foreground leading-snug">{article.title}</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </motion.div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <a href="https://blog.suryaraj.me" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">blog.suryaraj.me →</a>
                <a href="https://wiki.suryaraj.me" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">wiki.suryaraj.me →</a>
                <a href="https://circuitrylab.com/" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-highlight text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
                  <Zap className="h-4 w-4" />
                  <span>Explore CircuitryLab</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <QuickActions />
    </div>
  );
}
