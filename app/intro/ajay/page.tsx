"use client";

import { useState, useEffect, useRef, CSSProperties, ReactNode } from "react";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface NavLink {
  label: string;
  href: string;
  sectionId: string;
}

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  points: string[];
}

interface Project {
  title: string;
  tag: string;
  color: string;
  desc: string;
  highlights: string[];
  icon: string;
}

type SkillCategory = "Backend" | "Frontend" | "Database" | "DevOps";

interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
}

interface SectionProps {
  id: string;
  children: ReactNode;
  style?: CSSProperties;
}

interface SkillBarProps {
  name: string;
  level: number;
  category: SkillCategory;
  delay: number;
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const NAV_LINKS: NavLink[] = [
  { label: "About",    href: "#about",    sectionId: "about"    },
  { label: "Work",     href: "#work",     sectionId: "experience" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Skills",   href: "#skills",   sectionId: "skills"   },
  { label: "Contact",  href: "#contact",  sectionId: "contact"  },
];

const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Laravel Developer",
    company: "Full-Time · 2 Years",
    period: "2024 – Present",
    points: [
      "Architected and shipped 6+ production-grade web applications using Laravel 9/10, MySQL, and REST APIs.",
      "Led backend development for multi-tenant SaaS CRM — onboarded 3 enterprise clients within launch quarter.",
      "Reduced average API response time by 40% through query optimisation and Redis caching.",
      "Mentored junior developers on MVC patterns, Eloquent ORM, and Git workflows.",
      "Integrated third-party payment gateways (Razorpay, Stripe) and SMS / email services.",
    ],
  },
];

const PROJECTS: Project[] = [
  {
    title: "Car Rental Management System",
    tag: "Laravel · MySQL · Bootstrap",
    color: "#c9a96e",
    desc: "End-to-end vehicle hire platform with fleet management, booking engine, driver allocation, invoice generation, and real-time availability calendar.",
    highlights: ["Fleet & driver management", "Booking + invoice engine", "Real-time calendar", "Admin analytics dashboard"],
    icon: "🚗",
  },
  {
    title: "WRI CRM",
    tag: "Laravel · Vue.js · REST API",
    color: "#7eb8c9",
    desc: "Custom CRM for WRI's sales pipeline — lead tracking, follow-up automation, role-based access control, and detailed conversion reporting.",
    highlights: ["Lead pipeline & tracking", "Follow-up automation", "RBAC permissions", "Conversion reports"],
    icon: "📊",
  },
  {
    title: "Sai Krishna Platform",
    tag: "Laravel · Livewire · MySQL",
    color: "#c97e7e",
    desc: "Business management portal for Sai Krishna enterprise — purchase orders, inventory tracking, billing, and multi-branch reporting.",
    highlights: ["Inventory & PO tracking", "Multi-branch billing", "PDF report generation", "Vendor management"],
    icon: "🏢",
  },
  {
    title: "Employee Attendance System",
    tag: "Laravel · API · Charts",
    color: "#8ec97e",
    desc: "Automated attendance & payroll system with biometric-style check-in, leave requests, shift management, and monthly salary computation.",
    highlights: ["Biometric check-in API", "Leave request workflow", "Shift scheduling", "Payroll computation"],
    icon: "🕐",
  },
  {
    title: "E-Commerce Portal",
    tag: "Laravel · Stripe · Admin Panel",
    color: "#c9a96e",
    desc: "Full-featured online store with product catalogue, cart, Stripe checkout, order tracking, coupon engine, and vendor dashboard.",
    highlights: ["Stripe payment gateway", "Coupon & discount engine", "Order tracking", "Vendor dashboard"],
    icon: "🛍️",
  },
  {
    title: "School Management System",
    tag: "Laravel · MySQL · Bootstrap",
    color: "#a97ec9",
    desc: "Academic ERP for schools — student enrolment, fee management, timetable builder, exam results, and parent-teacher communication portal.",
    highlights: ["Student & fee management", "Timetable builder", "Exam result portal", "Parent communication"],
    icon: "🎓",
  },
];

const SKILLS: Skill[] = [
  { name: "Laravel",              level: 92, category: "Backend"  },
  { name: "PHP",                  level: 88, category: "Backend"  },
  { name: "MySQL / Query Opt.",   level: 85, category: "Database" },
  { name: "REST API Design",      level: 90, category: "Backend"  },
  { name: "Vue.js / Livewire",    level: 72, category: "Frontend" },
  { name: "JavaScript",           level: 70, category: "Frontend" },
  { name: "Bootstrap / Tailwind", level: 80, category: "Frontend" },
  { name: "Git & GitHub",         level: 85, category: "DevOps"   },
  
];

/* ─────────────────────────────────────────
   SMOOTH SCROLL HELPER
───────────────────────────────────────── */
function scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    const offset = 76; // navbar height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ["hero", "about", "experience", "projects", "skills", "contact"];
      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (sectionId: string) => {
    setMenuOpen(false);
    scrollTo(sectionId);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : "top"}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <button className="logo-wrap" onClick={() => scrollTo("hero")}>
            <span className="logo">Ajay Kumar Thakur</span>
            <div className="logo-rule" />
          </button>

          {/* Desktop links */}
          <ul className="nav-links">
            {NAV_LINKS.map((l) => {
              const isActive =
                l.sectionId === activeSection ||
                (l.sectionId === "experience" && activeSection === "experience");
              return (
                <li key={l.label}>
                  <button
                    className={`nav-link-btn ${isActive ? "active" : ""}`}
                    onClick={() => handleNav(l.sectionId)}
                  >
                    {l.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="nav-right">
            <button className="nav-cta" onClick={() => handleNav("contact")}>
              Hire Me
            </button>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <button
            key={l.label}
            className="mobile-link"
            onClick={() => handleNav(l.sectionId)}
          >
            {l.label}
          </button>
        ))}
        <button className="mobile-cta" onClick={() => handleNav("contact")}>
          Hire Me
        </button>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   SECTION WRAPPER (fade-in on scroll)
───────────────────────────────────────── */
function Section({ id, children, style }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

/* ─────────────────────────────────────────
   SKILL BAR
───────────────────────────────────────── */
function SkillBar({ name, level, category, delay }: SkillBarProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setAnimated(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  const catColor: Record<SkillCategory, string> = {
    Backend:  "#c9a96e",
    Frontend: "#7eb8c9",
    Database: "#c97e7e",
    DevOps:   "#8ec97e",
  };

  const color = catColor[category];

  return (
    <div ref={ref} style={{ marginBottom: "1.6rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", alignItems: "center" }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "#f0ece4", letterSpacing: "0.04em" }}>
          {name}
        </span>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color, letterSpacing: "0.1em", background: `${color}14`, padding: "0.15rem 0.55rem", border: `1px solid ${color}30` }}>
          {category} · {level}%
        </span>
      </div>
      <div style={{ height: "2px", background: "rgba(255,255,255,0.07)", borderRadius: "1px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: animated ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}55, ${color})`,
            borderRadius: "1px",
            transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: `0 0 8px ${color}44`,
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN APP
───────────────────────────────────────── */
export default function Portfolio() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: auto; }
        body {
          background: #080706;
          color: #c8c2b8;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.6;
          overflow-x: hidden;
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080706; }
        ::-webkit-scrollbar-thumb { background: #c9a96e44; border-radius: 2px; }

        /* ── Navbar ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.5s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.5s cubic-bezier(0.16,1,0.3,1),
                      backdrop-filter 0.5s ease;
        }
        .navbar.top { background: transparent; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; }
        .navbar.scrolled {
          background: rgba(8,7,6,0.9);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 0 1px 0 rgba(255,255,255,0.05), 0 8px 40px rgba(0,0,0,0.4);
        }
        .navbar::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, #c9a96e44 30%, #c9a96e44 70%, transparent 100%);
          opacity: 0; transition: opacity 0.5s ease;
        }
        .navbar.scrolled::after { opacity: 1; }

        .navbar-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 3rem; height: 76px;
          display: flex; align-items: center; justify-content: space-between;
        }

        /* Logo */
        .logo-wrap {
          display: flex; flex-direction: column; gap: 5px;
          text-decoration: none; background: none; border: none; cursor: pointer;
          padding: 0; text-align: left;
        }
        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 500;
          letter-spacing: 0.05em; line-height: 1;
          white-space: nowrap; transition: color 0.3s ease;
        }
        .navbar.top .logo { color: #ffffff; }
        .navbar.scrolled .logo { color: #f0ece4; }
        .logo-rule {
          height: 1px;
          background: linear-gradient(90deg, #c9a96e, transparent);
          width: 100%; transform-origin: left;
          transform: scaleX(0.3); opacity: 0.6;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .logo-wrap:hover .logo-rule { transform: scaleX(1); opacity: 1; }

        /* Nav links */
        .nav-links { display: flex; align-items: center; gap: 0; list-style: none; }
        .nav-link-btn {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem; font-weight: 400;
          letter-spacing: 0.18em; text-transform: uppercase;
          background: none; border: none; cursor: pointer;
          padding: 0.55rem 1.1rem; position: relative;
          transition: color 0.25s ease;
        }
        .navbar.top .nav-link-btn { color: rgba(255,255,255,0.72); }
        .navbar.scrolled .nav-link-btn { color: rgba(240,236,228,0.65); }
        .navbar.top .nav-link-btn:hover,
        .navbar.top .nav-link-btn.active { color: #ffffff; }
        .navbar.scrolled .nav-link-btn:hover,
        .navbar.scrolled .nav-link-btn.active { color: #c9a96e; }
        .nav-link-btn::after {
          content: ''; position: absolute;
          bottom: 4px; left: 1.1rem; right: 1.1rem;
          height: 1px; background: #c9a96e;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link-btn:hover::after,
        .nav-link-btn.active::after { transform: scaleX(1); }

        /* CTA */
        .nav-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          background: none; border: 1px solid; cursor: pointer;
          padding: 0.5rem 1.4rem; white-space: nowrap;
          transition: background 0.28s ease, color 0.28s ease, border-color 0.28s ease;
        }
        .navbar.top .nav-cta { color: #fff; border-color: rgba(255,255,255,0.4); background: transparent; }
        .navbar.top .nav-cta:hover { background: #ffffff; color: #080706; border-color: #ffffff; }
        .navbar.scrolled .nav-cta { color: #c9a96e; border-color: rgba(201,169,110,0.45); background: transparent; }
        .navbar.scrolled .nav-cta:hover { background: #c9a96e; color: #080706; border-color: #c9a96e; }

        .nav-right { display: flex; align-items: center; gap: 1.2rem; }

        /* Hamburger */
        .hamburger {
          display: none; background: none; border: none; cursor: pointer;
          flex-direction: column; justify-content: center;
          gap: 5px; padding: 4px; width: 34px; height: 34px;
        }
        .hamburger span {
          display: block; width: 22px; height: 1px;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .navbar.top .hamburger span { background: #fff; }
        .navbar.scrolled .hamburger span { background: #f0ece4; }

        /* Mobile menu */
        .mobile-menu {
          position: fixed; top: 76px; left: 0; right: 0;
          background: rgba(8,7,6,0.97);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 1.5rem 2rem 2.5rem;
          display: flex; flex-direction: column; gap: 0;
          transform: translateY(-12px); opacity: 0; pointer-events: none;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease;
          z-index: 999;
        }
        .mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: all; }
        .mobile-link {
          background: none; border: none; border-bottom: 1px solid rgba(255,255,255,0.06);
          font-family: 'DM Sans', sans-serif;
          color: rgba(240,236,228,0.65); text-align: left; cursor: pointer;
          font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 1.1rem 0; transition: color 0.2s;
        }
        .mobile-link:hover { color: #c9a96e; }
        .mobile-cta {
          margin-top: 2rem; align-self: flex-start;
          background: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem; font-weight: 500; letter-spacing: 0.22em;
          text-transform: uppercase; color: #c9a96e;
          border: 1px solid rgba(201,169,110,0.45);
          padding: 0.6rem 1.4rem;
          transition: background 0.25s, color 0.25s, border-color 0.25s;
        }
        .mobile-cta:hover { background: #c9a96e; color: #080706; border-color: #c9a96e; }

        /* ── Layout ── */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 3rem; }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.65rem; font-weight: 400;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #c9a96e; display: flex; align-items: center; gap: 1rem;
          margin-bottom: 1rem;
        }
        .section-label::before {
          content: ''; display: block; width: 28px; height: 1px;
          background: linear-gradient(90deg, transparent, #c9a96e);
          flex-shrink: 0;
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 4.5vw, 3.2rem);
          font-weight: 300; color: #f0ece4;
          line-height: 1.12; letter-spacing: -0.01em; margin-bottom: 3.5rem;
        }
        .section-title em { font-style: italic; color: #c9a96e; }

        .divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg,
            transparent,
            rgba(201,169,110,0.18) 30%,
            rgba(201,169,110,0.18) 70%,
            transparent);
        }

        /* ── Hero ── */
        #hero {
          min-height: 100vh; display: flex; align-items: center;
          position: relative; overflow: hidden; padding-top: 76px;
        }
        .hero-bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 65% 75% at 80% 50%, rgba(201,169,110,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 45% 45% at 8% 80%, rgba(126,184,201,0.04) 0%, transparent 55%),
            radial-gradient(ellipse 30% 50% at 50% 10%, rgba(169,126,201,0.03) 0%, transparent 50%);
        }
        .hero-grid-overlay {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 70%);
        }

        .hero-content { position: relative; z-index: 1; max-width: 680px; }

        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem; font-weight: 400;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #c9a96e; display: flex; align-items: center; gap: 1rem;
          margin-bottom: 2rem;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        .hero-eyebrow::before {
          content: ''; display: block; width: 36px; height: 1px;
          background: linear-gradient(90deg, transparent, #c9a96e); flex-shrink: 0;
        }

        .hero-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.8rem, 9vw, 7.5rem);
          font-weight: 300; line-height: 0.95;
          letter-spacing: -0.025em; color: #f0ece4;
          margin-bottom: 0.5rem;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }

        .hero-role {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 3.5rem);
          font-weight: 300; font-style: italic;
          color: #c9a96e; margin-bottom: 2.5rem;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both;
        }

        .hero-desc {
          font-size: 0.93rem; font-weight: 300;
          color: rgba(200,194,184,0.75); max-width: 500px;
          line-height: 1.9; margin-bottom: 3rem;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }

        .hero-actions {
          display: flex; gap: 1.2rem; flex-wrap: wrap;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both;
        }

        .btn-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          text-decoration: none; padding: 0.85rem 2.2rem;
          background: #c9a96e; color: #080706;
          border: 1px solid #c9a96e; cursor: pointer;
          transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
          display: inline-block;
        }
        .btn-primary:hover {
          background: #b8956a; transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(201,169,110,0.25);
        }

        .btn-outline {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          text-decoration: none; padding: 0.85rem 2.2rem;
          background: transparent; color: #f0ece4;
          border: 1px solid rgba(240,236,228,0.28); cursor: pointer;
          transition: border-color 0.3s, color 0.3s, transform 0.3s;
          display: inline-block;
        }
        .btn-outline:hover { border-color: #c9a96e; color: #c9a96e; transform: translateY(-2px); }

        /* Hero stats */
        .hero-stats {
          position: absolute; right: 3rem; bottom: 12vh;
          display: flex; flex-direction: column; gap: 3rem;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both;
        }
        .stat { text-align: right; }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem; font-weight: 300;
          color: #f0ece4; line-height: 1; letter-spacing: -0.03em;
        }
        .stat-num span { color: #c9a96e; font-size: 1.8rem; }
        .stat-label {
          font-size: 0.65rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(200,194,184,0.45);
          margin-top: 0.4rem;
        }

        /* ── About ── */
        #about { padding: 9rem 0; }
        .about-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 7rem; align-items: start; }
        .about-text p {
          font-size: 0.93rem; font-weight: 300;
          color: rgba(200,194,184,0.78); line-height: 1.95; margin-bottom: 1.6rem;
        }
        .about-text p strong { color: #f0ece4; font-weight: 500; }

        .about-aside {
          border-left: 1px solid rgba(201,169,110,0.15); padding-left: 3rem;
        }
        .aside-item {
          margin-bottom: 0; padding: 1.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .aside-item:first-child { padding-top: 0; }
        .aside-item:last-child { border-bottom: none; }
        .aside-key {
          font-size: 0.62rem; letter-spacing: 0.25em;
          text-transform: uppercase; color: #c9a96e; margin-bottom: 0.45rem;
        }
        .aside-val { font-size: 0.88rem; color: #f0ece4; font-weight: 300; line-height: 1.5; }

        /* ── Experience ── */
        #experience { padding: 9rem 0; background: rgba(255,255,255,0.012); }
        .exp-card {
          border: 1px solid rgba(201,169,110,0.14);
          padding: 3.5rem; position: relative; overflow: hidden;
          transition: border-color 0.3s;
        }
        .exp-card:hover { border-color: rgba(201,169,110,0.28); }
        .exp-card::before {
          content: ''; position: absolute; top: 0; left: 0; bottom: 0;
          width: 2px; background: linear-gradient(180deg, #c9a96e, #c9a96e55, transparent);
        }
        .exp-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, #c9a96e55, transparent);
        }
        .exp-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 0.6rem; flex-wrap: wrap; gap: 1rem;
        }
        .exp-role {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem; font-weight: 400;
          color: #f0ece4; letter-spacing: -0.01em;
        }
        .exp-period {
          font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: #c9a96e; border: 1px solid rgba(201,169,110,0.28);
          padding: 0.32rem 0.9rem; white-space: nowrap; align-self: center;
        }
        .exp-company {
          font-size: 0.78rem; letter-spacing: 0.14em;
          color: rgba(200,194,184,0.45); margin-bottom: 2.2rem;
        }
        .exp-points { list-style: none; display: flex; flex-direction: column; gap: 0.9rem; }
        .exp-points li {
          display: flex; gap: 1.1rem;
          font-size: 0.9rem; font-weight: 300;
          color: rgba(200,194,184,0.78); line-height: 1.75;
        }
        .exp-points li::before {
          content: '→'; color: #c9a96e; flex-shrink: 0;
          margin-top: 0.08em; font-size: 0.82rem;
        }

        /* ── Projects ── */
        #projects { padding: 9rem 0; }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.08);
        }
        .project-card {
          border: none; padding: 2.8rem 2.5rem;
          position: relative; overflow: hidden; cursor: default;
          background: #080706;
          transition: background 0.35s;
        }
        .project-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .project-card:hover::before { transform: scaleX(1); }
        .project-card:hover { background: rgba(255,255,255,0.018); }

        .project-icon { font-size: 1.8rem; margin-bottom: 1.4rem; display: block; }
        .project-tag {
          font-size: 0.6rem; letter-spacing: 0.2em;
          text-transform: uppercase; margin-bottom: 0.9rem;
          font-family: 'DM Sans', sans-serif;
        }
        .project-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem; font-weight: 400;
          color: #f0ece4; margin-bottom: 1.1rem;
          line-height: 1.25; letter-spacing: -0.01em;
          transition: color 0.3s;
        }
        .project-card:hover .project-title { color: #fff; }
        .project-desc {
          font-size: 0.83rem; font-weight: 300;
          color: rgba(200,194,184,0.62); line-height: 1.8; margin-bottom: 1.8rem;
        }
        .project-highlights { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .highlight-pill {
          font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.25rem 0.65rem;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(200,194,184,0.45);
          transition: color 0.2s, border-color 0.2s;
        }
        .project-card:hover .highlight-pill {
          color: rgba(200,194,184,0.75); border-color: rgba(255,255,255,0.18);
        }

        /* ── Skills ── */
        #skills { padding: 9rem 0; background: rgba(255,255,255,0.012); }
        .skills-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; }

        /* ── Contact ── */
        #contact { padding: 9rem 0; }
        .contact-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 7rem; align-items: start; }
        .contact-info p {
          font-size: 0.93rem; font-weight: 300;
          color: rgba(200,194,184,0.68); line-height: 1.9; margin-bottom: 3rem;
        }
        .contact-items { display: flex; flex-direction: column; gap: 1.8rem; }
        .contact-item { display: flex; gap: 1.2rem; align-items: center; }
        .contact-icon {
          width: 42px; height: 42px;
          border: 1px solid rgba(201,169,110,0.22);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
          transition: border-color 0.3s, background 0.3s;
        }
        .contact-item:hover .contact-icon {
          border-color: rgba(201,169,110,0.5); background: rgba(201,169,110,0.06);
        }
        .contact-detail .label {
          font-size: 0.6rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: #c9a96e; margin-bottom: 0.25rem;
        }
        .contact-detail .val { font-size: 0.87rem; color: #f0ece4; font-weight: 300; }

        .contact-form { display: flex; flex-direction: column; gap: 1.4rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.55rem; }
        .form-label {
          font-size: 0.62rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(200,194,184,0.5);
        }
        .form-input {
          background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.09);
          color: #f0ece4; padding: 0.9rem 1.1rem;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
          outline: none; transition: border-color 0.25s, background 0.25s;
          font-weight: 300; width: 100%;
        }
        .form-input:focus { border-color: rgba(201,169,110,0.45); background: rgba(255,255,255,0.035); }
        .form-input::placeholder { color: rgba(200,194,184,0.25); }
        textarea.form-input { resize: vertical; min-height: 130px; }

        /* ── Footer ── */
        .footer-main {
          background: #060504;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 5rem 0 0;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
          gap: 4rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        /* Col 1 – Brand */
        .footer-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 500;
          color: #f0ece4; letter-spacing: 0.02em;
          margin-bottom: 0.5rem; line-height: 1.1;
        }
        .footer-brand-rule {
          width: 36px; height: 1px;
          background: linear-gradient(90deg, #c9a96e, transparent);
          margin-bottom: 1.2rem;
        }
        .footer-brand-desc {
          font-size: 0.83rem; font-weight: 300;
          color: rgba(200,194,184,0.52); line-height: 1.85;
          margin-bottom: 1.8rem; max-width: 240px;
        }
        .footer-socials { display: flex; gap: 0.6rem; }
        .social-btn {
          width: 34px; height: 34px;
          border: 1px solid rgba(255,255,255,0.1);
          background: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: rgba(200,194,184,0.45); font-size: 0.85rem;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
        }
        .social-btn:hover {
          border-color: rgba(201,169,110,0.5);
          color: #c9a96e; background: rgba(201,169,110,0.06);
        }

        /* Col headers */
        .footer-col-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #f0ece4; margin-bottom: 0.6rem;
        }
        .footer-col-rule {
          width: 24px; height: 1px;
          background: #c9a96e; margin-bottom: 1.5rem;
        }

        /* Nav items */
        .footer-nav-list { display: flex; flex-direction: column; gap: 0.75rem; list-style: none; }
        .footer-nav-list button {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem; font-weight: 300;
          color: rgba(200,194,184,0.5); text-align: left;
          transition: color 0.2s; padding: 0;
          letter-spacing: 0.02em;
        }
        .footer-nav-list button:hover { color: #c9a96e; }

        /* Contact col */
        .footer-contact-list { display: flex; flex-direction: column; gap: 0.9rem; list-style: none; }
        .footer-contact-list li {
          font-size: 0.83rem; font-weight: 300;
          color: rgba(200,194,184,0.55); line-height: 1.4;
          letter-spacing: 0.01em;
        }
        .footer-contact-list li a {
          color: inherit; text-decoration: none;
          transition: color 0.2s;
        }
        .footer-contact-list li a:hover { color: #c9a96e; }
        .footer-dl-btn {
          margin-top: 0.5rem;
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem; font-weight: 300;
          color: rgba(200,194,184,0.55); padding: 0; text-align: left;
          letter-spacing: 0.01em; transition: color 0.2s;
          text-decoration: underline; text-underline-offset: 3px;
          text-decoration-color: rgba(200,194,184,0.2);
        }
        .footer-dl-btn:hover { color: #c9a96e; text-decoration-color: rgba(201,169,110,0.5); }

        /* Quote strip */
        .footer-quote-strip {
          border-top: 1px solid rgba(255,255,255,0.04);
          padding: 2rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          display: flex; align-items: center; gap: 2rem;
        }
        .footer-quote-bar {
          width: 2px; height: 52px; flex-shrink: 0;
          background: linear-gradient(180deg, #c9a96e, transparent);
        }
        .footer-quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-weight: 300; font-style: italic;
          color: rgba(200,194,184,0.4); line-height: 1.6;
          letter-spacing: 0.01em;
        }

        /* Bottom bar */
        .footer-bottom {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap;
          gap: 1rem; padding: 1.4rem 0;
        }
        .footer-available {
          display: flex; align-items: center; gap: 0.9rem;
        }
        .available-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #4ade80; flex-shrink: 0;
          box-shadow: 0 0 0 2px rgba(74,222,128,0.15);
          animation: pulse-dot 2.5s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 2px rgba(74,222,128,0.15); }
          50%       { box-shadow: 0 0 0 5px rgba(74,222,128,0.06); }
        }
        .available-text {
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 400;
          color: #f0ece4;
        }
        .available-text span { font-weight: 300; color: rgba(200,194,184,0.5); }
        .footer-cta-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          background: rgba(201,169,110,0.12); color: #c9a96e;
          border: 1px solid rgba(201,169,110,0.4);
          padding: 0.55rem 1.5rem; cursor: pointer;
          transition: background 0.25s, color 0.25s, border-color 0.25s;
        }
        .footer-cta-btn:hover {
          background: #c9a96e; color: #080706; border-color: #c9a96e;
        }
        .footer-legal { display: flex; align-items: center; gap: 2rem; }
        .footer-copyright {
          font-size: 0.7rem; font-weight: 300;
          color: rgba(200,194,184,0.28); letter-spacing: 0.04em;
        }
        .footer-legal-links { display: flex; gap: 1.4rem; }
        .footer-legal-links button {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem; font-weight: 300;
          color: rgba(200,194,184,0.3); transition: color 0.2s;
          padding: 0; letter-spacing: 0.04em;
        }
        .footer-legal-links button:hover { color: #c9a96e; }

        /* Footer responsive */
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 1.2rem; }
          .footer-legal { flex-direction: column; align-items: flex-start; gap: 0.8rem; }
        }

        /* ── Animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
          .about-grid, .contact-wrap { grid-template-columns: 1fr; gap: 3.5rem; }
          .skills-layout { grid-template-columns: 1fr; gap: 0; }
          .about-aside {
            border-left: none; border-top: 1px solid rgba(201,169,110,0.15);
            padding-left: 0; padding-top: 2.5rem;
          }
          .hero-stats { display: none; }
        }
        @media (max-width: 640px) {
          .container { padding: 0 1.5rem; }
          .navbar-inner { padding: 0 1.5rem; }
          .mobile-menu { padding: 1.25rem 1.5rem 2.5rem; }
          .projects-grid { grid-template-columns: 1fr; }
          .exp-card { padding: 2rem; }
          .hero-actions { flex-direction: column; }
          .btn-primary, .btn-outline { text-align: center; }
          #about, #experience, #projects, #skills, #contact { padding: 6rem 0; }
        }
      `}</style>

      <Navbar />

      {/* ════════════ HERO ════════════ */}
      <div id="hero">
        <div className="hero-bg" />
        <div className="hero-grid-overlay" />
        <div className="container" style={{ width: "100%", position: "relative" }}>
          <div className="hero-content">
            <p className="hero-eyebrow">Laravel Developer · Backend Engineer</p>
            <h1 className="hero-name">Ajay Kumar<br />Thakur</h1>
            <p className="hero-role">Building things for the web</p>
            <p className="hero-desc">
              2 years crafting robust, scalable web applications with Laravel. From CRM
              platforms to booking engines — I turn complex requirements into clean,
              maintainable code.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollTo("projects")}>
                View Projects
              </button>
              <button className="btn-outline" onClick={() => scrollTo("contact")}>
                Get In Touch
              </button>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">6<span>+</span></div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat">
              <div className="stat-num">2<span>yr</span></div>
              <div className="stat-label">Laravel Experience</div>
            </div>
            <div className="stat">
              <div className="stat-num">3<span>+</span></div>
              <div className="stat-label">Enterprise Clients</div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ════════════ ABOUT ════════════ */}
      <Section id="about">
        <div className="container">
          <p className="section-label">About Me</p>
          <div className="about-grid">
            <div className="about-text">
              <h2 className="section-title">A developer who cares<br />about <em>craft</em></h2>
              <p>
                I&apos;m a <strong>PHP / Laravel developer</strong> with 2 years of hands-on experience
                building production web applications. I enjoy working across the full backend stack —
                from schema design and API architecture to deployment and performance tuning.
              </p>
              <p>
                My work spans CRM systems, vehicle rental platforms, school ERPs, and e-commerce portals.
                Each project has sharpened my ability to translate <strong>real-world business workflows</strong> into
                reliable, maintainable code.
              </p>
              <p>
                Outside of code, I&apos;m focused on growing into a full-stack engineer — deepening my knowledge
                of Vue.js, system design, and cloud infrastructure.
              </p>
            </div>
            <div className="about-aside">
              {[
                { key: "Location",       val: "Nepal"                          },
                { key: "Primary Stack",  val: "Laravel · PHP · MySQL"          },
                { key: "Secondary",      val: "Vue.js · Next.js "      },
                { key: "Experience",     val: "2 Years Professional"           },
                { key: "Open To",        val: "Full-Time · Office Work" },
              ].map((item) => (
                <div key={item.key} className="aside-item">
                  <div className="aside-key">{item.key}</div>
                  <div className="aside-val">{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="divider" />

      {/* ════════════ EXPERIENCE ════════════ */}
      <Section id="experience">
        <div className="container">
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I&apos;ve <em>worked</em></h2>
          {EXPERIENCE.map((exp) => (
            <div key={exp.role} className="exp-card">
              <div className="exp-header">
                <h3 className="exp-role">{exp.role}</h3>
                <span className="exp-period">{exp.period}</span>
              </div>
              <p className="exp-company">{exp.company}</p>
              <ul className="exp-points">
                {exp.points.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <div className="divider" />

      {/* ════════════ PROJECTS ════════════ */}
      <Section id="projects">
        <div className="container">
          <p className="section-label">Selected Work</p>
          <h2 className="section-title">Projects I&apos;ve <em>built</em></h2>
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="project-card"
                style={{ ["--accent" as string]: p.color }}
              >
                <style>{`
                  .project-card:hover::before { background: ${p.color}; }
                `}</style>
                <span className="project-icon">{p.icon}</span>
                <p className="project-tag" style={{ color: p.color }}>{p.tag}</p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-highlights">
                  {p.highlights.map((h) => (
                    <span key={h} className="highlight-pill">{h}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="divider" />

      {/* ════════════ SKILLS ════════════ */}
      <Section id="skills">
        <div className="container">
          <p className="section-label">Skills</p>
          <h2 className="section-title">Technologies I <em>use</em></h2>
          <div className="skills-layout">
            {[SKILLS.slice(0, 5), SKILLS.slice(5)].map((group, gi) => (
              <div key={gi}>
                {group.map((s, i) => (
                  <SkillBar key={s.name} {...s} delay={gi * 180 + i * 80} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="divider" />

      {/* ════════════ CONTACT ════════════ */}
      <Section id="contact">
        <div className="container">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let&apos;s work <em>together</em></h2>
          <div className="contact-wrap">
            <div className="contact-info">
              <p>
                I&apos;m currently open to new opportunities — whether it&apos;s a full-time role,
                a freelance project, or a long-term collaboration. Let&apos;s build something great.
              </p>
              <div className="contact-items">
                {[
                  { icon: "✉",  label: "Email",    val: "ajay.kumar.thakur@email.com"     },
                  { icon: "🔗", label: "LinkedIn",  val: "linkedin.com/in/ajay-thakur-059694196/" },
                  { icon: "💻", label: "GitHub",    val: "https://github.com/Ajay-Kumar-Thakur?tab=repositories"      },
                  { icon: "📍", label: "Location",  val: "Nepal"          },
                ].map((c) => (
                  <div key={c.label} className="contact-item">
                    <div className="contact-icon">{c.icon}</div>
                    <div className="contact-detail">
                      <div className="label">{c.label}</div>
                      <div className="val">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" type="text" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" placeholder="Tell me about your project…" />
              </div>
              <button className="btn-primary" style={{ alignSelf: "flex-start" }}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </Section>


      {/* ════════════ FOOTER ════════════ */}
      <footer className="footer-main">
        <div className="container">

          {/* ── Top grid ── */}
          <div className="footer-grid">

            {/* Col 1 — Brand */}
            <div>
              <div className="footer-brand-name">Ajay Kumar Thakur</div>
              <div className="footer-brand-rule" />
              <p className="footer-brand-desc">
                Full-Stack Developer with 2+ years of experience building scalable web applications.
                Based in Kathmandu, delivering reliable digital solutions worldwide.
              </p>
              <div className="footer-socials">
                {/* LinkedIn */}
                <button className="social-btn" aria-label="LinkedIn" onClick={() => window.open("https://www.linkedin.com/in/ajay-thakur-059694196/", "_blank")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </button>
                {/* GitHub */}
                <button className="social-btn" aria-label="GitHub" onClick={() => window.open("https://github.com/Ajay-Kumar-Thakur?tab=repositories", "_blank")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </button>
                {/* Upwork / briefcase */}
                <button className="social-btn" aria-label="Portfolio">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                  </svg>
                </button>
                {/* X / Twitter */}
                <button className="social-btn" aria-label="Twitter">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Col 2 — Navigate */}
            <div>
              <div className="footer-col-title">Navigate</div>
              <div className="footer-col-rule" />
              <ul className="footer-nav-list">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <button onClick={() => scrollTo(l.sectionId)}>{l.label}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Services */}
            <div>
              <div className="footer-col-title">Services</div>
              <div className="footer-col-rule" />
              <ul className="footer-nav-list">
                {["Web Development", "REST API Design", "CRM & ERP Systems", "Laravel Consulting", "Code Review"].map((s) => (
                  <li key={s}><button onClick={() => scrollTo("contact")}>{s}</button></li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contact */}
            <div>
              <div className="footer-col-title">Contact</div>
              <div className="footer-col-rule" />
              <ul className="footer-contact-list">
                <li>
                  <a href="mailto:ajaythakurnii1@gmail.com">ajaythakurnii1@gmail.com</a>
                </li>
                <li>9810275078</li>
                <li>Kathmandu</li>
                <li>
               
                </li>
              </ul>
            </div>

          </div>

          {/* ── Quote strip ── */}
          <div className="footer-quote-strip">
            <div className="footer-quote-bar" />
            <p className="footer-quote-text">
              &ldquo;Good design is not just how it looks — it&apos;s how it works, how it feels,
              and the problems it quietly solves.&rdquo;
            </p>
          </div>

          {/* ── Bottom bar ── */}
          <div className="footer-bottom">
            <div className="footer-available">
              <div className="available-dot" />
              <p className="available-text">
                <strong>Available for new projects</strong>
                <span> — Currently accepting freelance &amp; contract work for Q3 2025.</span>
              </p>
            </div>
            <button className="footer-cta-btn" onClick={() => scrollTo("contact")}>
              Start a Project
            </button>
            <div className="footer-legal">
              <span className="footer-copyright">
                © {new Date().getFullYear()} Ajay Kumar Thakur. All rights reserved.
              </span>
              <div className="footer-legal-links">
                <button>Privacy</button>
                <button>Colophon</button>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}