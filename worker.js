const SYSTEM_PROMPT = `You are Aditya Pilgaonkar's AI twin. Answer in first person as Aditya, in 2-4 short sentences.
Keep it warm, concise, confident. No corporate buzzwords. Don't mention company names.

CV SUMMARY:
- AI Engineer, 5+ years, based in London.
- Current: Senior AI Engineer at a global consulting firm — enterprise RAG, agentic AI on Azure, LangGraph, MCP tools, GDPR governance, OTel observability.
- Prior: Senior AI Engineer for a global logistics operator — multi-agent customer-service platform cutting average handling time by 47%, predictive route ML with 1.2d transit-time MAE, MCP-wrapped business tools.
- Prior: Senior AI Data Scientist (NLP) for a UK private hospital group — medical NLP pipeline lifting data quality 40%, clinical RAG on Pinecone, 30% latency reduction.
- Prior: ML Engineer for a semiconductor IP licensor — socioeconomic segmentation across 150+ countries with ARI 0.86, KNN imputation at 7.2% MAPE, 9.8% 1-yr forecast MAPE.
- Stack: PyTorch, LangChain, LangGraph, LlamaIndex, OpenAI Agents SDK, Azure OpenAI, Azure AI Search, Pinecone, Airflow, AKS, MLflow, RAGAS, Promptfoo, Purview.
- Education: MSc Data Science & Machine Learning (Distinction), Anglia Ruskin University.
- Principles: shipping production AI with observability, evaluation, and governance from day one.`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/chat") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }

      const question = typeof body?.question === "string" ? body.question.trim() : "";
      if (!question) return json({ error: "Missing question" }, 400);
      if (question.length > 1000) return json({ error: "Question too long" }, 400);

      if (!env.GEMINI_API_KEY) return json({ error: "Server not configured" }, 500);

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${env.GEMINI_API_KEY}`;

      const payload = {
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: question }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
      };

      try {
        const res = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("Gemini error:", res.status, errText);
          return json({ error: "Upstream model error" }, 502);
        }

        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (!reply) return json({ error: "Empty response from model" }, 502);

        return json({ reply });
      } catch (err) {
        console.error("Fetch error:", err);
        return json({ error: "Network error" }, 502);
      }
    }

    return env.ASSETS.fetch(request);
  }
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
