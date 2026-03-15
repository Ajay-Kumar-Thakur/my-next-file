"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap');

        .footer {
          background: #1a1714;
          color: rgba(255,255,255,0.55);
          font-family: 'Jost', sans-serif;
        }

        /* Top section */
        .footer-top {
          max-width: 1280px;
          margin: 0 auto;
          padding: 5rem 3rem 4.5rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        /* Brand column */
        .footer-brand .logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 400;
          color: #fff;
          text-decoration: none;
          letter-spacing: 0.03em;
          display: inline-block;
          margin-bottom: 0.5rem;
        }
        .footer-brand .logo-rule {
          height: 1px;
          width: 48px;
          background: #b5a48a;
          margin-bottom: 1.5rem;
        }
        .footer-brand p {
          font-size: 0.82rem;
          line-height: 1.85;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          max-width: 270px;
          margin-bottom: 2rem;
        }

        /* Social row */
        .social-links {
          display: flex;
          gap: 0.6rem;
        }
        .social-btn {
          width: 34px; height: 34px;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: all 0.25s;
        }
        .social-btn:hover {
          border-color: #b5a48a;
          color: #b5a48a;
        }

        /* Column headers */
        .footer-col h4 {
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 1.75rem;
          position: relative;
          padding-bottom: 0.85rem;
        }
        .footer-col h4::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 20px; height: 1px;
          background: #b5a48a;
        }

        .footer-col ul {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        .footer-col a {
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 300;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .footer-col a:hover { color: #b5a48a; }

        /* Quote strip */
        .footer-quote {
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .footer-quote blockquote {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 1.05rem;
          font-weight: 400;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.02em;
          line-height: 1.6;
          margin: 0;
          position: relative;
          padding-left: 1.5rem;
        }
        .footer-quote blockquote::before {
          content: '';
          position: absolute;
          left: 0; top: 4px; bottom: 4px;
          width: 1px;
          background: #b5a48a;
        }

        /* Available for work banner */
        .footer-availability {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2.5rem 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .availability-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #6fcf97;
          box-shadow: 0 0 0 3px rgba(111,207,151,0.2);
          flex-shrink: 0;
        }
        .availability-left p {
          font-size: 0.82rem;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
        }
        .availability-left strong {
          color: #fff;
          font-weight: 500;
        }

        .availability-cta {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1714;
          background: #b5a48a;
          border: none;
          padding: 0.7rem 1.75rem;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.25s;
          white-space: nowrap;
        }
        .availability-cta:hover { background: #c9b89c; }

        /* Bottom bar */
        .footer-bottom {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1.75rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .footer-bottom p {
          font-size: 0.73rem;
          font-weight: 300;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.04em;
        }
        .footer-bottom-links {
          display: flex;
          gap: 2rem;
        }
        .footer-bottom-links a {
          font-size: 0.73rem;
          font-weight: 300;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }
        .footer-bottom-links a:hover { color: rgba(255,255,255,0.55); }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 600px) {
          .footer-top { grid-template-columns: 1fr; padding: 3rem 1.5rem 2.5rem; }
          .footer-quote, .footer-availability, .footer-bottom { padding-left: 1.5rem; padding-right: 1.5rem; }
          .footer-availability { flex-direction: column; align-items: flex-start; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="footer">

        {/* Main grid */}
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="logo">Ajay Kumar Thakur</Link>
            <div className="logo-rule" />
            <p>Full-Stack Developer with 2+ years of experience building scalable web applications. Based in Kathmandu, delivering reliable digital solutions worldwide.</p>
            <div className="social-links">
              {/* LinkedIn */}
              <a href="#" className="social-btn" title="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="#" className="social-btn" title="GitHub">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
              {/* Dribbble */}
              <a href="#" className="social-btn" title="Dribbble">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className="social-btn" title="Twitter">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              {[
                { label: "About",    href: "/about"    },
                { label: "Work",     href: "/work"     },
                { label: "Services", href: "/services" },
                { label: "Journal",  href: "/journal"  },
                { label: "Contact",  href: "/contact"  },
              ].map(l => (
                <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              {["UI/UX Design", "Web Development", "Brand Identity", "Motion Design", "Consulting"].map(l => (
                <li key={l}><Link href="#">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:ajaythakurniit1@gmail.com">ajaythakurniit1@gmail.com</a></li>
              <li><a href="tel:+9779810275078">9810275078</a></li>
              <li><a href="#">Kathmandu</a></li>
              <li style={{ marginTop: "0.5rem" }}><a href="#">Download CV</a></li>
            </ul>
          </div>
        </div>

        {/* Quote */}
        <div className="footer-quote">
          <blockquote>
            "Good design is not just how it looks — it's how it works, how it feels, and the problems it quietly solves."
          </blockquote>
        </div>

        {/* Availability */}
        <div className="footer-availability">
          <div className="availability-left">
            <div className="dot" />
            <p><strong>Available for new projects</strong> — Currently accepting freelance & contract work for Q3 2025.</p>
          </div>
          <Link href="/contact" className="availability-cta">Start a Project</Link>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Ajay Kumar Thakur. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="#">Privacy</Link>
            <Link href="#">Colophon</Link>
          </div>
        </div>

      </footer>
    </>
  );
}