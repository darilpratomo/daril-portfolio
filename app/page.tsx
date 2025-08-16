"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Menu,
  X,
  ArrowRight,
  Rocket,
  Sparkles,
  Send,
  Languages,
  Newspaper,
  Globe,
  Briefcase,
  Cpu,
  Wind,
  Code2,
  Server,
  Database,
  Boxes,
  Film,
  Layers,
  Terminal,
  Command,
  ClipboardCopy,
  Check,
  GitBranch,
  Keyboard,
  Search,
} from "lucide-react";

// =============================================================
// MODERN DEV PORTFOLIO — Glassmorphism + Soft Aurora (Responsive)
// - Programmer vibe (cmd palette, code blocks)
// - Tanpa typing effect (nama statis, no layout shift)
// - Timeline + reveal-on-scroll
// - Mobile-first + responsive fixes across iPhone/Android/tablet/desktop
// =============================================================

// ========= CONFIG =========
const EMAIL_TO = "darilprtmsr@gmail.com"; // fallback mailto target
const FORMSPREE_ENDPOINT = ""; // isi jika pakai Formspree: "https://formspree.io/f/xxxxxx"

// ========= TYPES =========
interface Social {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}
interface Experience {
  company: string;
  role: string;
  period: string;
  points: string[];
}
interface Project {
  title: string;
  desc: string;
  tags: string[];
  link: string;
  repo: string;
}
interface Testimonial {
  name: string;
  role: string;
  quote: string;
}
interface PostItem {
  slug: string;
  title_id: string;
  title_en: string;
  date: string;
  tags: string[];
  excerpt_id: string;
  excerpt_en: string;
}
interface DataShape {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  socials: Social[];
  skills: string[];
  experience: Experience[];
  projects: Project[];
  testimonials: Testimonial[];
  posts: PostItem[];
}

// ========= DUMMY DATA =========
const DATA: DataShape = {
  name: "Daril Pratomo Sriramdanu",
  role: "Software Engineer & Web Developer",
  tagline: "Menulis kode bersih, scalable, dan berperforma tinggi.",
  location: "Jakarta, Indonesia",
  email: "kamu@example.com",
  phone: "+62 812-3456-7890",
  socials: [
    { label: "GitHub", href: "https://github.com/username", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com/in/username", icon: Linkedin },
    { label: "Email", href: "mailto:kamu@example.com", icon: Mail },
  ],
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Framer Motion",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "GraphQL",
    "Docker",
    "AWS",
  ],
  experience: [
    {
      company: "PT. Hyper Kreatif",
      role: "Senior Frontend Engineer",
      period: "2023 — Sekarang",
      points: [
        "Leading design system berbasis Tailwind.",
        "Optimasi Web Vitals (LCP/CLS) hingga 40%.",
        "Membangun komponen reusable + Storybook.",
      ],
    },
    {
      company: "Tech Nusantara",
      role: "Frontend Engineer",
      period: "2021 — 2023",
      points: [
        "Realtime dashboard (WebSocket).",
        "CI/CD GitHub Actions + Docker.",
        "Eksperimen UX A/B berkelanjutan.",
      ],
    },
  ],
  projects: [
    {
      title: "Aurora Analytics",
      desc: "Analitik modern: interactive charts & minimal ETL.",
      tags: ["Next.js", "PostgreSQL", "Recharts"],
      link: "https://example.com",
      repo: "https://github.com/username/aurora",
    },
    {
      title: "Nimbus UI Kit",
      desc: "UI components reusable (Tailwind + Radix).",
      tags: ["Tailwind", "Radix"],
      link: "https://example.com",
      repo: "https://github.com/username/nimbus",
    },
    {
      title: "Atlas CMS",
      desc: "Headless CMS: GraphQL API + Markdown editor.",
      tags: ["GraphQL", "TypeScript"],
      link: "https://example.com",
      repo: "https://github.com/username/atlas-cms",
    },
  ],
  testimonials: [
    {
      name: "Andi Pratama",
      role: "Head of Product, Tech Nusantara",
      quote: "Kualitas eksekusi dan detail UI di atas rata-rata.",
    },
    {
      name: "Bunga Sari",
      role: "Design Lead, PT. Hyper Kreatif",
      quote: "Desain kompleks jadi interaksi yang natural.",
    },
  ],
  posts: [
    {
      slug: "mendesain-ux-cepat",
      title_id: "Mendesain UX yang Cepat & Elegan",
      title_en: "Designing Fast, Elegant UX",
      date: "2025-06-21",
      tags: ["UX", "Performance"],
      excerpt_id: "Prinsip sederhana menurunkan beban kognitif & meningkatkan LCP.",
      excerpt_en: "Simple principles to lower cognitive load & improve LCP.",
    },
    {
      slug: "nextjs-streaming",
      title_id: "Streaming UI di Next.js",
      title_en: "UI Streaming in Next.js",
      date: "2025-05-05",
      tags: ["Next.js", "React"],
      excerpt_id: "Membagi payload & perceived performance.",
      excerpt_en: "Split payload & perceived performance.",
    },
    {
      slug: "framer-motion-recipes",
      title_id: "Resep Animasi Framer Motion",
      title_en: "Framer Motion Animation Recipes",
      date: "2025-03-18",
      tags: ["Animation", "Framer Motion"],
      excerpt_id: "Pola animasi reusable.",
      excerpt_en: "Reusable animation patterns.",
    },
  ],
};

// ========= i18n =========
const i18n = {
  id: {
    nav: {
      about: "Tentang",
      experience: "Pengalaman",
      projects: "Proyek",
      blog: "Blog",
      skills: "Keahlian",
      testimonials: "Testimoni",
      contact: "Kontak",
    },
    available: "Tersedia untuk freelance & remote",
    preview: "Jalankan perintah di bawah untuk mulai ✨",
    seeProjects: "Lihat Proyek",
    contactMe: "Hubungi Saya",
    aboutTitle: "Tentang Saya",
    aboutSub: "Ringkasan singkat, fokus pada hal teknis & dampak.",
    expTitle: "Pengalaman",
    expSub: "Perjalanan profesional & tanggung jawab.",
    projTitle: "Proyek Terpilih",
    projSub: "Beberapa karya yang paling relevan.",
    blogTitle: "Blog",
    blogSub: "Catatan teknis ringkas.",
    skillsTitle: "Keahlian",
    skillsSub: "Tooling & teknologi yang sering dipakai.",
    testiTitle: "Testimoni",
    testiSub: "Apa kata rekan & klien.",
    contactTitle: "Kontak",
    contactSub: "Kirim email atau DM untuk kolaborasi.",
    sendMsg: "Kirim Pesan",
    form: {
      name: "Nama",
      email: "Email",
      message: "Pesan",
      send: "Kirim",
      sending: "Mengirim...",
      sent: "Terkirim!",
    },
    info: "Informasi",
    collab: "Preferensi Kolaborasi",
    footer: (y: number, name: string) => `© ${y} ${name}. Built for the web.`,
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      blog: "Blog",
      skills: "Skills",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    available: "Available for freelance & remote",
    preview: "Run the command below to get started ✨",
    seeProjects: "See Projects",
    contactMe: "Contact Me",
    aboutTitle: "About Me",
    aboutSub: "Short summary, focused on tech & impact.",
    expTitle: "Experience",
    expSub: "Professional journey & responsibilities.",
    projTitle: "Selected Projects",
    projSub: "Work I'm most proud of.",
    blogTitle: "Blog",
    blogSub: "Concise technical notes.",
    skillsTitle: "Skills",
    skillsSub: "Tooling & technologies I use often.",
    testiTitle: "Testimonials",
    testiSub: "What colleagues & clients say.",
    contactTitle: "Contact",
    contactSub: "Email or DM for collaboration.",
    sendMsg: "Send a Message",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      sending: "Sending...",
      sent: "Sent!",
    },
    info: "Information",
    collab: "Collaboration Preferences",
    footer: (y: number, name: string) => `© ${y} ${name}. Built for the web.`,
  },
} as const;

// ========= HELPERS =========
const SKILL_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  react: Sparkles,
  "next.js": Layers,
  nextjs: Layers,
  typescript: Code2,
  tailwind: Wind,
  tailwindcss: Wind,
  "framer motion": Film,
  node: Server,
  "node.js": Server,
  nodejs: Server,
  postgresql: Database,
  prisma: Boxes,
  graphql: Globe,
  docker: Boxes,
  aws: Cpu,
};
function getSkillIcon(name: string) {
  return SKILL_ICON[name.toLowerCase()] || Cpu;
}

// ========= THEME (DEFAULT DARK) =========
function useThemeDefaultDark() {
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved ? saved === "dark" : prefersDark || true;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, []);
}

// ========= GLOBAL AURORA + NOISE =========
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>`;
const NOISE_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

const GlobalFX: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
  >
    <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_20%_20%,rgba(99,102,241,0.22),transparent),radial-gradient(60%_40%_at_80%_30%,rgba(236,72,153,0.22),transparent),radial-gradient(60%_40%_at_40%_80%,rgba(16,185,129,0.18),transparent)] dark:bg-[radial-gradient(60%_40%_at_20%_20%,rgba(99,102,241,0.16),transparent),radial-gradient(60%_40%_at_80%_30%,rgba(236,72,153,0.16),transparent),radial-gradient(60%_40%_at_40%_80%,rgba(16,185,129,0.14),transparent)]" />
    <div className="absolute left-1/2 top-1/3 h-[140px] w-[1100px] -translate-x-1/2 rotate-[12deg] bg-gradient-to-r from-indigo-400/25 via-fuchsia-400/25 to-emerald-400/25 blur-3xl" />
    <div className="absolute left-1/2 top-1/2 h-[120px] w-[900px] -translate-x-1/2 -rotate-[10deg] bg-gradient-to-r from-emerald-400/20 via-sky-400/20 to-violet-400/20 blur-3xl" />
    <div
      className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
      style={{ backgroundImage: NOISE_URL }}
    />
  </div>
);

// ========= PRIMITIVES =========
const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/40 bg-white/30 px-3 py-1 text-xs text-neutral-900 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-neutral-100">
    {children}
  </span>
);

const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={`relative min-w-0 overflow-hidden rounded-2xl border border-white/40 bg-white/25 p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_10px_40px_-10px_rgba(0,0,0,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] ${className}`}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_40%)]" />
    {children}
  </div>
);

// ========= CODE BLOCK (scrollable + wrap) =========
const CodeBlock: React.FC<{ code: string; lang?: string }> = ({ code, lang }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {}
  };
  return (
    <div className="relative min-w-0 overflow-hidden rounded-xl border border-white/40 bg-white/10 p-3 font-mono text-[13px] leading-relaxed backdrop-blur sm:text-sm dark:border-white/10 dark:bg-white/[0.06]">
      <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
        {lang && (
          <span className="rounded border border-white/20 px-2 py-0.5 text-[10px] uppercase text-white/70">
            {lang}
          </span>
        )}
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 rounded border border-white/20 bg-black/20 px-2 py-1 text-[12px] text-white/80 hover:bg-white/10"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="relative -m-3 overflow-auto p-3">
        <pre className="min-w-0 whitespace-pre-wrap break-words text-white/90">{code}</pre>
      </div>
    </div>
  );
};

// ========= COMMAND PALETTE =========
const useCommandPalette = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (!e.ctrlKey && !e.metaKey && e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return { open, setOpen } as const;
};

const CmdPalette: React.FC<{
  open: boolean;
  onClose: () => void;
  onGo: (id: string) => void;
}> = ({ open, onClose, onGo }) => {
  const [q, setQ] = useState("");
  const items = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "blog", label: "Blog" },
      { id: "testimonials", label: "Testimonials" },
      { id: "contact", label: "Contact" },
    ],
    []
  );
  const filtered = items.filter((it) =>
    it.label.toLowerCase().includes(q.toLowerCase())
  );
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-auto mt-24 w-full max-w-xl px-4 sm:px-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-2 border-b border-white/10 p-2">
            <Search className="h-4 w-4 text-white/70" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type to search sections..."
              className="w-full bg-transparent p-2 text-sm text-white/90 outline-none"
            />
            <span className="hidden rounded border border-white/20 px-1.5 py-0.5 text-[10px] text-white/60 sm:inline">Esc</span>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {filtered.map((it) => (
              <button
                key={it.id}
                onClick={() => {
                  onGo(it.id);
                  onClose();
                }}
                className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm text-white/90 hover:bg-white/5"
              >
                <span>{it.label}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ))}
            {!filtered.length && (
              <div className="px-3 py-4 text-center text-xs text-white/60">
                No results
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
// ========= MINI GRAPH (SPARKLINE) =========
const Sparkline: React.FC<{ values: number[] }> = ({ values }) => {
  const max = Math.max(...values, 1);
  const pts = values
    .map((v, i) => `${(i / (values.length - 1)) * 100},${100 - (v / max) * 100}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" className="h-8 w-28">
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeWidth="4"
      />
    </svg>
  );
};


// ========= SECTION WRAPPER =========
const Section: React.FC<{
  id: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}> = ({ id, title, subtitle, children }) => (
  <section id={id} className="relative scroll-mt-24 py-14 sm:py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
              {subtitle}
            </p>
          )}
        </div>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent sm:block" />
      </div>
      {children}
    </div>
  </section>
);

// ========= MAIN =========
export default function PortfolioModernGlass() {
  const [open, setOpen] = useState(false);
  useThemeDefaultDark(); // default dark applied
  const [lang, setLang] = useState<"id" | "en">("id");
  const t = i18n[lang];
  const { open: cmdOpen, setOpen: setCmdOpen } = useCommandPalette();

  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: pageRef as any });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  // Contact
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const onSubmitContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    if (FORMSPREE_ENDPOINT) {
      try {
        setSending(true);
        setSent(false);
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
        setSending(false);
        if (res.ok) {
          setSent(true);
          form.reset();
        }
      } catch {
        setSending(false);
      }
    } else {
      const name = String(formData.get("name") || "");
      const email = String(formData.get("email") || "");
      const message = String(formData.get("message") || "");
      const subject = encodeURIComponent(`New message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}
Email: ${email}

${message}`);
      window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
    }
  };

  const NAV = [
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "projects", label: t.nav.projects },
    { id: "blog", label: t.nav.blog },
    { id: "testimonials", label: t.nav.testimonials },
    { id: "contact", label: t.nav.contact },
  ] as const;

  const installCmd = useMemo(
    () =>
      `npx create-next-app my-portfolio --ts
cd my-portfolio
npm i framer-motion lucide-react
`,
    []
  );

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-gradient-to-b from-slate-900 via-neutral-950 to-black text-neutral-100"
    >
      <GlobalFX />

      {/* Progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400"
      />

      {/* Soft blobs */}
      <motion.div
        style={{ y: y1 }}
        className="pointer-events-none fixed right-[-120px] top-20 z-0 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="pointer-events-none fixed left-[-120px] top-64 z-0 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
      />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-white/10 backdrop-blur supports-[backdrop-filter]:bg-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <button
            className="group inline-flex items-center gap-2"
            onClick={() => handleNav("home")}
          >
            <Rocket className="h-5 w-5" />
            <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-300 bg-clip-text font-semibold tracking-tight text-transparent">
              {DATA.name.split(" ")[0] || "Brand"}
            </span>
            <Sparkles className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
          </button>

          <div className="hidden items-center gap-2 md:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => handleNav(n.id)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm backdrop-blur hover:-translate-y-0.5"
              >
                <span>{n.label}</span>
              </button>
            ))}
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm backdrop-blur"
            >
              <Download className="h-4 w-4" /> CV
            </a>
            <button
              onClick={() => setLang((l) => (l === "id" ? "en" : "id"))}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm backdrop-blur"
            >
              <Languages className="h-4 w-4" /> {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setCmdOpen(true)}
              className="rounded-full border border-white/10 bg-white/10 p-2 backdrop-blur"
              title="Command Palette (Ctrl/Cmd+K)"
            >
              <Command className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-2xl border border-white/10 bg-white/10 p-2 backdrop-blur md:hidden"
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/10 px-4 pb-4 backdrop-blur sm:px-6 md:hidden">
            <div className="flex flex-col gap-2 py-3">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleNav(n.id)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-left text-sm backdrop-blur hover:-translate-y-0.5"
                >
                  <span>{n.label}</span>
                </button>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setLang((l) => (l === "id" ? "en" : "id"))}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg白/10 px-3 py-2 text-sm backdrop-blur"
                >
                  <Languages className="h-4 w-4" /> {lang.toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* COMMAND PALETTE */}
      <CmdPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onGo={handleNav} />

      {/* HERO — Static name + glass preview */}
      <header id="home" className="relative overflow-hidden">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pb-16 pt-12 text-center sm:gap-8 sm:px-6 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20">
          <Pill>
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            {t.available}
          </Pill>

          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl bg-gradient-to-r from-indigo-200 via-white to-emerald-200 bg-clip-text text-transparent">
            {DATA.name}
          </h1>

          <p className="max-w-3xl text-pretty text-sm text-white/80 sm:text-base md:text-lg">
            {DATA.role} · {DATA.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleNav("projects");
              }}
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur transition hover:-translate-y-0.5 sm:px-5 sm:py-3"
            >
              <GitBranch className="h-4 w-4" /> {t.seeProjects}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav("contact");
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400 px-4 py-2 text-sm text-black shadow-lg transition hover:-translate-y-0.5 active:translate-y-0 sm:px-5 sm:py-3"
            >
              {t.contactMe} <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
            {DATA.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs backdrop-blur transition hover:-translate-y-0.5 sm:px-4 sm:text-sm"
              >
                {React.createElement(s.icon, { className: "h-4 w-4" })} {s.label}
              </a>
            ))}
          </div>

          {/* Glass preview — responsive grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative mt-8 w-full max-w-6xl sm:mt-10"
          >
            <GlassCard className="p-0">
              <div className="relative grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 sm:gap-6 sm:p-6">
                {/* ID Badge */}
                <div className="relative min-w-0 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur sm:p-5">
                  <div className="relative mx-auto h-16 w-16 rounded-full sm:h-20 sm:w-20">
                    <div className="absolute inset-0 rounded-full border border-white/30 bg-white/20 backdrop-blur" />
                    <div className="absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,rgba(99,102,241,0.6),rgba(236,72,153,0.6),rgba(16,185,129,0.6),rgba(99,102,241,0.6))] blur" />
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <p className="text-xs text-white/70 sm:text-sm">{DATA.location}</p>
                    <p className="truncate text-base font-semibold sm:text-lg">
                      {DATA.name}
                    </p>
                    <p className="text-xs text-white/80 sm:text-sm">{DATA.role}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-white/70 sm:mt-4 sm:text-xs">
                    <span>Perf</span>
                    <Sparkline values={[2, 5, 8, 7, 9, 12, 11, 14, 16, 20]} />
                    <span>DX</span>
                  </div>
                </div>

                {/* Terminal snippet */}
                <div className="min-w-0 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur sm:p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] text-white/70 sm:text-xs">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-0 inline-flex items-center gap-1 sm:ml-2">
                      <Terminal className="h-3.5 w-3.5" /> dev@portfolio — zsh
                    </span>
                  </div>
                  <CodeBlock
                    lang="bash"
                    code={`# quick start
${installCmd}$ echo "hello, i'm ${DATA.name}"
$ printf "stack: %s\n" "React/Next/TS/Tailwind/Node"`}
                  />
                </div>
              </div>
            </GlassCard>

          </motion.div>
        </div>
      </header>

      {/* ABOUT */}
      <Section id="about" title={t.aboutTitle} subtitle={t.aboutSub}>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-[1.15fr_1fr]">
          <div className="text-white/85">
            <p className="leading-relaxed">
              Saya fokus pada arsitektur front‑end, aksesibilitas, dan performa.
              Passion pada DX, tooling, dan automasi pipeline.
            </p>
            <p className="mt-4 leading-relaxed">
              Suka menulis utilitas kecil, mengeksplorasi pattern React modern,
              dan mendorong best practices (lint/format/test).
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {DATA.skills.map((s) => {
                const Icon = getSkillIcon(s);
                return (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur"
                  >
                    <Icon className="h-3.5 w-3.5" /> {s}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <GlassCard>
              <h3 className="text-sm font-semibold">Core Stack</h3>
              <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-white/80 sm:grid-cols-2 sm:gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  React / Next.js
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  TypeScript / Node
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  Tailwind / Motion
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  Postgres / Prisma
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <h3 className="text-sm font-semibold">Contact</h3>
              <div className="mt-3 grid gap-2 text-sm">
                <div className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" /> {DATA.email}
                </div>
                <div className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" /> {DATA.phone}
                </div>
                <div className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {DATA.location}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* EXPERIENCE — responsive timeline */}
      <Section id="experience" title={t.expTitle} subtitle={t.expSub}>
        <div className="relative mx-auto w-full max-w-5xl">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-3 top-4 hidden h-full w-[2px] rounded bg-gradient-to-b from-indigo-400/70 via-fuchsia-400/70 to-emerald-400/70 sm:block sm:left-[14px]"
          />

          <div className="space-y-5 pl-0 sm:space-y-6 sm:pl-10">
            {DATA.experience.map((exp, idx) => (
              <motion.div
                key={`${exp.company}-${idx}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.08 }}
                className="relative"
              >
                {/* dot */}
                <div className="absolute -left-10 top-6 hidden grid h-6 w-6 place-items-center sm:-left-10 sm:grid">
                  <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.15)]" />
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur sm:p-5">
                  <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="inline-flex items-center gap-2 text-base font-semibold sm:text-lg">
                        <Briefcase className="h-4 w-4" /> {exp.role}
                      </h3>
                      <p className="mt-0.5 text-sm text-white/80">{exp.company}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/20 bg-black/20 md:bg-white/10 px-3 py-1 text-xs text-white/90">
                      {exp.period}
                    </span>

                  </div>
                  <ul className="mt-3 list-inside space-y-2 text-sm text-white/85 sm:mt-4">
                    {exp.points.map((p) => (
                      <li key={p}>• {p}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title={t.projTitle} subtitle={t.projSub}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DATA.projects.map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <GlassCard className="h-full">
                <div className="flex h-full min-w-0 flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <div className="absolute inset-0 before:absolute before:left-[-30%] before:top-0 before:h-full before:w-1/3 before:skew-x-12 before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:blur-xl before:content-[''] before:transition-all before:duration-700 group-hover:before:left-[130%]" />
                    <div className="absolute inset-0 grid place-items-center text-white/80">
                      Thumbnail
                    </div>
                  </div>
                  <h3 className="mt-4 line-clamp-1 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 line-clamp-3 text-sm text-white/85">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((tg) => (
                      <span
                        key={tg}
                        className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-xs backdrop-blur"
                      >
                        <Layers className="h-3.5 w-3.5" /> {tg}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={p.link}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sm underline-offset-2 hover:underline"
                    >
                      Live <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={p.repo}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sm underline-offset-2 hover:underline"
                    >
                      Repo <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* BLOG */}
      <Section id="blog" title={t.blogTitle} subtitle={t.blogSub}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DATA.posts.map((post) => (
            <GlassCard key={post.slug}>
              <div className="flex items-center gap-2 text-xs text-white/80">
                <Newspaper className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString(
                  lang === "id" ? "id-ID" : "en-US",
                  { year: "numeric", month: "short", day: "2-digit" }
                )}
              </div>
              <h3 className="mt-2 line-clamp-2 text-lg font-semibold">
                {lang === "id" ? post.title_id : post.title_en}
              </h3>
              <p className="mt-1 line-clamp-3 text-sm text-white/85">
                {lang === "id" ? post.excerpt_id : post.excerpt_en}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tg) => (
                  <span
                    key={tg}
                    className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-xs backdrop-blur"
                  >
                    #{tg}
                  </span>
                ))}
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-indigo-200">
                <Globe className="h-4 w-4" /> {lang.toUpperCase()}
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="testimonials" title={t.testiTitle} subtitle={t.testiSub}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DATA.testimonials.map((ts) => (
            <GlassCard key={ts.name}>
              <p className="text-balance text-lg leading-relaxed">
                “{ts.quote}”
              </p>
              <p className="mt-3 text-sm text-white/85">
                — {ts.name}, {ts.role}
              </p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title={t.contactTitle} subtitle={t.contactSub}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GlassCard>
            <h3 className="text-lg font-semibold">{t.sendMsg}</h3>
            <form className="mt-4 grid gap-3" onSubmit={onSubmitContact}>
              <input
                name="name"
                placeholder={t.form.name}
                required
                className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 backdrop-blur outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                name="email"
                placeholder={t.form.email}
                type="email"
                required
                className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 backdrop-blur outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                name="message"
                placeholder={t.form.message}
                rows={4}
                required
                className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-400 px-5 py-3 text-black shadow-lg transition hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
              >
                <Send className="h-4 w-4" /> {sending ? t.form.sending : sent ? t.form.sent : t.form.send}
              </button>
            </form>
          </GlassCard>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <GlassCard>
              <h3 className="text-lg font-semibold">{t.info}</h3>
              <div className="mt-3 grid gap-2 text-sm">
                <div className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" /> {DATA.email}
                </div>
                <div className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" /> {DATA.phone}
                </div>
                <div className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {DATA.location}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {DATA.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm backdrop-blur transition hover:-translate-y-0.5"
                  >
                    {React.createElement(s.icon, { className: "h-4 w-4" })} {s.label}
                  </a>
                ))}
              </div>
            </GlassCard>
            <GlassCard>
              <h3 className="text-lg font-semibold">{t.collab}</h3>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur">
                  Remote
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur">
                  Kontrak
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur">
                  Freelance
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur">
                  Full-time
                </span>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-white/80 sm:flex-row sm:px-6">
          <p>{i18n[lang].footer(new Date().getFullYear(), DATA.name)}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 backdrop-blur">
              <Keyboard className="h-3.5 w-3.5" /> Ctrl/Cmd + K
            </span>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNav("home");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur"
            >
              <ArrowRight className="h-4 w-4 rotate-180" /> Back to top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
