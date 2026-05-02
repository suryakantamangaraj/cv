import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import {
  Briefcase, Clock, Building, Zap, MapPin, Search, LayoutGrid, List, Calendar,
  Star, GitFork, ExternalLink, Layers, Code2, Globe, Cpu,
  BookOpen, FileText, ScrollText, Lock, Newspaper, Mic, BookMarked, CheckCircle2, Link2,
} from "lucide-react";
import { useState, useMemo } from "react";
import { TextReveal } from "../components/TextReveal";
import { QuickActions } from "../components/QuickActions";
import { ScrollToTop } from "../components/ScrollToTop";
import { DetailModal } from "../components/DetailModal";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Work, Projects & Research — Surya Mangaraj" },
      { name: "description", content: "Surya Mangaraj's work experience, project portfolio, and research & publications across RF, Communication Systems, and open source." },
      { property: "og:title", content: "Work, Projects & Research — Surya Mangaraj" },
      { property: "og:description", content: "Surya Mangaraj's work experience, project portfolio, and research & publications." },
    ],
  }),
  component: ExperiencePage,
});

/* ---------------- WORK EXPERIENCE ---------------- */
type ExpType = "Full Time" | "Project" | "Community" | "Internship";
interface Experience {
  company: string; role: string; type: ExpType; period: string; location: string; current: boolean; description: string; skills: string[];
  designation?: string; city?: string; country?: string; summary?: string; responsibilities?: string[]; links?: { label: string; url: string }[];
}

const experiences: Experience[] = [
  { company: "Cadence Design Systems", role: "Lead Application Engineer", type: "Full Time", period: "Aug 2025 — Present", location: "India", current: true,
    description: "Power user and specialist within the AWR Ecosystem (MWO, VSS, SS, & EM). Bridging theoretical system architecture and physical implementation.",
    skills: ["AWR/MWO", "RF System Design", "Phased Arrays", "EDA Tools", "Signal Processing", ".NET", "Python"],
    designation: "Lead Application Engineer", city: "Bengaluru", country: "India",
    summary: "Specialist within the AWR Ecosystem (MWO, VSS, SS, & EM), bridging the gap between theoretical system architecture and physical implementation through high-fidelity modeling of Tx/Rx chains, phased arrays, and complex waveforms.",
    responsibilities: ["Lead application engineering for AWR ecosystem products.", "High-fidelity modeling of Tx/Rx chains and phased arrays.", "Customer-facing technical support and enablement.", "Develop automation and integration workflows."],
    links: [{ label: "Cadence", url: "https://www.cadence.com" }] },
  { company: "Viasat", role: "Software Engineer (RF) III", type: "Full Time", period: "Aug 2023 — Aug 2025", location: "India", current: false,
    description: "Designed and implemented RF measurement IP, automation suites, and AI/ML-driven test validation for satellite communication systems.",
    skills: ["RF Systems", "Satellite Comm.", "Python", ".NET", "IVI Drivers", "AI/ML", "Git", "CI/CD"],
    designation: "Software Engineer (RF) III", city: "Hyderabad", country: "India",
    summary: "Conducted research, designed application software algorithms and measurement IP for RF systems and signal processing at a global satellite broadband company.",
    responsibilities: ["Developed RF measurement methodologies for enhanced test accuracy.", "Built automation suite for all test & measurement equipment.", "Created IVI-standard drivers in .NET for seamless integration.", "Applied AI/ML techniques to analyze and validate test data.", "Validated RF test procedures on satellite communication systems.", "Leveraged Git and CI/CD for smooth software deployment."],
    links: [{ label: "Viasat", url: "https://www.viasat.com" }] },
  { company: "Honeywell Aerospace", role: "Wireless/RF Engineer II", type: "Full Time", period: "Nov 2021 — Aug 2023", location: "India", current: false,
    description: "Simulated and analyzed RF systems for Tx/Rx line-up compliance with DO-160 MOPS standards. PCB design, schematic development, and HW design-to-cost innovation.",
    skills: ["RF Simulation", "MOPS/DO-160", "PCB Design", "Python", "SCPI", "Failure Analysis", "AI/ML"],
    designation: "Wireless/RF Engineer II", city: "Bengaluru", country: "India",
    summary: "Worked on RF systems for aerospace products — simulation, test characterization, schematic/PCB design, and compliance validation per MOPS (DO-160) standards.",
    responsibilities: ["Simulated and analyzed Tx/Rx line-up compliance with DO-160 standards.", "Developed schematics and reviewed PCB/flex layouts with layout team.", "Drove HW design-to-cost innovation using state-of-the-art technology.", "Root cause analysis of reliability and qualification failures.", "Created and maintained RF component specifications with vendors.", "Utilized Python and SCPI commands for program-related automation."],
    links: [{ label: "Honeywell Aerospace", url: "https://www.honeywell.com/us/en/company/aerospace" }] },
  { company: "VVDN Technologies", role: "Radio Frequency Engineer", type: "Full Time", period: "Nov 2020 — Nov 2021", location: "India", current: false,
    description: "5G NR and LTE RF system design — link budget, Tx/Rx chain analysis, component characterization, and test automation for sub-6 GHz and mmWave bands.",
    skills: ["5G NR", "LTE", "RF Link Budget", "Test Automation", "Spectrum Analyzer", "Network Analyzer"],
    designation: "Radio Frequency Engineer", city: "India", country: "India",
    summary: "Designed, built, and validated 5G solutions — L1 engineering, RF link budgets, Tx/Rx chain specs, and end-to-end system validation for mmWave and sub-6 GHz bands.",
    responsibilities: ["Worked on RF link budget and Tx/Rx chain requirement specifications.", "Performed RF system simulations and lineup analysis per industry standards.", "Created and maintained specs for RF components and drove component development.", "Designed test suite automation for 5GNR and LTE conformance testing.", "RF component characterization using spectrum/network analyzers, signal generators, oscilloscopes.", "Hands-on disassembly and experimental modifications through productization."],
    links: [{ label: "VVDN", url: "https://www.vvdntech.com" }] },
  { company: "GSAS Micro Systems", role: "Field Application Engineer", type: "Full Time", period: "Apr 2018 — Nov 2020", location: "India", current: false,
    description: "Technical support for RF/RFCT products — 5G NR, LTE-A pre/post-sales support, troubleshooting, on-site installation, and customer training.",
    skills: ["5G NR", "LTE-A", "3GPP", "OpenRAN", "T&M Instruments", "Customer Support"],
    designation: "Field Application Engineer → Application Engineer", city: "Hyderabad / Bengaluru", country: "India",
    summary: "Served as internal technical resource. Conducted training, field support, and RF troubleshooting for 5G and legacy cellular standards based on 3GPP and OpenRAN specs.",
    responsibilities: ["Led field support requiring coordination with internal functions and customer sites.", "RF Tx/Rx performance troubleshooting for 5G and legacy standards.", "Pre-sales and post-sales support of 5G NR, LTE-A to global customers.", "On-site installation, implementation, and maintenance of wireless test solutions.", "Drafted datasheets, application notes, and designed evaluation boards.", "Verified specifications through bench testing and characterization."],
    links: [{ label: "GSAS Micro Systems", url: "https://gsasmicrosystems.com" }] },
  { company: "MERA Innovation", role: "Founder & Strategic Mentor", type: "Community", period: "Oct 2015 — Sep 2020", location: "India", current: false,
    description: "Startup India recognized org — STEM education platform for students. Spearheaded Python, Arduino, and Drone development courses for primary school students.",
    skills: ["STEM Education", "Python", "Arduino", "Drone Dev", "Strategy", "Curriculum Design"],
    designation: "Founder → Strategic Mentor", city: "Brahmapur", country: "India",
    summary: "Founded MERA Innovation, a Startup India-recognized org focused on educational training and services, providing a platform for students to innovate and create.",
    responsibilities: ["Set strategic direction aligning all initiatives with the organization's mission.", "Spearheaded creation of STEM courses for primary school students.", "Developed advanced content: Python Programming, Arduino, and Drone Development.", "Promoted culture of creativity and innovation beyond traditional boundaries.", "Maintained highest standards of ethical conduct in all activities."],
    links: [{ label: "MERA Innovation", url: "https://merainnovation.com" }] },
  { company: "Electronic Center of Excellence", role: "R&D Engineer", type: "Full Time", period: "Apr 2018 — Jul 2019", location: "India", current: false,
    description: "Post-silicon validation and hardware architecture — system-level block design, functional test patterns, and SOC characterization for productization.",
    skills: ["Post-Silicon Validation", "SoC", "FPGA", "IoT", "Biomedical", "RF Chips"],
    designation: "Research And Development Engineer", city: "Bhubaneswar", country: "India",
    summary: "Worked at eCOE — a platform focused on nurturing the Electronics Industry ecosystem through Training, Research, and Incubation. Areas include IoT Smart Sensing, Biomedical Instrumentation, and RF Chips.",
    responsibilities: ["Defined system-level block diagrams and architecture with design team.", "Developed functional test patterns and validated with real use case applications.", "Performance validation with industry-standard benchmarks.", "Characterized electrical parameters per specification.", "Ensured silicon/chip/SOC was qualified and ready to deploy."],
    links: [] },
  { company: "Open Source", role: "Contributor & Maintainer", type: "Community", period: "2021 — Present", location: "Remote", current: true,
    description: "Created awesome-riscv (344+ stars). Maintain multiple open-source projects and community templates.",
    skills: ["RISC-V", "Open Source", "Community", "Documentation"],
    designation: "Maintainer", city: "Remote", country: "Worldwide",
    summary: "Sustained, multi-year contributions to RISC-V tooling, profile templates, and community resources. Reviewed hundreds of PRs and mentored first-time contributors.",
    responsibilities: ["Maintain awesome-riscv (344+ stars) — review PRs, curate resources.", "Triage issues across multiple repositories.", "Mentor new contributors during Hacktoberfest.", "Write blog posts about RISC-V tooling."],
    links: [{ label: "awesome-riscv", url: "https://github.com/suryakantamangaraj/awesome-riscv" }, { label: "GitHub Profile", url: "https://github.com/suryakantamangaraj" }] },
];

const expFilters: { key: "all" | ExpType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Full Time", label: "Full Time" },
  { key: "Project", label: "Projects" },
  { key: "Community", label: "Community" },
  { key: "Internship", label: "Internship" },
];

const stats = [
  { icon: Clock, value: "7+", label: "Years Experience" },
  { icon: Building, value: "8+", label: "Organizations" },
  { icon: Zap, value: "2", label: "Current Roles" },
];

const sortOptions = [
  { key: "recent", label: "Most Recent" },
  { key: "oldest", label: "Oldest First" },
] as const;

/* ---------------- PROJECTS ---------------- */
const projectCategories = [
  { key: "all", label: "All Projects", icon: Layers, count: 8 },
  { key: "rf", label: "RF & Hardware", icon: Cpu, count: 2 },
  { key: "web", label: "Web Development", icon: Globe, count: 3 },
  { key: "ai", label: "AI & ML", icon: Zap, count: 1 },
  { key: "oss", label: "Open Source", icon: Code2, count: 2 },
];

interface Project {
  name: string; description: string; stars: number; forks: number; language: string; languageColor: string;
  topics: string[]; url: string; demo?: string; category: string[]; featured: boolean;
  features?: string[]; techSpecs?: string[]; implementation?: string; technologies?: string[];
}

const projects: Project[] = [
  { name: "awesome-riscv", description: "A curated list of RISC-V resources — open-source ISA based on RISC principles.", stars: 344, forks: 32, language: "Markdown", languageColor: "bg-chart-2", topics: ["RISC-V", "Awesome List", "Open Source"], url: "https://github.com/suryakantamangaraj/awesome-riscv", category: ["oss", "rf"], featured: true,
    features: ["Curated by category: cores, toolchains, books, papers, communities.", "Continuously updated with PR-based community submissions.", "Searchable via GitHub topics and tags."],
    techSpecs: ["Markdown-driven static index", "GitHub Actions for link-checking", "Automated PR validation"],
    implementation: "Built as a community-driven Markdown repository. PRs are reviewed weekly. A GitHub Action runs nightly to verify all external links and flag dead resources.",
    technologies: ["Markdown", "GitHub Actions", "YAML", "Bash"] },
  { name: "AwesomeGithubProfileTemplates", description: "Curated list of awesome GitHub profile READMEs with tools and guides.", stars: 51, forks: 5, language: "Markdown", languageColor: "bg-chart-2", topics: ["GitHub", "Templates"], url: "https://github.com/suryakantamangaraj/AwesomeGithubProfileTemplates", category: ["oss"], featured: true,
    features: ["100+ profile templates indexed.", "Filtered by style — minimal, animated, terminal, etc.", "Direct copy-to-clipboard snippets."],
    techSpecs: ["Markdown index", "Image previews"],
    implementation: "A flat Markdown index linking to template repos with screenshots and quick-copy snippets.",
    technologies: ["Markdown"] },
  { name: "Wiki (Digital Garden)", description: "Personal wiki — interconnected notes for easy navigation and knowledge sharing.", stars: 1, forks: 0, language: "JavaScript", languageColor: "bg-chart-4", topics: ["Wiki", "Knowledge Base"], url: "https://github.com/suryakantamangaraj/Wiki", demo: "https://wiki.suryaraj.me", category: ["web"], featured: false,
    features: ["Bidirectional links between notes.", "Full-text search.", "Graph view of note relationships."],
    techSpecs: ["Static-site generation", "Markdown source", "Search index built at compile-time"],
    implementation: "Notes stored in Markdown with frontmatter. A custom build step parses backlinks and generates a graph index served statically.",
    technologies: ["JavaScript", "Markdown", "Node.js"] },
  { name: "Blog", description: "Personal blog covering technology, productivity, and engineering insights.", stars: 0, forks: 0, language: "JavaScript", languageColor: "bg-chart-4", topics: ["Blog", "Writing"], url: "https://github.com/suryakantamangaraj/Blog", demo: "https://blog.suryaraj.me", category: ["web"], featured: false,
    features: ["MDX-powered posts.", "Code syntax highlighting.", "RSS feed."],
    technologies: ["JavaScript", "MDX", "Static Site"] },
  { name: "awesome-rf", description: "A curated list of RF design resources, tools, and learning materials.", stars: 0, forks: 0, language: "Markdown", languageColor: "bg-chart-2", topics: ["RF Design", "Awesome List"], url: "https://github.com/suryakantamangaraj/awesome-rf", category: ["rf", "oss"], featured: false,
    features: ["RF simulators, books, courses, tools.", "Categorized by domain (Telecom, Avionics, Satellite)."],
    technologies: ["Markdown"] },
  { name: "AI Projects", description: "Collection of AI and machine learning experiments and implementations.", stars: 0, forks: 0, language: "Python", languageColor: "bg-chart-5", topics: ["AI", "Machine Learning"], url: "https://github.com/suryakantamangaraj/ai", category: ["ai"], featured: false,
    features: ["Notebook-based experiments.", "Reproducible environments via requirements.txt."],
    technologies: ["Python", "PyTorch", "Jupyter"] },
  { name: "Personal Website", description: "Source code for the portfolio website built with modern web technologies.", stars: 2, forks: 0, language: "HTML", languageColor: "bg-destructive", topics: ["Portfolio", "Website"], url: "https://github.com/suryakantamangaraj/suryakantamangaraj.github.io", demo: "https://suryaraj.com", category: ["web"], featured: false,
    features: ["Fully responsive design.", "Dark mode by default.", "SEO-optimized with per-page meta."],
    techSpecs: ["TanStack Start SSR", "Tailwind v4 styling", "Framer Motion animations"],
    technologies: ["TypeScript", "React", "Tailwind", "TanStack"] },
  { name: "Connected Agriculture", description: "IoT-enabled solutions for smart agriculture using automation and ML.", stars: 0, forks: 0, language: "Python", languageColor: "bg-chart-5", topics: ["IoT", "Agriculture"], url: "https://github.com/suryakantamangaraj", category: ["rf", "ai"], featured: false,
    features: ["LoRaWAN sensor mesh.", "Edge ML for irrigation prediction.", "Offline-first sync."],
    techSpecs: ["50+ field nodes", "3-day prediction horizon", "Battery life > 6 months per node"],
    technologies: ["Python", "LoRaWAN", "TensorFlow Lite"] },
];

/* ---------------- RESEARCH & PUBLICATIONS ---------------- */
type PubType = "Patent" | "Trade Secret" | "Journal" | "Conference" | "Book" | "Talk";

interface Publication {
  type: PubType; title: string; venue: string; year: string; status: string; description: string; link?: string;
}

const publications: Publication[] = [
  { type: "Journal", title: "Design of Two Stage Classical Model Op-Amp for LDO Applications", venue: "IEEE / Academic Journal", year: "2021", status: "Published", description: "Research on designing a two-stage classical model operational amplifier optimized for Low Dropout Regulator applications.", link: "https://example.com/opamp-ldo" },
  { type: "Patent", title: "Adaptive Beamforming Method for 5G mmWave Antenna Arrays", venue: "Indian Patent Office", year: "2024", status: "Filed", description: "Novel approach to dynamic beamforming reducing power by 22% in dense urban deployments.", link: "https://example.com/patent-1" },
  { type: "Trade Secret", title: "Proprietary EDA Calibration Pipeline", venue: "Cadence (internal)", year: "2024", status: "Active", description: "Internal methodology improving RF block tape-out accuracy. Confidential — high-level summary only." },
  { type: "Journal", title: "Signal Integrity Analysis in Multi-Layer PCB Design", venue: "IEEE Transactions on Communications", year: "2023", status: "Published", description: "Quantitative study of crosstalk patterns under modern high-speed serial protocols.", link: "https://example.com/journal-1" },
  { type: "Conference", title: "Open-Source RISC-V Toolchains for Education", venue: "RISC-V Summit India 2023", year: "2023", status: "Presented", description: "Survey of accessible toolchains and a workshop blueprint for university programs.", link: "https://example.com/conf-1" },
  { type: "Conference", title: "IoT-Driven Smart Agriculture: A Field Study", venue: "IEEE IoT Conference 2022", year: "2022", status: "Presented", description: "Real-world deployment results from sensor mesh in rural Odisha.", link: "https://example.com/conf-2" },
  { type: "Book", title: "Awesome RISC-V — A Practitioner's Index", venue: "Self-published / GitBook", year: "2022", status: "Living document", description: "Continuously updated companion to the awesome-riscv repository (344+ stars).", link: "https://github.com/suryakantamangaraj/awesome-riscv" },
  { type: "Talk", title: "Designing for Avionics-Grade Reliability", venue: "Local Tech Meetup", year: "2023", status: "Delivered", description: "How constraints from aerospace shape better consumer hardware decisions." },
];

const pubFilters: { key: "all" | PubType; label: string; icon: typeof FileText }[] = [
  { key: "all", label: "All", icon: BookOpen },
  { key: "Patent", label: "Patents", icon: ScrollText },
  { key: "Trade Secret", label: "Trade Secrets", icon: Lock },
  { key: "Journal", label: "Journals", icon: Newspaper },
  { key: "Conference", label: "Conferences", icon: Mic },
  { key: "Book", label: "Books", icon: BookMarked },
  { key: "Talk", label: "Talks", icon: Mic },
];

const pubColors: Record<PubType, string> = {
  Patent: "text-highlight bg-highlight/10 border-highlight/30",
  "Trade Secret": "text-destructive bg-destructive/10 border-destructive/30",
  Journal: "text-primary bg-primary/10 border-primary/30",
  Conference: "text-chart-3 bg-chart-3/10 border-chart-3/30",
  Book: "text-chart-2 bg-chart-2/10 border-chart-2/30",
  Talk: "text-chart-5 bg-chart-5/10 border-chart-5/30",
};

/* ---------------- COMPONENT ---------------- */
function ExperiencePage() {
  // Experience state
  const [activeFilter, setActiveFilter] = useState<typeof expFilters[number]["key"]>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<typeof sortOptions[number]["key"]>("recent");

  // Projects state
  const [activeCategory, setActiveCategory] = useState("all");
  const [projectSearch, setProjectSearch] = useState("");
  const [projectView, setProjectView] = useState<"grid" | "list">("grid");

  // Publication state
  const [pubFilter, setPubFilter] = useState<typeof pubFilters[number]["key"]>("all");
  const [pubSearch, setPubSearch] = useState("");

  // Detail modals
  const [activeExp, setActiveExp] = useState<Experience | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredExp = useMemo(() => {
    let list = experiences.filter((e) => {
      const matchesFilter = activeFilter === "all" || e.type === activeFilter;
      const q = search.toLowerCase();
      const matchesSearch = !q || e.company.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || e.skills.some((s) => s.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
    if (sort === "oldest") list = [...list].reverse();
    return list;
  }, [activeFilter, search, sort]);

  const expCounts = useMemo(() => {
    const map: Record<string, number> = { all: experiences.length };
    for (const e of experiences) map[e.type] = (map[e.type] || 0) + 1;
    return map;
  }, []);

  const filteredProjects = useMemo(() => projects.filter((p) => {
    const matchCat = activeCategory === "all" || p.category.includes(activeCategory);
    const q = projectSearch.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.topics.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  }), [activeCategory, projectSearch]);

  const filteredPubs = useMemo(() => publications.filter((p) => {
    const matchType = pubFilter === "all" || p.type === pubFilter;
    const q = pubSearch.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.venue.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    return matchType && matchSearch;
  }), [pubFilter, pubSearch]);
  const pubCounts = useMemo(() => {
    const m: Record<string, number> = { all: publications.length };
    for (const p of publications) m[p.type] = (m[p.type] || 0) + 1;
    return m;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding text-center">
          <div className="w-full px-4 sm:px-8">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-6xl font-bold font-heading">
              <TextReveal text="Work, Projects & Research" gradientWords={[1, 3]} />
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-muted-foreground">
              The full picture: where I've worked, what I've built, and what I've published.
            </motion.p>
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section className="section-padding bg-surface">
          <div className="w-full px-4 sm:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground mb-4">
                <Briefcase className="h-4 w-4" /> Professional Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-heading">
                Work <span className="text-gradient-primary">Experience</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                Discover my journey through diverse roles, technologies, and achievements.
              </p>
              <div className="flex items-center justify-center gap-8 mt-8">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <s.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-2xl font-bold text-primary font-heading">{s.value}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="rounded-2xl border border-border bg-card p-4 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by company, role or skill..." className="w-full rounded-xl border border-border bg-background/40 pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="rounded-xl border border-border bg-background/40 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    {sortOptions.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground mr-1 flex items-center gap-1"><LayoutGrid className="h-3 w-3" /> Filter:</span>
                {expFilters.map((f) => (
                  <button key={f.key} onClick={() => setActiveFilter(f.key)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeFilter === f.key ? "bg-gradient-to-r from-primary to-highlight text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                    {f.label}
                    <span className={`rounded-full px-1.5 text-[10px] ${activeFilter === f.key ? "bg-background/20" : "bg-muted text-muted-foreground"}`}>{expCounts[f.key] || 0}</span>
                  </button>
                ))}
              </div>
            </div>

            {filteredExp.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">No experiences match your filters.</div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredExp.map((exp, i) => (
                  <motion.button key={exp.company} type="button" onClick={() => setActiveExp(exp)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="text-left rounded-2xl border border-border bg-card p-6 card-hover w-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-semibold text-foreground font-heading">{exp.company}</span>
                      </div>
                      {exp.current && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Current</span>}
                    </div>
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">{exp.type}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-3">{exp.role}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {exp.period}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {exp.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{exp.description}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-xs text-primary">
                      View details <ExternalLink className="h-3 w-3" />
                    </span>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* RESEARCH & PUBLICATIONS */}
        <section className="section-padding">
          <div className="w-full px-4 sm:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-highlight/30 bg-highlight/5 px-3 py-1 text-xs text-highlight mb-4">
                <ScrollText className="h-3 w-3" /> Knowledge in print
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-heading">
                Research & <span className="text-gradient-primary">Publications</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Patents, journals, conferences, and the occasional trade-secret. Filtered, dated, and demystified.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <a href="https://www.researchgate.net/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition">
                  <BookOpen className="h-3 w-3" /> ResearchGate <ExternalLink className="h-3 w-3" />
                </a>
                <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-highlight/30 bg-highlight/5 px-3 py-1.5 text-xs font-medium text-highlight hover:bg-highlight/10 transition">
                  <Newspaper className="h-3 w-3" /> Google Scholar <ExternalLink className="h-3 w-3" />
                </a>
                <a href="https://ieeexplore.ieee.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-chart-2/30 bg-chart-2/5 px-3 py-1.5 text-xs font-medium text-chart-2 hover:bg-chart-2/10 transition">
                  <ScrollText className="h-3 w-3" /> IEEE Xplore <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>

            <div className="relative mb-6 max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input value={pubSearch} onChange={(e) => setPubSearch(e.target.value)} placeholder="Search publications by title, venue, or topic..." className="w-full rounded-xl border border-border bg-card pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>


            {/* Filter chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {pubFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setPubFilter(f.key)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    pubFilter === f.key
                      ? "bg-gradient-to-r from-primary to-highlight text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <f.icon className="h-3 w-3" />
                  {f.label}
                  <span className={`rounded-full px-1.5 text-[10px] ${pubFilter === f.key ? "bg-background/20" : "bg-muted text-muted-foreground"}`}>
                    {pubCounts[f.key] || 0}
                  </span>
                </button>
              ))}
            </div>

            {filteredPubs.length === 0 ? (
              <div className="text-center py-12 text-sm text-muted-foreground">Nothing published in this category yet.</div>
            ) : (
              <div className="relative pl-6 sm:pl-10">
                <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-highlight to-transparent" />

                {filteredPubs.map((pub, i) => (
                  <motion.div
                    key={pub.title}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative mb-6 last:mb-0"
                  >
                    <div className="absolute -left-[26px] sm:-left-[34px] top-5 h-3 w-3 rounded-full bg-gradient-to-br from-primary to-highlight ring-4 ring-background" />
                    <div className="rounded-2xl border border-border bg-card p-5 card-hover">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${pubColors[pub.type]}`}>
                            {pub.type}
                          </span>
                          <h3 className="mt-2 text-base font-semibold text-foreground font-heading leading-snug">{pub.title}</h3>
                          <p className="text-xs text-primary mt-1">{pub.venue}</p>
                          <p className="text-xs font-mono text-muted-foreground mt-0.5">{pub.year} • {pub.status}</p>
                          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{pub.description}</p>
                        </div>
                        {pub.link && (
                          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline shrink-0">
                            Read <ExternalLink className="h-3 w-3" />
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

        {/* PROJECTS */}
        <section className="section-padding bg-surface">
          <div className="w-full px-4 sm:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground mb-4">
                <Layers className="h-4 w-4" /> Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-heading">
                Projects & <span className="text-gradient-primary">Open Source</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                A peek into what I build for fun, for work, and for the community.
              </p>

              {/* GitHub / GitLab stats + Apps portfolio */}
              <div className="mt-6 flex flex-wrap items-stretch justify-center gap-3 max-w-3xl mx-auto">
                <a href="https://github.com/suryakantamangaraj" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl border border-border bg-card hover:border-primary/40 px-4 py-3 transition card-hover">
                  <div className="h-10 w-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-foreground" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">GitHub</p>
                    <p className="text-[11px] text-muted-foreground"><span className="text-highlight font-bold">395+</span> stars · <span className="text-primary font-bold">19</span> repos</p>
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition" />
                </a>
                <a href="https://gitlab.com/suryakantamangaraj" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl border border-border bg-card hover:border-highlight/40 px-4 py-3 transition card-hover">
                  <div className="h-10 w-10 rounded-xl bg-highlight/5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-highlight" fill="currentColor"><path d="M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 00-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 00-.867 0L1.386 9.452.045 13.587a.924.924 0 00.331 1.023L12 23.054l11.624-8.443a.92.92 0 00.331-1.024"/></svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">GitLab</p>
                    <p className="text-[11px] text-muted-foreground">Mirrors · CI pipelines</p>
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-highlight transition" />
                </a>
                <a href="https://apps.suryaraj.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-highlight px-5 py-3 transition hover:opacity-90 glow-primary">
                  <Globe className="h-5 w-5 text-primary-foreground" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-primary-foreground">See my Apps Portfolio →</p>
                    <p className="text-[11px] text-primary-foreground/80">apps.suryaraj.com</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input value={projectSearch} onChange={(e) => setProjectSearch(e.target.value)} placeholder="Search projects by name, description, technology..." className="w-full rounded-xl border border-border bg-card pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs text-muted-foreground mr-1">Categories:</span>
              {projectCategories.map((cat) => (
                <button key={cat.key} onClick={() => setActiveCategory(cat.key)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeCategory === cat.key ? "bg-gradient-to-r from-primary to-highlight text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                  <cat.icon className="h-3 w-3" />
                  {cat.label}
                  <span className={`ml-1 rounded-full px-1.5 text-[10px] ${activeCategory === cat.key ? "bg-background/20" : "bg-muted text-muted-foreground"}`}>{cat.count}</span>
                </button>
              ))}
              <div className="ml-auto inline-flex items-center rounded-full border border-border bg-card p-1">
                <button onClick={() => setProjectView("grid")} aria-label="Grid view" className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-colors ${projectView === "grid" ? "bg-gradient-to-r from-primary to-highlight text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  <LayoutGrid className="h-3 w-3" /> Grid
                </button>
                <button onClick={() => setProjectView("list")} aria-label="List view" className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-colors ${projectView === "list" ? "bg-gradient-to-r from-primary to-highlight text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  <List className="h-3 w-3" /> List
                </button>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="text-center py-16"><p className="text-muted-foreground">No projects found matching your criteria.</p></div>
            ) : projectView === "grid" ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((project, i) => (
                  <motion.button key={project.name} type="button" onClick={() => setActiveProject(project)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group text-left rounded-xl border border-border bg-card p-5 card-hover block relative overflow-hidden w-full">
                    {project.featured && <div className="absolute top-3 right-3"><Star className="h-4 w-4 text-highlight fill-highlight" /></div>}
                    <h3 className="text-base font-semibold text-foreground font-heading mb-2 pr-6">{project.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className={`h-2.5 w-2.5 rounded-full ${project.languageColor}`} />
                        {project.language}
                      </span>
                      {project.stars > 0 && <span className="flex items-center gap-1"><Star className="h-3 w-3" />{project.stars}</span>}
                      {project.forks > 0 && <span className="flex items-center gap-1"><GitFork className="h-3 w-3" />{project.forks}</span>}
                    </div>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs text-primary">
                      View details <ExternalLink className="h-3 w-3" />
                    </span>
                  </motion.button>

                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredProjects.map((project, i) => (
                  <motion.button key={project.name} type="button" onClick={() => setActiveProject(project)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="group text-left rounded-xl border border-border bg-card p-4 card-hover flex items-center gap-4 relative w-full">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Code2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-foreground font-heading">{project.name}</h3>
                        {project.featured && <Star className="h-3.5 w-3.5 text-highlight fill-highlight" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{project.description}</p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 text-xs text-muted-foreground shrink-0">
                      <span className="flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${project.languageColor}`} />
                        {project.language}
                      </span>
                      <div className="flex items-center gap-2">
                        {project.stars > 0 && <span className="flex items-center gap-1"><Star className="h-3 w-3" />{project.stars}</span>}
                        {project.forks > 0 && <span className="flex items-center gap-1"><GitFork className="h-3 w-3" />{project.forks}</span>}
                      </div>
                    </div>
                  </motion.button>

                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <QuickActions />

      {/* Work Experience Detail Modal */}
      <DetailModal open={!!activeExp} onClose={() => setActiveExp(null)} maxWidth="max-w-2xl">
        {activeExp && (
          <div className="p-7">
            <div className="flex items-start gap-4 mb-5">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-highlight/20 flex items-center justify-center shrink-0">
                <Building className="h-7 w-7 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold font-heading text-foreground">{activeExp.company}</h2>
                <p className="text-sm text-primary mt-0.5">{activeExp.designation || activeExp.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              <div className="rounded-xl bg-secondary/40 p-3"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Type</p><p className="text-sm text-foreground font-medium mt-0.5">{activeExp.type}</p></div>
              <div className="rounded-xl bg-secondary/40 p-3"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tenure</p><p className="text-sm text-foreground font-medium mt-0.5">{activeExp.period}</p></div>
              <div className="rounded-xl bg-secondary/40 p-3 col-span-2 sm:col-span-1"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Location</p><p className="text-sm text-foreground font-medium mt-0.5">{activeExp.city ? `${activeExp.city}, ${activeExp.country}` : activeExp.location}</p></div>
            </div>

            {activeExp.summary && <p className="text-sm text-muted-foreground leading-relaxed mb-5">{activeExp.summary}</p>}

            {activeExp.responsibilities && (
              <div className="mb-5">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-primary" /> Highlights</h3>
                <ul className="space-y-2">
                  {activeExp.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-foreground"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-highlight shrink-0" /> {r}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 mb-5">
              {activeExp.skills.map((s) => <span key={s} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md">{s}</span>)}
            </div>

            {activeExp.links && activeExp.links.length > 0 && (
              <div className="pt-4 border-t border-border flex flex-wrap gap-2">
                {activeExp.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition">
                    <Link2 className="h-3 w-3" /> {l.label} <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </DetailModal>

      {/* Project Detail Modal */}
      <DetailModal open={!!activeProject} onClose={() => setActiveProject(null)} maxWidth="max-w-4xl">
        {activeProject && (
          <div className="p-7">
            <div className="flex items-start gap-4 mb-5">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-highlight/20 flex items-center justify-center shrink-0">
                <Code2 className="h-7 w-7 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold font-heading text-foreground flex items-center gap-2">
                  {activeProject.name}
                  {activeProject.featured && <Star className="h-5 w-5 text-highlight fill-highlight" />}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{activeProject.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              {activeProject.features && (
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <h3 className="text-xs uppercase tracking-wider text-primary mb-2">Features</h3>
                  <ul className="space-y-1.5">
                    {activeProject.features.map((f) => <li key={f} className="text-xs text-foreground flex items-start gap-1.5"><span className="mt-1 h-1 w-1 rounded-full bg-primary shrink-0" /> {f}</li>)}
                  </ul>
                </div>
              )}
              {activeProject.techSpecs && (
                <div className="rounded-xl border border-border bg-secondary/30 p-4">
                  <h3 className="text-xs uppercase tracking-wider text-highlight mb-2">Technical Specs</h3>
                  <ul className="space-y-1.5">
                    {activeProject.techSpecs.map((f) => <li key={f} className="text-xs text-foreground flex items-start gap-1.5"><span className="mt-1 h-1 w-1 rounded-full bg-highlight shrink-0" /> {f}</li>)}
                  </ul>
                </div>
              )}
            </div>

            {activeProject.implementation && (
              <div className="mb-5">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Implementation</h3>
                <p className="text-sm text-foreground/90 leading-relaxed">{activeProject.implementation}</p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              {activeProject.technologies && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.technologies.map((t) => <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md font-mono">{t}</span>)}
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.topics.map((t) => <span key={t} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md">{t}</span>)}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex flex-wrap gap-2">
              <a href={activeProject.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-foreground bg-secondary hover:bg-secondary/80 px-3 py-2 rounded-lg transition">
                <GitFork className="h-3 w-3" /> View Project <ExternalLink className="h-3 w-3" />
              </a>
              {activeProject.demo && (
                <a href={activeProject.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground bg-gradient-to-r from-primary to-highlight hover:opacity-90 px-3 py-2 rounded-lg transition">
                  <Globe className="h-3 w-3" /> Live Demo <ExternalLink className="h-3 w-3" />
                </a>
              )}
              <span className="ml-auto text-xs text-muted-foreground flex items-center gap-3">
                {activeProject.stars > 0 && <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {activeProject.stars}</span>}
                {activeProject.forks > 0 && <span className="flex items-center gap-1"><GitFork className="h-3 w-3" /> {activeProject.forks}</span>}
              </span>
            </div>
          </div>
        )}
      </DetailModal>
    </div>

  );
}
