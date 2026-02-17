import React from "react";

export default function ScienceCircle() {
  return (
    <>
      <section className="hero">
        <span className="chip">Koło Naukowe Prawa Energetycznego WPiA</span>
        <h1>Współpraca akademicka</h1>
        <p>
          Dedykowana sekcja projektów realizowanych wspólnie ze studentami i kadrą naukową oraz
          publikacji przygotowanych pod patronatem Fundacji.
        </p>
      </section>

      <div className="grid">
        <article className="card">
          <h3>Inicjatywy Wspólne</h3>
          <p>
            Opis projektów: seminaria, zespoły robocze, analizy legislacyjne i przeglądy technologii w
            kontekście polityk publicznych.
          </p>
          <div className="card-meta">
            <span className="chip">Projekty</span>
            <span className="chip">Seminaria</span>
            <span className="chip">Analizy</span>
          </div>
        </article>
        <article className="card">
          <h3>Wsparcie Naukowe</h3>
          <p>
            Publikacje przygotowane przez członków Koła oraz rekomendacje i komentarze do regulacji
            (ASR) dla sektora energetycznego.
          </p>
          <div className="card-meta">
            <span className="chip">Publikacje</span>
            <span className="chip">ASR</span>
            <span className="chip">Prawo</span>
          </div>
        </article>
      </div>

      <section className="section">
        <div className="section-title">
          <h2>Przykładowe aktywności</h2>
          <span className="muted">Lorem ipsum na potrzeby SEO</span>
        </div>
        <div className="panel">
          <p className="muted" style={{ margin: 0 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod, nibh a ultrices
            varius, tortor libero mollis leo, eget sodales arcu ipsum vel sapien. Nulla facilisi. In sed
            lectus non neque pretium dignissim.
          </p>
        </div>
      </section>
    </>
  );
}

