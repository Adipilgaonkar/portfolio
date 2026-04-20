function Experience({ data }) {
  // Ladder rungs — bottom = earliest, top = current
  const rungs = [
    { label: "Senior AI Engineer", domain: "Global consulting · UK enterprise", status: "LIVE", tag: "now" },
    { label: "Senior AI Engineer", domain: "Global logistics · Ocean + landside operations", status: "SHIPPED" },
    { label: "Senior AI Data Scientist · NLP", domain: "Healthcare · Private hospital group", status: "SHIPPED" },
    { label: "Data Scientist", domain: "Early career · ML foundations", status: "SHIPPED" },
  ];

  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Experience · Trajectory</div>
            <h2 className="section-title">The ladder I've climbed.</h2>
            <p className="section-lede">Each rung is a role and a domain. Read bottom-up for the journey; top is where I am now.</p>
          </div>
        </div>

        <div className="ladder-wrap">
          <div className="ladder">
            <div className="ladder-rail left" aria-hidden="true"/>
            <div className="ladder-rail right" aria-hidden="true"/>

            {rungs.map((r, i) => (
              <div className={`rung ${r.tag === 'now' ? 'rung-now' : ''}`} key={i}>
                <div className="rung-bar">
                  <div className="rung-node left"/>
                  <div className="rung-line"/>
                  <div className="rung-node right"/>
                </div>
                <div className="rung-card">
                  <div className="rung-meta">
                    <span className={`status ${r.status === 'LIVE' ? 'live' : ''}`}>{r.status}</span>
                    {r.tag === 'now' && <span className="rung-tag">you are here</span>}
                  </div>
                  <div className="rung-role">{r.label}</div>
                  <div className="rung-domain">{r.domain}</div>
                </div>
              </div>
            ))}

            <div className="ladder-foot">
              <div className="ladder-foot-dot"/>
              <div className="ladder-foot-line"/>
              <div className="ladder-foot-label">start</div>
            </div>
          </div>

          <aside className="ladder-aside">
            <div className="ladder-aside-kicker">Across 4 domains</div>
            <ul className="ladder-aside-list">
              <li><span>AI consulting</span><em>enterprise</em></li>
              <li><span>Logistics</span><em>ocean + land</em></li>
              <li><span>Healthcare</span><em>clinical NLP</em></li>
              <li><span>Semiconductor</span><em>market intel</em></li>
            </ul>
            <div className="ladder-aside-note">
              Company names intentionally omitted — focus on problem, stack, and outcome.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

window.Experience = Experience;
