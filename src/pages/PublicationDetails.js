import React from "react";
import { NavLink, useParams } from "react-router-dom";

function labelType(type) {
  switch (type) {
    case "raport-roczny":
      return "Raport roczny";
    case "white-paper":
      return "White paper";
    case "opinia-prawna":
      return "Opinia prawna";
    default:
      return "Publikacja";
  }
}

export default function PublicationDetails() {
  const { id } = useParams();
  const [pub, setPub] = React.useState(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const base = process.env.PUBLIC_URL || "";
    fetch(`${base}/assets/data/publikacje.json`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("HTTP error"))))
      .then((data) => {
        const found = (data || []).find((p) => p.id === id);
        if (!found) {
          setError("Nie znaleziono publikacji.");
          return;
        }
        setPub(found);
      })
      .catch(() => setError("Nie udało się wczytać publikacji."));
  }, [id]);

  if (error) {
    return (
      <div className="section">
        <div className="panel">
          <p className="muted" style={{ margin: 0 }}>
            {error}
          </p>
        </div>
        <div style={{ marginTop: 12 }}>
          <NavLink className="btn" to="/publikacje">
            Wróć do publikacji
          </NavLink>
        </div>
      </div>
    );
  }

  if (!pub) {
    return (
      <div className="section">
        <div className="panel">
          <p className="muted" style={{ margin: 0 }}>
            Wczytywanie…
          </p>
        </div>
      </div>
    );
  }

  const base = process.env.PUBLIC_URL || "";
  const pdfUrl = pub.pdfUrl ? base + pub.pdfUrl : "";

  return (
    <>
      <section className="hero">
        <span className="chip">Publikacje</span>
        <h1>{pub.title}</h1>
        <p className="muted">
          <span className="chip" style={{ marginRight: 8 }}>
            {labelType(pub.type)}
          </span>
          {pub.year ? <span className="chip">{pub.year}</span> : null}
        </p>
        <div className="hero-actions">
          <NavLink className="btn" to="/publikacje">
            Wróć do listy
          </NavLink>
          {pdfUrl ? (
            <>
              <a className="btn btn-primary" href={pdfUrl} target="_blank" rel="noopener noreferrer">
                Otwórz PDF
              </a>
              <a className="btn" href={pdfUrl} download>
                Pobierz PDF
              </a>
            </>
          ) : null}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Treść</h2>
          <span className="muted">{(pub.tags || []).join(", ")}</span>
        </div>
        <div className="panel">
          {(pub.content || [pub.summary || ""]).filter(Boolean).map((p, idx) => (
            <p key={idx} className="muted" style={{ marginTop: idx === 0 ? 0 : 12, marginBottom: 0 }}>
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}

