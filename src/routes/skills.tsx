import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, Code2, Cpu, Radio, Zap, Database, MapPin, ExternalLink, Download, Search, BadgeCheck, Calendar, Sparkles, LayoutGrid, List, X, Link2, BookOpen } from "lucide-react";
import { useState, useMemo } from "react";
import { TextReveal } from "../components/TextReveal";
import { QuickActions } from "../components/QuickActions";
import { ScrollToTop } from "../components/ScrollToTop";
import { DetailModal } from "../components/DetailModal";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Surya Mangaraj" },
      { name: "description", content: "Explore Surya Mangaraj's education, certifications, and technical skills in RF Design, Communication Systems, and AI." },
      { property: "og:title", content: "Skills — Surya Mangaraj" },
      { property: "og:description", content: "Explore Surya Mangaraj's education, certifications, and technical skills." },
    ],
  }),
  component: SkillsPage,
});

interface Education {
  degree: string; institution: string; location: string; year: string; grade?: string; description: string; highlights: string[];
  activities?: string[]; orgLinks?: { label: string; url: string }[];
}

const education: Education[] = [
  {
    degree: "Master's in Communication Systems",
    institution: "Indian Institute of Technology, Kanpur",
    location: "Kanpur, Uttar Pradesh, India",
    year: "Jul 2022 — Mar 2024",
    grade: "IIT Kanpur",
    description: "Advanced studies in Communication Systems at one of India's premier institutes. Focused on wireless communication, signal processing, and AI/ML for RF applications.",
    highlights: ["Communication Systems", "Wireless Networks", "Signal Processing", "AI/ML for RF", "Research Methodology"],
    activities: ["Research on AI/ML for wireless communication — beamforming and channel estimation.", "Published research on Op-Amp design for LDO applications.", "Collaborated with faculty on UAV and AAM communication research."],
    orgLinks: [{ label: "IIT Kanpur", url: "https://www.iitk.ac.in" }],
  },
  {
    degree: "B.Tech in Electronics & Communication Engineering",
    institution: "National Institute of Science and Technology (Autonomous, NBA & NAAC Accredited)",
    location: "Odisha, India",
    year: "2014 — 2018",
    grade: "NIST Autonomous",
    description: "Specialized in Electronics and Communication Engineering with a strong foundation in RF Design, Embedded Systems, and VLSI.",
    highlights: ["RF & Antenna Design", "Embedded Systems", "VLSI", "DSP", "Communication Systems"],
    activities: ["Founded MERA Innovation — Startup India recognized educational platform.", "R&D Engineer at Electronic Center of Excellence concurrently.", "IEEE student chapter member.", "Campus Ambassador for multiple tech startups."],
    orgLinks: [{ label: "NIST", url: "https://www.nframeist.ac.in" }, { label: "MERA Innovation", url: "https://merainnovation.com" }],
  },
];

type CertCategory = "RF" | "Programming" | "AI/ML" | "Cloud" | "Open Source";
interface Certification {
  name: string; issuer: string; year: string; category: CertCategory; verified: boolean; verifyUrl?: string; pdfUrl?: string; skills: string[];
}

const certifications: Certification[] = [
  { name: "Intro to Machine Learning",                  issuer: "Coursera / Industry",          year: "2023", category: "AI/ML",        verified: true, verifyUrl: "https://example.com/verify/ml", pdfUrl: "https://example.com/cert/ml.pdf", skills: ["Machine Learning", "Python", "Data Science"] },
  { name: "Learn C# Programming (In Ten Easy Steps)",   issuer: "Udemy",                        year: "2022", category: "Programming",  verified: true, verifyUrl: "https://example.com/verify/csharp", pdfUrl: "https://example.com/cert/csharp.pdf", skills: ["C#", ".NET"] },
  { name: "Intro to Linux Shell Scripting",             issuer: "Coursera",                     year: "2022", category: "Programming",  verified: true, verifyUrl: "https://example.com/verify/linux", pdfUrl: "https://example.com/cert/linux.pdf", skills: ["Linux", "Shell Scripting", "Bash"] },
  { name: "Everyday AI: 15 Practical Skills to Build Confidence With AI", issuer: "LinkedIn Learning",  year: "2024", category: "AI/ML", verified: true, verifyUrl: "https://example.com/verify/everyday-ai", pdfUrl: "https://example.com/cert/everyday-ai.pdf", skills: ["AI", "Prompt Engineering", "Automation"] },
  { name: "Boot Camp - RF Back to Basics",              issuer: "Industry Training",            year: "2021", category: "RF",           verified: true, verifyUrl: "https://example.com/verify/rf-bootcamp", pdfUrl: "https://example.com/cert/rf-bootcamp.pdf", skills: ["RF Design", "RF Fundamentals", "Signal Processing"] },
  { name: "RF Design Fundamentals",                     issuer: "Industry Certification",       year: "2023", category: "RF",           verified: true, verifyUrl: "https://example.com/verify/rf-design", pdfUrl: "https://example.com/cert/rf-design.pdf", skills: ["RF Design", "Antenna Design", "Signal Processing"] },
  { name: "Python for Data Science",                    issuer: "Coursera",                     year: "2021", category: "AI/ML",        verified: true, verifyUrl: "https://coursera.org/verify/python-ds", pdfUrl: "https://example.com/cert/python-ds.pdf", skills: ["Python", "Pandas", "NumPy", "Matplotlib"] },
  { name: "AWS Cloud Practitioner",                     issuer: "Amazon Web Services",          year: "2023", category: "Cloud",        verified: true, verifyUrl: "https://aws.amazon.com/verify", pdfUrl: "https://example.com/cert/aws-cp.pdf", skills: ["AWS", "Cloud", "Linux", "Networking"] },
];

const certCategories: { key: "all" | CertCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "RF", label: "RF & Hardware" },
  { key: "Programming", label: "Programming" },
  { key: "AI/ML", label: "AI / ML" },
  { key: "Cloud", label: "Cloud" },
  { key: "Open Source", label: "Open Source" },
];

const skillCategories = [
  { title: "RF & Communication", icon: Radio, color: "text-chart-1", skills: [
    { name: "RF Design", level: 90 }, { name: "Antenna Design", level: 85 }, { name: "Signal Processing", level: 88 }, { name: "Satellite Comm.", level: 80 }, { name: "Telecom Systems", level: 85 },
  ]},
  { title: "Programming", icon: Code2, color: "text-chart-2", skills: [
    { name: "Python", level: 90 }, { name: "C / C++", level: 85 }, { name: "Verilog", level: 80 }, { name: "MATLAB", level: 88 }, { name: "TypeScript", level: 75 },
  ]},
  { title: "Hardware & Communication", icon: Cpu, color: "text-chart-4", skills: [
    { name: "RISC-V ISA", level: 88 }, { name: "FPGA", level: 82 }, { name: "IoT", level: 85 }, { name: "Communication Systems", level: 87 },
  ]},
  { title: "AI & Tools", icon: Zap, color: "text-chart-5", skills: [
    { name: "Machine Learning", level: 78 }, { name: "Automation", level: 82 }, { name: "Git / Linux", level: 90 }, { name: "Docker", level: 68 },
  ]},
];

/* ---------- Skill usage registry — where each skill shows up ---------- */
type SkillRefSource = "Work" | "Research" | "Project" | "Education" | "Certification";
interface SkillRef { source: SkillRefSource; label: string; }

const skillRefs: Record<string, SkillRef[]> = {
  "RF Design": [
    { source: "Work", label: "Cadence Design Systems — RF Engineer" },
    { source: "Research", label: "Adaptive Beamforming for 5G mmWave (Patent)" },
    { source: "Project", label: "awesome-rf" },
    { source: "Certification", label: "RF Design Fundamentals" },
  ],
  "Antenna Design": [
    { source: "Work", label: "Research Internship — RF Research Intern" },
    { source: "Certification", label: "Antenna Design Workshop (IEEE)" },
  ],
  "Signal Processing": [
    { source: "Work", label: "Cadence Design Systems" },
    { source: "Research", label: "Signal Integrity Analysis (IEEE Journal)" },
    { source: "Education", label: "B.Tech ECE — DSP coursework" },
  ],
  "Satellite Comm.": [{ source: "Work", label: "Research Internship" }, { source: "Education", label: "B.Tech ECE" }],
  "Telecom Systems": [{ source: "Work", label: "Cadence" }, { source: "Education", label: "B.Tech ECE" }],
  "Python": [
    { source: "Project", label: "AI Projects" },
    { source: "Project", label: "Connected Agriculture" },
    { source: "Certification", label: "Python for Data Science" },
  ],
  "C / C++": [{ source: "Education", label: "B.Tech ECE — Embedded labs" }, { source: "Project", label: "RISC-V toolchain experiments" }],
  "Verilog": [{ source: "Education", label: "B.Tech ECE — VLSI labs" }],
  "MATLAB": [{ source: "Work", label: "Research Internship" }, { source: "Research", label: "Signal Integrity (Journal)" }],
  "TypeScript": [{ source: "Project", label: "Personal Website" }],
  "RISC-V ISA": [
    { source: "Project", label: "awesome-riscv (344+ stars)" },
    { source: "Research", label: "RISC-V Toolchains for Education (Conference)" },
    { source: "Certification", label: "RISC-V Architecture" },
  ],
  "FPGA": [{ source: "Education", label: "B.Tech ECE — Digital labs" }],
  "IoT": [
    { source: "Work", label: "Connected Agriculture Project" },
    { source: "Research", label: "IoT-Driven Smart Agriculture (Conference)" },
    { source: "Project", label: "Connected Agriculture" },
    { source: "Certification", label: "IoT & Communication Systems" },
  ],
  "Communication Systems": [{ source: "Work", label: "Cadence" }, { source: "Education", label: "B.Tech ECE" }],
  "Machine Learning": [{ source: "Project", label: "AI Projects" }, { source: "Certification", label: "ML Specialization (Coursera)" }],
  "Automation": [{ source: "Work", label: "Connected Agriculture" }, { source: "Project", label: "Personal Website CI/CD" }],
  "Git / Linux": [{ source: "Project", label: "All open-source repos" }, { source: "Work", label: "Daily workflow" }],
  "Docker": [{ source: "Project", label: "AI Projects" }],
};

const sourceColor: Record<SkillRefSource, string> = {
  Work: "text-primary bg-primary/10",
  Research: "text-highlight bg-highlight/10",
  Project: "text-chart-2 bg-chart-2/10",
  Education: "text-chart-3 bg-chart-3/10",
  Certification: "text-chart-5 bg-chart-5/10",
};

function SkillsPage() {
  const [certFilter, setCertFilter] = useState<typeof certCategories[number]["key"]>("all");
  const [certSearch, setCertSearch] = useState("");
  const [certView, setCertView] = useState<"grid" | "list">("grid");

  const [eduSearch, setEduSearch] = useState("");
  const [activeEdu, setActiveEdu] = useState<Education | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const filteredEdu = useMemo(() => {
    const q = eduSearch.toLowerCase();
    if (!q) return education;
    return education.filter((e) =>
      e.degree.toLowerCase().includes(q) || e.institution.toLowerCase().includes(q) ||
      e.highlights.some((h) => h.toLowerCase().includes(q))
    );
  }, [eduSearch]);

  const filteredCerts = useMemo(() => {
    return certifications.filter((c) => {
      const matchCat = certFilter === "all" || c.category === certFilter;
      const q = certSearch.toLowerCase();
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [certFilter, certSearch]);

  const certCounts = useMemo(() => {
    const map: Record<string, number> = { all: certifications.length };
    for (const c of certifications) map[c.category] = (map[c.category] || 0) + 1;
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <section className="section-padding text-center">
          <div className="w-full px-4 sm:px-8">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-6xl font-bold font-heading">
              <TextReveal text="Skills & Qualifications" gradientWords={[2]} />
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-muted-foreground">
              Education, certifications, and technical expertise
            </motion.p>
          </div>
        </section>

        <section className="section-padding bg-surface">
          <div className="w-full px-4 sm:px-8">
            <div className="grid lg:grid-cols-[7fr_3fr] gap-10">
              <div className="space-y-16">

                {/* EDUCATION — centered heading + search */}
                <div>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary mb-3">
                      <GraduationCap className="h-3 w-3" /> Academic Journey
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-heading">
                      My <span className="text-gradient-primary">Education</span>
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                      Foundations laid one course, club, and curiosity at a time.
                    </p>
                  </motion.div>

                  <div className="relative mb-6 max-w-xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      value={eduSearch}
                      onChange={(e) => setEduSearch(e.target.value)}
                      placeholder="Search education by degree, institution, or topic..."
                      className="w-full rounded-xl border border-border bg-background/40 pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-highlight to-transparent" />
                    {filteredEdu.length === 0 ? (
                      <div className="text-center py-8 text-sm text-muted-foreground">No matching education entries.</div>
                    ) : filteredEdu.map((edu, i) => (
                      <motion.button
                        key={edu.degree}
                        type="button"
                        onClick={() => setActiveEdu(edu)}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="relative mb-8 last:mb-0 w-full text-left"
                      >
                        <div className="absolute -left-8 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 ring-4 ring-background">
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-6 card-hover overflow-hidden relative">
                          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
                          <div className="relative">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <h3 className="text-base font-semibold text-foreground font-heading">{edu.degree}</h3>
                                <p className="text-sm text-primary mt-1 flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> {edu.institution}</p>
                                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {edu.location}</p>
                              </div>
                              <div className="flex flex-col items-end gap-1.5">
                                <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded-md flex items-center gap-1"><Calendar className="h-3 w-3" /> {edu.year}</span>
                                {edu.grade && <span className="text-xs text-highlight bg-highlight/10 px-2 py-0.5 rounded-full font-medium">{edu.grade}</span>}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">{edu.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* CERTIFICATIONS — centered heading */}
                <div>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
                    <span className="inline-flex items-center gap-2 rounded-full border border-highlight/30 bg-highlight/5 px-3 py-1 text-xs text-highlight mb-3">
                      <Award className="h-3 w-3" /> Verified Credentials
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-heading">
                      My <span className="text-gradient-primary">Certifications</span>
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                      {certifications.length} verified certificates across RF, AI, Cloud, and more.
                    </p>
                  </motion.div>

                  <div className="rounded-2xl border border-border bg-card p-4 mb-5">
                    <div className="relative mb-3">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input value={certSearch} onChange={(e) => setCertSearch(e.target.value)} placeholder="Search certifications..." className="w-full rounded-xl border border-border bg-background/40 pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      {certCategories.map((c) => (
                        <button key={c.key} onClick={() => setCertFilter(c.key)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${certFilter === c.key ? "bg-gradient-to-r from-primary to-highlight text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                          {c.label}
                          <span className={`rounded-full px-1.5 text-[10px] ${certFilter === c.key ? "bg-background/20" : "bg-muted text-muted-foreground"}`}>{certCounts[c.key] || 0}</span>
                        </button>
                      ))}
                      <div className="ml-auto inline-flex items-center rounded-full border border-border bg-background/40 p-1">
                        <button onClick={() => setCertView("grid")} aria-label="Grid view" className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] transition-colors ${certView === "grid" ? "bg-gradient-to-r from-primary to-highlight text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                          <LayoutGrid className="h-3 w-3" /> Grid
                        </button>
                        <button onClick={() => setCertView("list")} aria-label="List view" className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] transition-colors ${certView === "list" ? "bg-gradient-to-r from-primary to-highlight text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                          <List className="h-3 w-3" /> List
                        </button>
                      </div>
                    </div>
                  </div>

                  {filteredCerts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground text-sm">No certifications match your filters.</div>
                  ) : certView === "grid" ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {filteredCerts.map((cert, i) => (
                        <motion.div key={cert.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-border bg-card p-5 card-hover flex flex-col">
                          <div className="flex items-start justify-between mb-3">
                            <div className="h-10 w-10 rounded-lg bg-highlight/10 flex items-center justify-center shrink-0">
                              <Award className="h-5 w-5 text-highlight" />
                            </div>
                            {cert.verified && (
                              <span className="inline-flex items-center gap-1 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                <BadgeCheck className="h-3 w-3" /> Verified
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm font-semibold text-foreground leading-tight">{cert.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            <span className="font-mono">{cert.year}</span>
                            <span className="bg-secondary px-2 py-0.5 rounded-md">{cert.category}</span>
                          </div>
                          {cert.skills && cert.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {cert.skills.map((s) => (
                                <span key={s} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-md">{s}</span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                            {cert.verifyUrl && (
                              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs text-foreground hover:bg-secondary transition">
                                <ExternalLink className="h-3 w-3" /> Verify
                              </a>
                            )}
                            {cert.pdfUrl && (
                              <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition">
                                <Download className="h-3 w-3" /> PDF
                              </a>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {filteredCerts.map((cert, i) => (
                        <motion.div key={cert.name} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="rounded-xl border border-border bg-card p-3 card-hover flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-highlight/10 flex items-center justify-center shrink-0">
                            <Award className="h-4 w-4 text-highlight" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-semibold text-foreground leading-tight truncate">{cert.name}</h3>
                              {cert.verified && (
                                <span className="inline-flex items-center gap-1 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                                  <BadgeCheck className="h-3 w-3" /> Verified
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {cert.issuer} • <span className="font-mono">{cert.year}</span> • {cert.category}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {cert.verifyUrl && (
                              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" aria-label="Verify" className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-border text-foreground hover:bg-secondary transition">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}
                            {cert.pdfUrl && (
                              <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer" aria-label="Download PDF" className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition">
                                <Download className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT — Skills with green→yellow gradient bars + counts */}
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-foreground font-heading">
                  <Database className="h-6 w-6 text-primary" /> Skills
                </h2>
                <p className="text-xs text-muted-foreground -mt-3">Each badge shows how many places that skill shows up. Click to see references.</p>
                {skillCategories.map((cat, ci) => (
                  <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 }} className="rounded-xl border border-border bg-card p-5">
                    <h3 className={`flex items-center gap-2 text-sm font-semibold ${cat.color} mb-4`}>
                      <cat.icon className="h-4 w-4" /> {cat.title}
                    </h3>
                    <div className="space-y-3">
                      {cat.skills.map((skill) => {
                        const refs = skillRefs[skill.name] || [];
                        return (
                          <button
                            key={skill.name}
                            type="button"
                            onClick={() => refs.length > 0 && setActiveSkill(skill.name)}
                            disabled={refs.length === 0}
                            className="w-full text-left group disabled:cursor-default"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-foreground flex items-center gap-2">
                                {skill.name}
                                {refs.length > 0 && (
                                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-highlight to-primary text-[10px] font-bold text-primary-foreground group-hover:scale-110 transition">
                                    {refs.length}
                                  </span>
                                )}
                              </span>
                              <span className="text-[10px] font-mono text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-highlight to-primary"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <QuickActions />

      {/* Education detail modal */}
      <DetailModal open={!!activeEdu} onClose={() => setActiveEdu(null)} maxWidth="max-w-2xl">
        {activeEdu && (
          <div className="p-7">
            <div className="flex items-start gap-4 mb-5">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-highlight/20 flex items-center justify-center shrink-0">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-bold font-heading text-foreground">{activeEdu.degree}</h2>
                <p className="text-sm text-primary mt-1">{activeEdu.institution}</p>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {activeEdu.location} • {activeEdu.year}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{activeEdu.description}</p>

            {activeEdu.activities && activeEdu.activities.length > 0 && (
              <div className="mb-5">
                <h3 className="text-xs uppercase tracking-wider text-highlight mb-2 flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> Extracurriculars</h3>
                <ul className="space-y-1.5">
                  {activeEdu.activities.map((a) => <li key={a} className="text-sm text-foreground flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-highlight shrink-0" /> {a}</li>)}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 mb-5">
              {activeEdu.highlights.map((h) => <span key={h} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md">{h}</span>)}
            </div>

            {activeEdu.orgLinks && (
              <div className="pt-4 border-t border-border flex flex-wrap gap-2">
                {activeEdu.orgLinks.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition">
                    <Link2 className="h-3 w-3" /> {l.label} <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </DetailModal>

      {/* Skill references popover (centered modal) */}
      <AnimatePresence>
        {activeSkill && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-md" onClick={() => setActiveSkill(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 z-[201] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-card shadow-2xl p-6"
            >
              <button onClick={() => setActiveSkill(null)} className="absolute right-3 top-3 rounded-full bg-background/40 p-1.5 text-foreground hover:bg-background/60" aria-label="Close">
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-center gap-3 mb-1">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-highlight to-primary flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-foreground">{activeSkill}</h3>
                  <p className="text-xs text-muted-foreground">Used across {(skillRefs[activeSkill] || []).length} place(s)</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 max-h-[50vh] overflow-y-auto">
                {(skillRefs[activeSkill] || []).map((r, i) => (
                  <li key={i} className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 p-2.5">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${sourceColor[r.source]}`}>{r.source}</span>
                    <span className="text-sm text-foreground flex-1 min-w-0 truncate">{r.label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
