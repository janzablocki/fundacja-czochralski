import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  const base = process.env.PUBLIC_URL || "";
  return (
    <>
      <section
        className="hero hero--fullscreen"
        aria-label="Wprowadzenie"
        style={{ "--hero-image": `url(${base}/assets/media/hero.png)` }}
      >
        <div className="hero--fullscreen-inner">
          <div className="hero-copy">
            <span className="kicker">Centrum kompetencyjne</span>
            <h1>Bezpieczeństwo energetyczne w czasach transformacji.</h1>
            <p>
              Fundacja im. Jana Czochralskiego tworzy przestrzeń dialogu, analiz i edukacji dla rynku
              energii i paliw — łącząc tradycję nauki z nowoczesnymi wyzwaniami.
            </p>
            <div className="hero-actions">
              <NavLink className="btn btn-primary btn-hero-primary" to="/publikacje">
                Publikacje
              </NavLink>
              <NavLink className="btn" to="/wydarzenia">
                Wydarzenia
              </NavLink>
              <NavLink className="btn btn-ghost" to="/o-nas">
                O Fundacji
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <div className="section-sep" aria-hidden="true">
        <img src={`${base}/assets/media/section-divider.svg`} alt="" loading="lazy" decoding="async" />
      </div>

      <section className="section">
        <div className="section-title">
          <h2>Obszary kompetencji</h2>
       </div>
        <div className="prose">
          <p className="muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a lorem ut eros sollicitudin
            dignissim. Donec et nisi non neque ultricies pretium. Aliquam erat volutpat. Etiam varius,
            dolor sed dignissim tincidunt, leo nibh iaculis urna, sed malesuada libero neque nec neque.
          </p>
          <ul className="bullets">
            <li>Analizy rynku energii i paliw oraz scenariusze regulacyjne.</li>
            <li>Warsztaty i szkolenia dla sektora (prawo, technologia, rynek).</li>
            <li>Dialog ekspercki: konferencje, debaty, partnerstwa.</li>
          </ul>
        </div>
      </section>
    </>
  );
}

