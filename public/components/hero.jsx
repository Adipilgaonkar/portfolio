const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ===== Nav =====
function Nav() {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="dot"></span>
        <span>aditya.ai</span>
      </div>
      <div className="nav-links">
        <a href="#chat">Ask my AI</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </div>
      <a href="#contact" className="nav-cta">Let's build →</a>
    </nav>
  );
}

// ===== Hero =====
function Hero({ data }) {
  const techStack = ["LLMs", "RAG", "Agents", "LangGraph", "PyTorch", "Azure OpenAI", "MCP", "Vector DBs", "Fine-tuning", "MLOps", "Kubernetes", "Airflow"];
  const marqueeItems = [...techStack, ...techStack];

  return (
    <section className="hero">
      <div className="hero-grid">
        <div>
          <div className="hero-eyebrow">
            <span className="dot"></span>
            <span>Available for select engagements · London, UK</span>
          </div>
          <h1 className="hero-title">
            <span className="line role">Senior AI Engineer</span>
            <span className="line ex">Ex. Director @been.city</span>
            <span className="line build">shipping <span className="accent">production</span></span>
            <span className="line build">LLM systems.</span>
          </h1>
          <p className="hero-sub">{data.tagline}</p>
          <div className="hero-actions">
            <a href="#chat" className="btn btn-primary">
              <span>Ask my AI twin</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <a href="#projects" className="btn btn-ghost">See projects</a>
          </div>
          <div className="hero-meta">
            <div className="cell"><span className="k">5+</span><span className="v">Years shipping AI</span></div>
            <div className="cell"><span className="k">4</span><span className="v">Industries</span></div>
            <div className="cell"><span className="k">99.9%</span><span className="v">Platform uptime</span></div>
            <div className="cell"><span className="k">GDPR</span><span className="v">Native governance</span></div>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <div className="hero-portrait">
            <img src="assets/aditya.png" alt="Aditya Pilgaonkar" />
            <div className="scan-tick left"></div>
            <div className="scan-tick right"></div>
            <div className="scan-readout">SCANNING · 0.42</div>
            <div className="portrait-tags">
              <div className="ptag ptag-tl">ID · 0xA017</div>
              <div className="ptag ptag-tr ok">● NEURAL.LINK</div>
              <div className="ptag ptag-bl">CLASS · ai_engineer</div>
              <div className="ptag ptag-br">conf 0.997</div>
              <div className="corner tl"></div><div className="corner tr"></div>
              <div className="corner bl"></div><div className="corner br"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee-wrap" style={{marginTop: 72}}>
        <div className="marquee">
          {marqueeItems.map((t,i) => (
            <span key={i}><b>/</b>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Nav = Nav;
window.Hero = Hero;
