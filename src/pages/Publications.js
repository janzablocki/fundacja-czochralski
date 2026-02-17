import React from "react";
import { NavLink } from "react-router-dom";

function normalize(str) {
  return (str || "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

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

function uniq(arr) {
  return Array.from(new Set(arr));
}

function matchesAllTags(pub, selectedTags) {
  if (!selectedTags.length) return true;
  const tags = pub.tags || [];
  return selectedTags.every((t) => tags.includes(t));
}

export default function Publications() {
  const [all, setAll] = React.useState([]);
  const [error, setError] = React.useState("");

  const [q, setQ] = React.useState("");
  const [year, setYear] = React.useState("");
  const [type, setType] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState([]);

  const dialogRef = React.useRef(null);
  const frameRef = React.useRef(null);
  const [pdfTitle, setPdfTitle] = React.useState("Podgląd");

  React.useEffect(() => {
    const base = process.env.PUBLIC_URL || "";
    fetch(`${base}/assets/data/publikacje.json`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("HTTP error"))))
      .then((data) => setAll(data || []))
      .catch(() => setError("Nie udało się wczytać publikacji."));
  }, []);

  const years = React.useMemo(() => {
    return uniq(all.map((p) => p.year).filter(Boolean)).sort((a, b) => b - a);
  }, [all]);

  const tags = React.useMemo(() => {
    return uniq(all.flatMap((p) => p.tags || []))
      .filter(Boolean)
      .sort((a, b) => String(a).localeCompare(String(b), "pl"));
  }, [all]);

  const filtered = React.useMemo(() => {
    const qv = normalize(q);
    const yv = year ? Number(year) : null;

    return all
      .filter((p) => (yv ? Number(p.year) === yv : true))
      .filter((p) => (type ? p.type === type : true))
      .filter((p) => matchesAllTags(p, selectedTags))
      .filter((p) => {
        if (!qv) return true;
        const blob = normalize([p.title, p.summary, ...(p.tags || [])].join(" "));
        return blob.includes(qv);
      })
      .sort((a, b) => {
        const ya = Number(a.year || 0);
        const yb = Number(b.year || 0);
        if (yb !== ya) return yb - ya;
        return String(a.title || "").localeCompare(String(b.title || ""), "pl");
      });
  }, [all, q, year, type, selectedTags]);

  function toggleTag(tag) {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function clear() {
    setQ("");
    setYear("");
    setType("");
    setSelectedTags([]);
  }

  function openPdf({ title, url }) {
    const dialog = dialogRef.current;
    const frame = frameRef.current;
    if (!dialog || !frame || typeof dialog.showModal !== "function") {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    setPdfTitle(title || "Podgląd PDF");
    frame.src = url.includes("#") ? url : `${url}#view=FitH`;
    dialog.showModal();
  }

  return (
    <>
      <section className="hero">
        <span className="chip">Publikacje</span>
        <h1>Repozytorium wiedzy</h1>
        <p>
          Raporty roczne, white papers oraz opinie prawne. Wyszukuj po tagach, latach i frazach. Podgląd
          PDF działa w przeglądarce.
        </p>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>Wyszukiwarka publikacji</h2>
          <span className="muted">{filtered.length ? `${filtered.length} wynik(i/ów)` : ""}</span>
        </div>

        <div className="panel">
          <div className="filters" role="search" aria-label="Filtry publikacji">
            <div className="field wide">
              <label className="label" htmlFor="q">
                Szukaj
              </label>
              <input
                id="q"
                type="search"
                placeholder="Np. wodór, SMR, OZE, ASR…"
                autoComplete="off"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="year">
                Rok
              </label>
              <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Wszystkie</option>
                {years.map((y) => (
                  <option key={y} value={String(y)}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label className="label" htmlFor="type">
                Typ
              </label>
              <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Wszystkie</option>
                <option value="raport-roczny">Raporty Roczne</option>
                <option value="white-paper">White Papers</option>
                <option value="opinia-prawna">Opinie Prawne</option>
              </select>
            </div>

            <div className="field" style={{ gridColumn: "span 12" }}>
              <span className="label">Tagi</span>
              <div id="tags" className="tagbox" aria-label="Wybór tagów">
                {tags.map((t) => (
                  <label key={t}>
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(t)}
                      onChange={() => toggleTag(t)}
                    />{" "}
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="field" style={{ gridColumn: "span 12", display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn" type="button" onClick={clear}>
                Wyczyść filtry
              </button>
              <a className="btn btn-ghost" href={`${process.env.PUBLIC_URL || ""}/assets/data/publikacje.json`}>
                Podgląd danych (JSON)
              </a>
            </div>
          </div>
        </div>

        {error ? (
          <div className="panel" style={{ marginTop: 16 }}>
            <p className="muted" style={{ margin: 0 }}>
              {error}
            </p>
          </div>
        ) : null}

        <div className="results" aria-live="polite">
          {filtered.map((p) => (
            <article key={p.id} className="result">
              <h3>{p.title}</h3>
              <div className="meta">
                <span className="chip">{labelType(p.type)}</span>
                {p.year ? <span className="chip">{p.year}</span> : null}
                {(p.tags || []).slice(0, 6).map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <p>{p.summary || ""}</p>
              <div className="actions">
                <NavLink className="btn btn-ghost" to={`/publikacje/${p.id}`}>
                  Czytaj
                </NavLink>
                {p.pdfUrl ? (
                  <>
                    <button className="btn btn-primary" type="button" onClick={() => openPdf({ title: p.title, url: (process.env.PUBLIC_URL || "") + p.pdfUrl })}>
                      Podgląd
                    </button>
                    <a className="btn" href={(process.env.PUBLIC_URL || "") + p.pdfUrl} download>
                      Pobierz
                    </a>
                    <a className="btn btn-ghost" href={(process.env.PUBLIC_URL || "") + p.pdfUrl} target="_blank" rel="noopener noreferrer">
                      Otwórz w nowej karcie
                    </a>
                  </>
                ) : null}
              </div>
            </article>
          ))}

          {!error && filtered.length === 0 ? (
            <div className="panel" style={{ gridColumn: "span 12" }}>
              <p className="muted" style={{ margin: 0 }}>
                Brak wyników. Zmień filtry lub frazę wyszukiwania.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <dialog ref={dialogRef} className="pdf-modal" aria-label="Podgląd PDF">
        <div className="pdf-modal-header">
          <p className="pdf-modal-title">{pdfTitle}</p>
          <form method="dialog" style={{ margin: 0 }}>
            <button className="btn" type="submit" onClick={() => (frameRef.current ? (frameRef.current.src = "about:blank") : null)}>
              Zamknij
            </button>
          </form>
        </div>
        <iframe ref={frameRef} className="pdf-frame" title="Podgląd PDF" />
      </dialog>
    </>
  );
}

