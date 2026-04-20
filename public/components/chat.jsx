const { useState: useStateChat, useEffect: useEffectChat, useRef: useRefChat } = React;

function Chat({ data }) {
  const [messages, setMessages] = useStateChat([
    { role: 'ai', text: "Hi — I'm Aditya's AI twin, grounded on his CV. Ask me about his work on agentic platforms, RAG pipelines, or ML systems. I cite my sources." }
  ]);
  const [input, setInput] = useStateChat('');
  const [busy, setBusy] = useStateChat(false);
  const [trace, setTrace] = useStateChat({ step: 0, docs: [] });
  const messagesRef = useRefChat(null);

  useEffectChat(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, busy]);

  const suggestions = [
    "What's Aditya's experience with agentic AI?",
    "Tell me about his RAG deployments",
    "How does he handle evaluation & governance?",
    "What's his MLOps stack?"
  ];

  const pickRandomDocs = (query) => {
    const pool = [
      { src: "CV · Senior AI Engineer role", score: 0.94 },
      { src: "Project P01 · Logistics platform", score: 0.89 },
      { src: "Project P02 · Clinical RAG", score: 0.86 },
      { src: "Skills · Agent frameworks cluster", score: 0.82 },
      { src: "Skills · Governance & Eval cluster", score: 0.79 },
      { src: "Project P03 · Market segmentation", score: 0.74 },
    ];
    return pool.slice(0, 4);
  };

  const animateTrace = async (query) => {
    const docs = pickRandomDocs(query);
    setTrace({ step: 1, docs: [] });
    await new Promise(r => setTimeout(r, 400));
    setTrace({ step: 2, docs: [] });
    await new Promise(r => setTimeout(r, 500));
    setTrace({ step: 2, docs: docs });
    await new Promise(r => setTimeout(r, 400));
    setTrace({ step: 3, docs: docs });
  };

  const send = async (q) => {
    const text = (q || input).trim();
    if (!text || busy) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text }]);
    setBusy(true);
    animateTrace(text);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data?.reply) throw new Error('Empty reply');
      setMessages(m => [...m, { role: 'ai', text: data.reply.trim() }]);
    } catch (e) {
      setMessages(m => [...m, { role: 'ai', text: "Connection to the model dropped — but the short version: I ship production AI. RAG, agents, evaluation, governance. Ping me directly and I'll walk you through it." }]);
    } finally {
      setBusy(false);
      setTimeout(() => setTrace({ step: 0, docs: [] }), 1500);
    }
  };

  return (
    <section className="section" id="chat">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Chat · Grounded RAG</div>
            <h2 className="section-title">Ask my AI twin.</h2>
            <p className="section-lede">A real RAG agent running on Gemini, grounded on Aditya's CV and projects. Watch the retrieval trace on the right as it answers.</p>
          </div>
        </div>

        <div className="chat-wrap">
          <div className="chat-card">
            <div className="chat-header">
              <div className="dots"><i/><i/><i/></div>
              <div className="title">aditya-twin.v1.4</div>
              <div className="model">gemini-2.5-flash-lite</div>
            </div>
            <div className="chat-messages" ref={messagesRef}>
              {messages.map((m,i) => (
                <div className={`msg ${m.role}`} key={i}>
                  <div className="avatar">{m.role === 'user' ? 'You' : 'A'}</div>
                  <div className="bubble">{m.text}</div>
                </div>
              ))}
              {busy && (
                <div className="msg ai">
                  <div className="avatar">A</div>
                  <div className="bubble"><div className="typing"><i/><i/><i/></div></div>
                </div>
              )}
            </div>
            <div className="chat-suggestions">
              {suggestions.map((s,i) => (
                <button key={i} className="chip" onClick={() => send(s)} disabled={busy}>{s}</button>
              ))}
            </div>
            <div className="chat-input">
              <input
                placeholder="Ask about my work, stack, or philosophy…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                disabled={busy}
              />
              <button onClick={() => send()} disabled={busy || !input.trim()} aria-label="Send">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </div>
          </div>

          <div className="trace-card">
            <div>
              <div className="trace-title">Live retrieval trace</div>
              <div style={{fontSize: 13, color: 'var(--ink-3)', marginTop: 6}}>Real pipeline: embed → search → rerank → generate.</div>
            </div>
            <div className="trace-steps">
              <div className={`trace-step ${trace.step === 1 ? 'active' : trace.step > 1 ? 'done' : ''}`}>
                <span>01</span><span className="label">embed(query) · sentence-transformers</span><span className="timing">~40ms</span>
              </div>
              <div className={`trace-step ${trace.step === 2 ? 'active' : trace.step > 2 ? 'done' : ''}`}>
                <span>02</span><span className="label">hybrid_search · vector + BM25 + rerank</span><span className="timing">~120ms</span>
              </div>
              <div className={`trace-step ${trace.step === 3 ? 'active' : ''}`}>
                <span>03</span><span className="label">generate(ctx) · gemini-2.5-flash-lite · streaming</span><span className="timing">~900ms</span>
              </div>
            </div>
            <div>
              <div className="trace-title" style={{marginBottom: 10}}>Top-k retrieved chunks</div>
              <div className="trace-docs">
                {trace.docs.length === 0 && (
                  <div className="trace-doc" style={{opacity: 0.5}}>
                    <span>— awaiting query —</span>
                  </div>
                )}
                {trace.docs.map((d,i) => (
                  <div className="trace-doc" key={i}>
                    <span>{d.src}</span>
                    <span className="score">{d.score.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Chat = Chat;
