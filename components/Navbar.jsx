"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "About",    href: "/about"    },
    { label: "Work",     href: "/work"     },
    { label: "Services", href: "/services" },
    { label: "Journal",  href: "/journal"  },
    { label: "Contact",  href: "/contact"  },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Reset & base ── */
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Navbar shell ── */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      backdrop-filter 0.5s ease;
        }

        /* ── At the very top — fully transparent ── */
        .navbar.top {
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        /* ── After scrolling — dark frosted glass ── */
        .navbar.scrolled {
          background: rgba(10, 9, 8, 0.82);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          box-shadow: 0 1px 0 rgba(255,255,255,0.06),
                      0 8px 32px rgba(0,0,0,0.28);
        }

        /* ── Inner container ── */
        .navbar-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 3rem;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── Logo ── */
        .logo-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-decoration: none;
        }
        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          line-height: 1;
          white-space: nowrap;
          transition: color 0.4s ease;
        }

        /* Logo colour: dark on top, light when scrolled */
        .navbar.top .logo    { color: #ffffff; }
        .navbar.scrolled .logo { color: #f0ece4; }

        /* Animated underline rule */
        .logo-rule {
          height: 1px;
          background: linear-gradient(90deg, #c9a96e, transparent);
          width: 100%;
          transform-origin: left;
          transform: scaleX(0.35);
          opacity: 0.7;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .logo-wrap:hover .logo-rule {
          transform: scaleX(1);
          opacity: 1;
        }

        /* ── Desktop nav links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nav-links a {
          display: block;
          font-size: 0.72rem;
          font-weight: 400;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.5rem 1.1rem;
          position: relative;
          transition: color 0.25s ease;
        }

        /* Link colour states */
        .navbar.top .nav-links a     { color: rgba(255,255,255,0.75); }
        .navbar.scrolled .nav-links a { color: rgba(240,236,228,0.72); }

        .navbar.top .nav-links a:hover     { color: #ffffff; }
        .navbar.scrolled .nav-links a:hover { color: #c9a96e; }

        /* Hover underline */
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 1.1rem; right: 1.1rem;
          height: 1px;
          background: #c9a96e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-links a:hover::after { transform: scaleX(1); }

        /* ── CTA button ── */
        .nav-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.55rem 1.5rem;
          border: 1px solid;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.28s ease, color 0.28s ease, border-color 0.28s ease;
        }

        .navbar.top .nav-cta {
          color: #fff;
          border-color: rgba(255,255,255,0.45);
          background: transparent;
        }
        .navbar.top .nav-cta:hover {
          background: #ffffff;
          color: #0a0908;
          border-color: #ffffff;
        }

        .navbar.scrolled .nav-cta {
          color: #c9a96e;
          border-color: rgba(201,169,110,0.5);
          background: transparent;
        }
        .navbar.scrolled .nav-cta:hover {
          background: #c9a96e;
          color: #0a0908;
          border-color: #c9a96e;
        }

        /* ── Right group ── */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        /* ── Hamburger ── */
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          padding: 4px;
          width: 32px; height: 32px;
        }
        .hamburger span {
          display: block;
          width: 22px; height: 1px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .navbar.top .hamburger span     { background: #fff; }
        .navbar.scrolled .hamburger span { background: #f0ece4; }

        /* ── Mobile menu ── */
        .mobile-menu {
          position: fixed;
          top: 76px; left: 0; right: 0;
          background: rgba(10, 9, 8, 0.96);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 1.5rem 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 0;
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.38s ease;
          font-family: 'DM Sans', sans-serif;
          z-index: 999;
        }
        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .mobile-menu a {
          color: rgba(240,236,228,0.72);
          text-decoration: none;
          font-size: 0.72rem;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transition: color 0.2s;
        }
        .mobile-menu a:hover { color: #c9a96e; }
        .mobile-menu .mobile-cta {
          margin-top: 1.8rem;
          align-self: flex-start;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a96e;
          border: 1px solid rgba(201,169,110,0.5);
          padding: 0.65rem 1.5rem;
          text-decoration: none;
          transition: background 0.25s, color 0.25s, border-color 0.25s;
        }
        .mobile-menu .mobile-cta:hover {
          background: #c9a96e;
          color: #0a0908;
          border-color: #c9a96e;
        }

        /* ── Thin gold accent line at very top ── */
        .navbar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9a96e 40%, #c9a96e 60%, transparent);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .navbar.scrolled::before { opacity: 0.6; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
        }
        @media (max-width: 480px) {
          .navbar-inner { padding: 0 1.5rem; }
          .mobile-menu  { padding: 1.25rem 1.5rem 2rem; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? "scrolled" : "top"}`}>
        <div className="navbar-inner">

          {/* Logo */}
         <Link href="/intro/ajay" className="logo-wrap">
            <span className="logo">Ajay Kumar Thakur</span>
            <div className="logo-rule" />
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          {/* Right: CTA + hamburger */}
          <div className="nav-right">
            <Link href="/contact" className="nav-cta">Hire Me</Link>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>
          Hire Me
        </Link>
      </div>
    </>
  );
}