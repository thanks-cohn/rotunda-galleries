"use client";

import { useEffect, useMemo, useState } from "react";

type Gallery = {
  title: string;
  eyebrow: string;
  description: string;
  accent: string;
  cover: string;
  images: string[];
};

const galleries: Gallery[] = [
  {
    title: "After the Rain",
    eyebrow: "TOKYO · 2026",
    description: "Neon, wet pavement, and the quiet electricity of a city beginning again.",
    accent: "#ff5b3d",
    cover: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=88",
    images: [
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1100&q=86",
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1532236204992-f5e85c024202?auto=format&fit=crop&w=1100&q=86",
    ],
  },
  {
    title: "Salt & Silence",
    eyebrow: "ATLANTIC · STUDY 04",
    description: "A slow study of coastlines shaped by wind, time, and the pull of open water.",
    accent: "#a7d8de",
    cover: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=88",
    images: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1476673160081-cf065607f449?auto=format&fit=crop&w=1100&q=86",
      "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1100&q=86",
    ],
  },
  {
    title: "Wild Geometry",
    eyebrow: "NAMIB · FIELD NOTES",
    description: "The immense graphic language of dunes, shadow, stone, and migrating light.",
    accent: "#dfb47b",
    cover: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=88",
    images: [
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1100&q=86",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1509316750945-42e73d4c19e7?auto=format&fit=crop&w=1100&q=86",
    ],
  },
  {
    title: "Green Rooms",
    eyebrow: "COSTA RICA · 35MM",
    description: "Portraits of the forest as architecture: rooms made of mist, leaf, and light.",
    accent: "#8fbd70",
    cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=88",
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1100&q=86",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1100&q=86",
    ],
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const gallery = galleries[active];
  const positions = useMemo(() => galleries.map((_, i) => {
    let delta = i - active;
    if (delta > galleries.length / 2) delta -= galleries.length;
    if (delta < -galleries.length / 2) delta += galleries.length;
    return delta;
  }), [active]);

  const move = (dir: number) => setActive((value) => (value + dir + galleries.length) % galleries.length);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") lightbox !== null ? setLightbox(null) : setOpen(null);
      if (open === null && event.key === "ArrowLeft") move(-1);
      if (open === null && event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lightbox]);

  return (
    <main className="site-shell" style={{ "--accent": gallery.accent } as React.CSSProperties}>
      <div className="grain" aria-hidden="true" />
      <header className="nav">
        <button className="wordmark" onClick={() => setOpen(null)} aria-label="Return to gallery rotunda">APERTURE<span>°</span></button>
        <div className="nav-right"><span>CURATED VISUAL STORIES</span><span className="issue">ISSUE 07</span></div>
      </header>

      <section className="rotunda" aria-label="Featured galleries">
        <div className="ambient" style={{ backgroundImage: `url(${gallery.cover})` }} />
        <div className="stage">
          {galleries.map((item, index) => {
            const pos = positions[index];
            return (
              <button
                key={item.title}
                className={`cover-card ${pos === 0 ? "is-active" : ""}`}
                style={{ "--pos": pos, backgroundImage: `linear-gradient(180deg, transparent 45%, rgba(0,0,0,.8)), url(${item.cover})` } as React.CSSProperties}
                onClick={() => pos === 0 ? setOpen(index) : setActive(index)}
                aria-label={`${pos === 0 ? "Open" : "Select"} ${item.title}`}
              >
                <span className="cover-number">0{index + 1}</span>
                <span className="cover-label">{item.title}</span>
              </button>
            );
          })}
        </div>

        <div className="hero-copy" key={gallery.title}>
          <p>{gallery.eyebrow}</p>
          <h1>{gallery.title}</h1>
          <div className="hero-meta">
            <span>{gallery.description}</span>
            <button onClick={() => setOpen(active)}>ENTER GALLERY <b>↗</b></button>
          </div>
        </div>

        <div className="rotunda-controls">
          <button onClick={() => move(-1)} aria-label="Previous gallery">←</button>
          <div className="progress"><i style={{ width: `${((active + 1) / galleries.length) * 100}%` }} /></div>
          <span>0{active + 1} / 0{galleries.length}</span>
          <button onClick={() => move(1)} aria-label="Next gallery">→</button>
        </div>
      </section>

      {open !== null && (
        <section className="takeover" aria-label={`${galleries[open].title} gallery`}>
          <div className="gallery-head">
            <button className="back" onClick={() => setOpen(null)}>← BACK TO COLLECTIONS</button>
            <p>{galleries[open].eyebrow}</p>
            <h2>{galleries[open].title}</h2>
            <div className="gallery-intro"><span>0{open + 1}</span><p>{galleries[open].description}</p><span>{galleries[open].images.length} IMAGES</span></div>
          </div>
          <div className="image-grid">
            {galleries[open].images.map((src, index) => (
              <button className={`image-item item-${index + 1}`} key={src} onClick={() => setLightbox(index)} aria-label={`View image ${index + 1}`}>
                <img src={src} alt={`${galleries[open].title}, photograph ${index + 1}`} />
                <span>0{index + 1}</span>
              </button>
            ))}
          </div>
          <footer><span>APERTURE°</span><button onClick={() => setOpen(null)}>ALL COLLECTIONS ↑</button></footer>
        </section>
      )}

      {open !== null && lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Expanded photograph" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>CLOSE ×</button>
          <img src={galleries[open].images[lightbox]} alt={`${galleries[open].title}, expanded photograph ${lightbox + 1}`} />
          <span>0{lightbox + 1} / 0{galleries[open].images.length}</span>
        </div>
      )}
    </main>
  );
}
