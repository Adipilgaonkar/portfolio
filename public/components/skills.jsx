const { useState: useStateSkills, useMemo: useMemoSkills, useEffect: useEffectSkills, useRef: useRefSkills } = React;

function Skills({ data }) {
  const [activeCluster, setActiveCluster] = useStateSkills(0);
  const clusters = data.skillClusters;
  const canvasRef = useRefSkills(null);
  const rafRef = useRefSkills(null);

  const clusterColors = {
    blue:   { bg: '#eff6ff', border: '#2563eb', text: '#1d4ed8', rgb: [37,99,235] },
    teal:   { bg: '#ecfeff', border: '#0891b2', text: '#0e7490', rgb: [8,145,178] },
    violet: { bg: '#f5f3ff', border: '#7c3aed', text: '#6d28d9', rgb: [124,58,237] },
    amber:  { bg: '#fffbeb', border: '#d97706', text: '#b45309', rgb: [217,119,6] },
    rose:   { bg: '#fff1f2', border: '#e11d48', text: '#be123c', rgb: [225,29,72] },
    slate:  { bg: '#f1f5f9', border: '#475569', text: '#334155', rgb: [71,85,105] }
  };

  const active = clusters[activeCluster] || clusters[0];
  const activeColors = clusterColors[active.color] || clusterColors.blue;

  // 5-layer 2D net; middle layer holds one node per cluster
  const network = useMemoSkills(() => {
    const layers = [
      { count: 4, xFrac: 0.10, label: 'input' },
      { count: 7, xFrac: 0.30, label: 'hidden₁' },
      { count: clusters.length, xFrac: 0.52, label: 'clusters' },
      { count: 7, xFrac: 0.74, label: 'hidden₂' },
      { count: 3, xFrac: 0.92, label: 'output' },
    ];
    return { layers };
  }, [clusters.length]);

  useEffectSkills(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    let last = performance.now();

    const positions = (W, H) => {
      const padY = H * 0.12;
      const usableH = H - padY * 2;
      const all = [];
      network.layers.forEach((L, li) => {
        const x = W * L.xFrac;
        for (let i = 0; i < L.count; i++) {
          const span = L.count === 1 ? 0 : (L.count - 1);
          const tY = L.count === 1 ? 0.5 : i / span;
          const y = padY + tY * usableH;
          all.push({ li, i, x, y, clusterIdx: li === 2 ? i : -1 });
        }
      });
      return all;
    };

    const render = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      const r = canvas.getBoundingClientRect();
      const W = r.width, H = r.height;
      ctx.clearRect(0, 0, W, H);

      // background grid
      ctx.strokeStyle = 'rgba(37,99,235,0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      const nodes = positions(W, H);

      // layer labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      network.layers.forEach(L => {
        ctx.fillText(L.label + ' · ' + L.count, W * L.xFrac, H - 14);
      });
      ctx.textAlign = 'left';

      // edges between adjacent layers
      const byLayer = network.layers.map((_, li) => nodes.filter(n => n.li === li));

      // 1) draw inactive edges first (all faint)
      for (let li = 0; li < network.layers.length - 1; li++) {
        byLayer[li].forEach(a => {
          byLayer[li + 1].forEach(b => {
            const active =
              (a.li === 2 && a.clusterIdx === activeCluster) ||
              (b.li === 2 && b.clusterIdx === activeCluster);
            if (active) return; // skip, draw on top later
            ctx.strokeStyle = 'rgba(100,116,139,0.12)';
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          });
        });
      }

      // 2) draw active edges on top with glow + flow dots
      const [R,G,B] = activeColors.rgb;
      for (let li = 0; li < network.layers.length - 1; li++) {
        byLayer[li].forEach(a => {
          byLayer[li + 1].forEach(b => {
            const isActive =
              (a.li === 2 && a.clusterIdx === activeCluster) ||
              (b.li === 2 && b.clusterIdx === activeCluster);
            if (!isActive) return;
            ctx.strokeStyle = `rgba(${R},${G},${B},0.55)`;
            ctx.lineWidth = 1.4;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${R},${G},${B},0.45)`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // traveling pulse
            const phase = ((t * 0.9) + (a.i + b.i) * 0.07) % 1;
            const px = a.x + (b.x - a.x) * phase;
            const py = a.y + (b.y - a.y) * phase;
            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${R},${G},${B},${0.85 * (1 - Math.abs(phase - 0.5) * 1.2)})`;
            ctx.fill();
          });
        });
      }

      // nodes
      nodes.forEach(n => {
        if (n.clusterIdx >= 0) {
          const isA = n.clusterIdx === activeCluster;
          const col = clusterColors[clusters[n.clusterIdx].color].rgb;
          const pulse = isA ? (1 + 0.2 * Math.sin(t * 3)) : 1;
          const r = (isA ? 10 : 7) * pulse;

          if (isA) {
            // halo
            const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 28);
            grad.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},0.35)`);
            grad.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 28, 0, Math.PI * 2);
            ctx.fill();
            // outer ring
            ctx.beginPath();
            ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},0.4)`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`;
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#cbd5e1';
          ctx.fill();
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // active label — place to the right, flip to left if it would overflow
      const activeNode = nodes.find(n => n.li === 2 && n.clusterIdx === activeCluster);
      if (activeNode) {
        ctx.font = '600 11px JetBrains Mono, monospace';
        const text = clusters[activeCluster].name;
        const metrics = ctx.measureText(text);
        const pad = 8;
        const bw = metrics.width + pad * 2, bh = 22;
        const wantRight = activeNode.x + 18 + bw + 8 <= W;
        const tx = wantRight ? activeNode.x + 18 : activeNode.x - 18 - bw;
        const ty = Math.max(8, Math.min(H - bh - 8, activeNode.y - bh / 2));
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = `rgba(${R},${G},${B},0.5)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(tx, ty, bw, bh, 4);
        else ctx.rect(tx, ty, bw, bh);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = `rgb(${R},${G},${B})`;
        ctx.textBaseline = 'middle';
        ctx.fillText(text, tx + pad, ty + bh / 2);
        ctx.textBaseline = 'alphabetic';

        ctx.beginPath();
        ctx.moveTo(activeNode.x, activeNode.y);
        ctx.lineTo(wantRight ? tx : tx + bw, ty + bh / 2);
        ctx.strokeStyle = `rgba(${R},${G},${B},0.5)`;
        ctx.setLineDash([2, 2]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [network, activeCluster, activeColors, clusters]);

  return (
    <section className="section" id="skills" style={{background: 'var(--bg-inset)'}}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Skills · Neural architecture</div>
            <h2 className="section-title">Capability clusters.</h2>
            <p className="section-lede">Each node in the middle layer is a specialty cluster. Hover a cluster on the right to light up its pathway through the network.</p>
          </div>
        </div>

        <div className="skills-layout">
          <div className="neural-net">
            <canvas ref={canvasRef}/>
            <div className="net-label">
              <span>neural_net.json</span>
              <span>● live</span>
            </div>
          </div>

          <div className="cluster-picker">
            <div className="cluster-picker-list">
              {clusters.map((c, i) => {
                const colors = clusterColors[c.color];
                const isActive = i === activeCluster;
                return (
                  <button
                    key={i}
                    className={`cluster-btn ${isActive ? 'active' : ''}`}
                    onMouseEnter={() => setActiveCluster(i)}
                    onClick={() => setActiveCluster(i)}
                    style={{ '--c-bg': colors.bg, '--c-border': colors.border, '--c-text': colors.text }}
                  >
                    <span className="cluster-btn-dot"/>
                    <span className="cluster-btn-name">{c.name}</span>
                    <span className="cluster-btn-count">{c.items.length}</span>
                  </button>
                );
              })}
            </div>

            <div className="cluster-detail">
              <h3 className="cluster-name" style={{color: activeColors.text}}>{active.name}</h3>
              <div className="cluster-count">{active.items.length} specialties · cluster_id = {activeCluster.toString().padStart(2,'0')}</div>
              <div className="cluster-items">
                {active.items.map((item, i) => (
                  <span
                    className="tag"
                    key={i}
                    style={{
                      background: activeColors.bg,
                      borderColor: activeColors.border,
                      color: activeColors.text,
                    }}
                  >{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Skills = Skills;
