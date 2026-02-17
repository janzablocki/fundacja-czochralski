import React from "react";

function fmtDate(iso) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("pl-PL", { year: "numeric", month: "long", day: "2-digit" }).format(d);
  } catch {
    return iso;
  }
}

function labelCategory(cat) {
  switch (cat) {
    case "konferencja-debata":
      return "Konferencje i debaty";
    case "warsztaty-szkolenia":
      return "Warsztaty i szkolenia";
    case "partnerstwa":
      return "Partnerstwa";
    default:
      return "Wydarzenie";
  }
}

export default function Events() {
  const [events, setEvents] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const base = process.env.PUBLIC_URL || "";
    fetch(`${base}/assets/data/wydarzenia.json`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("HTTP error"))))
      .then((data) => {
        const sorted = [...(data || [])].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
        setEvents(sorted);
      })
      .catch(() => setError("Nie udało się wczytać wydarzeń."));
  }, []);

  return (
    <>
      <section className="hero">
        <span className="chip">Wydarzenia</span>
        <h1>Kalendarz i archiwum</h1>
        <p>
          Konferencje i debaty, warsztaty i szkolenia oraz wydarzenia partnerskie. Poniżej przykładowe
          wpisy (dane w JSON).
        </p>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Lista wydarzeń</h2>
          <span className="muted">Ładowane z `public/assets/data/wydarzenia.json`</span>
        </div>

        {error ? (
          <div className="panel">
            <p className="muted" style={{ margin: 0 }}>
              {error} Sprawdź, czy uruchamiasz stronę przez `npm start` / build na Pages.
            </p>
          </div>
        ) : null}

        <div className="results" aria-live="polite">
          {events.map((e) => (
            <article key={e.id} className="result">
              <h3>{e.title}</h3>
              <div className="meta">
                <span className="chip">{labelCategory(e.category)}</span>
                {e.date ? <span className="chip">{fmtDate(e.date)}</span> : null}
                {e.location ? <span className="chip">{e.location}</span> : null}
              </div>
              <p>{e.summary}</p>
              {e.partner ? (
                <p className="muted" style={{ margin: 0 }}>
                  <strong>Partner:</strong> {e.partner}
                </p>
              ) : null}
            </article>
          ))}

          {!error && events.length === 0 ? (
            <div className="panel" style={{ gridColumn: "span 12" }}>
              <p className="muted" style={{ margin: 0 }}>
                Brak wydarzeń do wyświetlenia.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

