function Projects({ data }) {
  if (!data?.projects) return null;

  // Extract year from duration string (e.g. "Jul 2024 — Aug 2025" -> "2024 — 2025")
  const yearRange = (s) => {
    const years = (s || '').match(/\d{4}/g) || [];
    if (years.length >= 2) return `${years[0]} — ${years[years.length - 1]}`;
    return years[0] || '';
  };

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Projects · Shipped</div>
            <h2 className="section-title">Three systems, in production.</h2>
            <p className="section-lede">Company names redacted on purpose — architecture, stack, and outcomes are what matter. Each of these ran at real scale for real users.</p>
          </div>
        </div>

        <div className="projects-grid">
          {data.projects.map(p => {
            const topStack = p.stack.slice(0, 5);
            const moreCount = p.stack.length - topStack.length;
            return (
              <article className="project" key={p.id}>
                <div className="project-header">
                  <span className="project-id">PROJECT · {p.id}</span>
                  <span className="project-year">{yearRange(p.duration)}</span>
                </div>

                <div>
                  <h3 className="project-title">{p.title}</h3>
                  <div className="project-tagline">{p.tagline}</div>
                </div>

                <p className="project-description">{p.description}</p>

                <div className="project-metrics">
                  {p.metrics.slice(0, 4).map((m, i) => (
                    <div className="project-metric" key={i}>
                      <span className="k">{m.k}</span>
                      <span className="v">{m.v}</span>
                    </div>
                  ))}
                </div>

                <div className="project-stack">
                  {topStack.map((s, i) => <span className="tag" key={i}>{s}</span>)}
                  {moreCount > 0 && <span className="tag more">+{moreCount} more</span>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.Projects = Projects;
