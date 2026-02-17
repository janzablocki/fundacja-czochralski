import React from "react";
import { NavLink } from "react-router-dom";

function Brand() {
  const base = process.env.PUBLIC_URL || "";
  return (
    <NavLink className="brand" to="/" aria-label="Strona główna Fundacji im. Jana Czochralskiego">
      <img
        className="brand-logo brand-logo-desktop"
        src={`${base}/assets/media/logo.svg`}
        alt="Fundacja im. Jana Czochralskiego"
        loading="eager"
        decoding="async"
      />
      <img
        className="brand-logo brand-logo-mobile"
        src={`${base}/assets/media/logo-mark.svg`}
        alt="Fundacja im. Jana Czochralskiego"
        loading="eager"
        decoding="async"
      />
    </NavLink>
  );
}

export default function Layout({ children }) {
  const [open, setOpen] = React.useState(false);
  const year = new Date().getFullYear();

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container header-top" aria-label="Pasek górny">
          <div className="top-left">
            <span className="top-kicker">Fundacja • energia i paliwa</span>
          </div>
          <div className="top-right">
            <a className="top-icon" href="#" aria-label="LinkedIn (placeholder)">
              in
            </a>
            <a className="top-icon" href="#" aria-label="Facebook (placeholder)">
              f
            </a>
            <a className="top-icon" href="#" aria-label="Instagram (placeholder)">
              ig
            </a>
            <span className="top-lang" aria-label="Język">
              <span className="top-lang-active">PL</span>
              <span className="top-lang-sep">/</span>
              <span className="top-lang-inactive">EN</span>
            </span>
          </div>
        </div>

        <div className="container header-inner">
          <Brand />

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open ? "true" : "false"}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>

          <nav id="site-nav" className={`site-nav ${open ? "is-open" : ""}`} aria-label="Nawigacja główna">
            <NavLink to="/o-nas" onClick={() => setOpen(false)}>
              O nas
            </NavLink>
            <NavLink to="/wydarzenia" onClick={() => setOpen(false)}>
              Wydarzenia
            </NavLink>
            <NavLink to="/publikacje" onClick={() => setOpen(false)}>
              Publikacje
            </NavLink>
            <NavLink to="/kolo-naukowe" onClick={() => setOpen(false)}>
              Koło Naukowe
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">{children}</div>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-title">Fundacja im. Jana Czochralskiego</div>
            <p className="muted">
              Centrum kompetencyjne w obszarze rynku energii i paliw. Łączymy tradycję i innowacje w
              odpowiedzi na wyzwania transformacji energetycznej.
            </p>
          </div>

          <div className="footer-col">
            <div className="footer-title">Kontakt</div>
            <ul className="footer-list">
              <li>
                <a href="mailto:kontakt@fundacja.example">kontakt@fundacja.example</a>
              </li>
              <li>
                <span className="muted">Warszawa, Polska</span>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-title">Skróty</div>
            <ul className="footer-list">
              <li>
                <NavLink to="/publikacje">Wyszukiwarka publikacji</NavLink>
              </li>
              <li>
                <NavLink to="/wydarzenia">Kalendarz i archiwum wydarzeń</NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <span className="muted">© {year} Fundacja im. Jana Czochralskiego</span>
        </div>
      </footer>
    </>
  );
}

