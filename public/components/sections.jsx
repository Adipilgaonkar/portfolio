function Sections({ data }) {
  return <></>;
}

function Impact({ data }) {
  return (
    <section className="section" style={{paddingTop: 0, paddingBottom: 60}}>
      <div className="container">
        <div className="impact-strip">
          {data.impact.map((m, i) => (
            <div className="impact-cell" key={i}>
              <div className="k">{m.k}</div>
              <div className="v">{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles() {
  const items = [
    { n: '01', title: 'Ship observable AI', body: 'Every LLM call, retrieval, and tool invocation is traced end-to-end. If you can\'t see it, you can\'t fix it.' },
    { n: '02', title: 'Evaluate before you scale', body: 'RAGAS, Promptfoo, red-teaming, human-in-the-loop review. Metrics before rollouts, every time.' },
    { n: '03', title: 'Governance is a feature', body: 'PII redaction, RBAC, audit trails, retention policies. Enterprise AI belongs in regulated contexts.' },
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Principles</div>
            <h2 className="section-title">How I ship.</h2>
          </div>
        </div>
        <div className="principles">
          {items.map(it => (
            <div className="principle" key={it.n}>
              <div className="num">PRINCIPLE · {it.n}</div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education({ data }) {
  return (
    <section className="section" style={{paddingTop: 0}}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Education</div>
            <h2 className="section-title">Academic foundation.</h2>
          </div>
        </div>
        <div className="edu-list">
          {data.education.map((e, i) => (
            <div className="edu-item" key={i}>
              <div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-meta" style={{marginTop: 4}}>{e.school}</div>
              </div>
              <div className="edu-meta">{e.place}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ data }) {
  const [copied, setCopied] = React.useState(null);
  const copy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-card">
          <div className="contact-eyebrow">● Open to select engagements</div>
          <h2 className="contact-title">Let's ship something serious.</h2>
          <p className="contact-lede">If you're building a production LLM system, a multi-agent platform, or need an AI engineer who takes governance and evaluation as seriously as the model — I'd love to talk.</p>
          <div className="contact-actions">
            <a href={`mailto:${data.email}`} className="btn btn-primary">
              <span>Email me</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <button className="btn btn-ghost" onClick={() => copy(data.email, 'email')}>
              {copied === 'email' ? '✓ Copied' : 'Copy email'}
            </button>
            <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="btn btn-ghost">LinkedIn</a>
          </div>
          <div className="contact-meta">
            <span><b>Email</b>{data.email}</span>
            <span><b>Phone</b>{data.phone}</span>
            <span><b>Location</b>{data.location}</span>
            <span><b>Response</b>within 24h</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ data }) {
  return (
    <footer className="footer">
      <span>© 2026 {data.name} · All rights reserved</span>
    </footer>
  );
}

window.Impact = Impact;
window.Principles = Principles;
window.Education = Education;
window.Contact = Contact;
window.Footer = Footer;
