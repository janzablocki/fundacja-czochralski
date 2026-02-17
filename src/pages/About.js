import React from "react";

export default function About() {
  const base = process.env.PUBLIC_URL || "";
  return (
    <>
      <section
        className="about-hero"
        aria-label="O nas"
        style={{ "--about-image": `url(${base}/assets/media/about.png)` }}
      >
        <div className="about-hero-inner">
          <div className="about-hero-copy">
            <span className="chip">O nas</span>
            <h1>Misja i tożsamość</h1>
            <p>
              Budujemy zaufanie poprzez rzetelną analizę, dialog interesariuszy i praktyczne wsparcie
              transformacji energetycznej od technologii, przez prawo, po biznes.
            </p>
            <p className="muted">
              Fundacja im. Jana Czochralskiego łączy doświadczenie środowiska naukowego, eksperckiego i
              regulacyjnego. Tworzymy przestrzeń współpracy dla administracji, przemysłu i uczelni, aby
              rozwijać kompetencje rynku energii i paliw oraz wspierać bezpieczne, odpowiedzialne decyzje
              w okresie dynamicznych zmian sektora.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Misja i Wizja</h2>
        </div>
        <div className="panel">
          <p className="muted" style={{ margin: 0 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non orci sit amet nunc
            volutpat finibus. Praesent facilisis, justo a interdum dignissim, risus ligula feugiat
            metus, ut eleifend ipsum arcu sed augue. Donec non nunc et neque ultrices pulvinar.
          </p>
        </div>
      </section>

      <div className="grid">
        <article className="card">
          <h3>Sylwetka Patrona</h3>
          <p>
            Krótka, multimedialna historia Jana Czochralskiego — z podkreśleniem związku technologii
            materiałowych z rozwojem energetyki i przemysłu.
          </p>
          <div className="card-meta">
            <span className="chip">Historia</span>
            <span className="chip">Nauka</span>
            <span className="chip">Technologia</span>
          </div>
        </article>
        <article className="card">
          <h3>Zespół / Zarząd</h3>
          <p>
            Eksperci łączący świat techniki, prawa i biznesu. Notki biograficzne oraz zakresy
            specjalizacji.
          </p>
          <div className="card-meta">
            <span className="chip">Prawo</span>
            <span className="chip">Technika</span>
            <span className="chip">Rynek</span>
          </div>
        </article>
      </div>

      <section className="section">
        <div className="section-title">
          <h2>Zespół (przykład)</h2>
          <span className="muted">Do podmiany na realne osoby</span>
        </div>
        <div className="results">
          <article className="result">
            <h3>Dr inż. Anna Nowak</h3>
            <div className="meta">
              <span className="chip">Technologie energetyczne</span>
              <span className="chip">OZE</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a lorem ut eros
              sollicitudin dignissim.
            </p>
          </article>
          <article className="result">
            <h3>Radca prawny Jan Kowalski</h3>
            <div className="meta">
              <span className="chip">Prawo energetyczne</span>
              <span className="chip">Regulacje</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et nisi non neque
              ultricies pretium.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

