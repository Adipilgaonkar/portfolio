// Company names intentionally redacted per user request.
window.__PORTFOLIO_DATA__ = {
  name: "Aditya Pilgaonkar",
  role: "AI Engineer",
  location: "London, United Kingdom",
  email: "adipilgaonkar@gmail.com",
  phone: "+44 7596 067754",
  linkedin: "linkedin.com/in/adityapilgaonkar",
  tagline: "I design, train, and ship production AI — LLM systems, agentic workflows, and ML infrastructure — for enterprises where reliability, governance, and scale are non-negotiable.",

  experience: [
    {
      role: "Senior AI Engineer",
      domain: "Global consulting · UK enterprise clients",
      location: "London, UK",
      period: "Sep 2025 — Present",
      status: "LIVE",
      stack: ["Python", "PyTorch", "Azure OpenAI", "Azure AI Search", "LangChain", "LangGraph", "MCP", "Azure Durable Functions", "ADLS Gen2", "AKS", "Apache Airflow", "RAGAS", "Promptfoo", "Microsoft Purview"],
      highlights: [
        { metric: "Enterprise", label: "RAG pipelines", detail: "Hybrid vector + keyword search on Azure AI Search with semantic reranking and metadata filters." },
        { metric: "Agentic", label: "multi-step AI", detail: "GPT-4 agents orchestrated via LangGraph + Durable Functions, tools exposed through MCP." },
        { metric: "GDPR", label: "by default", detail: "PII redaction, Key Vault, RBAC, Purview retention — AI shipped safely into regulated data." },
        { metric: "Full-stack", label: "observability", detail: "OpenTelemetry + App Insights tracking latency, containment, deflection, and cost per query." },
        { metric: "Offline eval", label: "+ red-teaming", detail: "RAGAS and Promptfoo harnesses with human-in-the-loop review for low-hallucination deployments." },
        { metric: "Autoscaling", label: "inference", detail: "High-throughput LLM APIs via Azure API Management + AKS with Private Link and VNet." }
      ]
    },
    {
      role: "Senior AI Engineer",
      domain: "Global logistics · Ocean + landside operations",
      location: "London, UK",
      period: "Jul 2024 — Aug 2025",
      status: "SHIPPED",
      stack: ["Python", "PyTorch", "XGBoost", "Azure OpenAI", "LangGraph", "OpenAI Agents SDK", "LlamaIndex", "MCP", "Dify", "n8n", "Airflow", "AKS", "Azure Event Hub", "Azure Synapse"],
      highlights: [
        { metric: "Multi-agent", label: "customer service", detail: "Intent detection, intelligent triage, and summarisation cutting handling time and raising FCR." },
        { metric: "Predictive", label: "route ML", detail: "Transit-time + capacity models reducing variability across ocean and landside operations." },
        { metric: "Multimodal", label: "risk signals", detail: "Weather, geospatial, traffic, and geopolitical fusion for anomaly detection and disruption alerts." },
        { metric: "MCP-wrapped", label: "business tools", detail: "Pricing, booking, tariffs exposed with fine-grained perms, audit trails, and version control." },
        { metric: "Fine-tuned", label: "domain LLMs", detail: "LLM post-training and prompt optimisation on proprietary datasets at scale." },
        { metric: "Responsible AI", label: "guardrails", detail: "Prompt/response filtering, PII redaction, tool permissioning, and content safety checks." }
      ]
    },
    {
      role: "Senior AI Data Scientist · NLP",
      domain: "Healthcare · Private hospital group",
      location: "London, UK",
      period: "Apr 2023 — Jul 2024",
      status: "SHIPPED",
      stack: ["Python", "GPT-4", "GPT-3.5", "Pinecone", "LangChain", "LangSmith", "LangGraph", "AWS Redshift", "Speech APIs", "spaCy"],
      highlights: [
        { metric: "+40%", label: "data quality lift", detail: "Medical text pipeline with fuzzy matching, custom spelling correction, and domain NER." },
        { metric: "Clinical RAG", label: "on Pinecone", detail: "Domain-specific retrieval trained exclusively on healthcare corpus for clinically-relevant answers." },
        { metric: "−30%", label: "response latency", detail: "End-to-end optimisation of RAG pipeline for high-volume clinical query workloads." },
        { metric: "Voice ↔ text", label: "workflows", detail: "Integrated speech recognition and synthesis for hands-free clinician-facing experiences." },
        { metric: "Healthcare", label: "compliant", detail: "Governance, PII redaction, and audit-ready controls for sensitive medical data." }
      ]
    },
    {
      role: "Machine Learning Engineer",
      domain: "Semiconductor · Market intelligence",
      location: "Remote",
      period: "Dec 2020 — Jan 2022",
      status: "SHIPPED",
      stack: ["Python", "scikit-learn", "Pandas", "NumPy", "K-Means", "GMM", "DBSCAN", "KNN", "Plotly Dash", "Snowflake"],
      highlights: [
        { metric: "12 sources", label: "unified", detail: "Ingestion + normalisation pipeline across 150+ countries and 2,000+ sub-regions." },
        { metric: "Ensemble", label: "segmentation", detail: "K-Means + GMM + DBSCAN consensus clustering with ARI 0.86." },
        { metric: "7.2%", label: "imputation MAPE", detail: "KNN regression with spline interpolation — beat naive baselines by ~40%." },
        { metric: "9.8%", label: "1-yr forecast MAPE", detail: "Stage-stratified KNN handling S-curve technology adoption trajectories." },
        { metric: "~80", label: "features / region", detail: "Economic, infrastructure, demographic, and internal royalty indicators with PCA-derived composites." }
      ]
    }
  ],

  // Projects — generic descriptions; client names redacted
  projects: [
    {
      id: "P01",
      title: "Enterprise Knowledge & Workflow Assistant",
      tagline: "Agentic AI platform for a global logistics operator",
      description: "Designed a multi-agent platform that automates customer-service query resolution, predicts route transit-time variability from multimodal signals, and delivers cited answers from an operational knowledge base. Built around a router agent that decomposes compound queries and hands off to specialist agents (service, route-optimisation, knowledge, escalation), with every business service wrapped as a permissioned MCP tool.",
      duration: "Jul 2024 — Aug 2025",
      role: "Senior AI Engineer",
      hero: "logistics",
      metrics: [
        { k: "−47%", v: "average handling time" },
        { k: "83%", v: "first-contact resolution" },
        { k: "3.8s", v: "P95 end-to-end latency" },
        { k: "1.2d", v: "transit-time prediction MAE" },
        { k: "0.90", v: "RAGAS faithfulness" },
        { k: "99.92%", v: "platform uptime" }
      ],
      highlights: [
        "Router agent with coreference resolution, query decomposition, and domain-glossary-aware intent classification",
        "Hybrid retrieval (vector + BM25 + semantic reranker) with version-aware chunking and cross-document resolution",
        "XGBoost transit-time model with point-in-time feature store, regime detection, and weighted rapid-retrain under disruption",
        "OpenTelemetry tracing across APIM → agents → tools → LLM, with Grafana KPI dashboards and A/B feature flags"
      ],
      stack: ["Azure OpenAI (GPT-4o)", "LangGraph", "LangChain", "LlamaIndex", "OpenAI Agents SDK", "MCP", "Azure AI Search", "Azure ML Feature Store", "XGBoost", "Apache Airflow", "Azure Event Hub", "Spark Structured Streaming", "MLflow", "RAGAS", "Promptfoo", "OpenTelemetry", "Azure Monitor"]
    },
    {
      id: "P02",
      title: "Clinical Knowledge & Coding Assistant",
      tagline: "Medical NLP platform for a UK private hospital group",
      description: "Built a clinical-knowledge assistant and an intelligent coding workflow over millions of unstructured medical documents — discharge letters, pathology reports, consultation notes. Combined a domain-specific medical NLP pipeline (spelling correction, abbreviation expansion, section detection, PII de-identification) with a grounded RAG assistant for clinicians and coders, integrating voice-in / voice-out for hands-free use.",
      duration: "Apr 2023 — Jul 2024",
      role: "Senior AI Data Scientist / NLP",
      hero: "health",
      metrics: [
        { k: "+40%", v: "data quality lift" },
        { k: "−30%", v: "response latency" },
        { k: "12+", v: "hospitals deployed" },
        { k: "200k+", v: "episodes / year processed" },
        { k: "GPT-4", v: "grounded RAG core" }
      ],
      highlights: [
        "Medical spell-correction using SNOMED CT + BNF dictionaries with bigram LM for context-aware fixes",
        "Context-aware abbreviation disambiguation (e.g. 'MS' → neurology vs. cardiology) and section classifier",
        "Domain-specific RAG on healthcare corpus with Pinecone, hybrid retrieval, and strict groundedness checks",
        "Automated suggestions for OPCS-4 / ICD-10 codes with human-in-the-loop coder validation"
      ],
      stack: ["Python", "GPT-4 / GPT-3.5", "Pinecone", "LangChain", "LangGraph", "LangSmith", "spaCy", "AWS Redshift", "Speech-to-Text / TTS APIs", "SNOMED CT", "BNF"]
    },
    {
      id: "P03",
      title: "Socioeconomic Market Segmentation & Forecasting",
      tagline: "Analytics platform for a global semiconductor licensor",
      description: "Unified socioeconomic data across 150+ countries and 2,000+ sub-regions from 12+ public and private sources, and built a segmentation + forecasting engine for strategic market planning. Combined an ensemble of clustering algorithms with stage-aware KNN regression to impute missing values and forecast technology-adoption trajectories.",
      duration: "Dec 2020 — Jan 2022",
      role: "Machine Learning Engineer",
      hero: "data",
      metrics: [
        { k: "150+", v: "countries integrated" },
        { k: "0.86", v: "cluster stability (ARI)" },
        { k: "7.2%", v: "imputation MAPE" },
        { k: "9.8%", v: "1-yr forecast MAPE" },
        { k: "95%", v: "pipeline automation" }
      ],
      highlights: [
        "Hierarchical imputation for sub-national gaps using population / urbanisation / nightlight proxies with confidence flags",
        "Structural-break detection (CUSUM + Bai-Perron) to handle GDP rebasings and definition changes",
        "Consensus segmentation across K-Means / GMM / DBSCAN with PCA + UMAP dim-reduction",
        "Stage-stratified KNN forecasting respecting S-curve technology adoption dynamics"
      ],
      stack: ["Python", "scikit-learn", "SciPy", "statsmodels", "pandas", "NumPy", "Plotly Dash", "GeoPandas", "UMAP", "Airflow", "Snowflake"]
    }
  ],

  skillClusters: [
    { name: "Generative AI & LLMs", color: "blue", items: ["GPT-4", "GPT-3.5", "Claude", "LLaMA", "Mistral", "Fine-tuning", "RLHF", "DPO", "Prompt Engineering", "RAG", "Transformers", "Programmatic LLM Eval"] },
    { name: "Agent Frameworks", color: "teal", items: ["LangChain", "LangGraph", "LlamaIndex", "CrewAI", "AutoGen", "OpenAI Agents SDK", "Model Context Protocol", "Dify", "n8n"] },
    { name: "ML & Deep Learning", color: "violet", items: ["PyTorch", "TensorFlow", "scikit-learn", "Recommenders", "Computer Vision (YOLO, Faster R-CNN)", "NLP", "Clustering (K-Means, DBSCAN, GMM)", "RL (Q-learning, Policy Gradients, RLlib)"] },
    { name: "MLOps & Infra", color: "amber", items: ["MLflow", "Azure DevOps", "GitHub Actions", "CI/CD", "Model Registry", "A/B Testing", "OpenTelemetry", "Drift Detection", "Docker", "Kubernetes / AKS"] },
    { name: "Cloud & Data", color: "rose", items: ["Azure (AI Search, OpenAI, Functions, AKS, Key Vault, APIM, Monitor)", "AWS (Redshift)", "Airflow", "Spark", "ADLS Gen2", "ETL / ELT", "Pinecone", "Hybrid Search"] },
    { name: "Governance & Eval", color: "slate", items: ["RAGAS", "Promptfoo", "Red-teaming", "HITL Review", "Microsoft Purview", "GDPR", "PII Redaction", "Azure RBAC", "Responsible AI Guardrails"] }
  ],

  impact: [
    { k: "5+", v: "years shipping production AI" },
    { k: "99.9%", v: "uptime on enterprise AI systems" },
    { k: "−30%", v: "latency across RAG + agent pipelines" },
    { k: "4", v: "domains: consulting · logistics · health · silicon" }
  ],

  education: [
    { degree: "MSc Data Science & Machine Learning (Distinction)", school: "Anglia Ruskin University", place: "Cambridge, UK" },
    { degree: "BSc Nautical Science", school: "Hindustan Institute of Maritime Training", place: "India · 2013–2017" }
  ],

  publications: [
    { title: "Assessing Performance Metrics in Classification Models", note: "Published research contributing to ML classification best practices." }
  ]
};
