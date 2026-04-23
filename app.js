const { useState } = React;

const startHereItems = [
  {
    eyebrow: "Foundation",
    title: "What is MCP?",
    description:
      "Placeholder overview text explaining the protocol, how it connects models to tools, and why teams care.",
  },
  {
    eyebrow: "System View",
    title: "How it works",
    description:
      "Placeholder explanation of prompts, connectors, tools, and workflow flow in a practical user-friendly sequence.",
  },
  {
    eyebrow: "Quick Win",
    title: "First use case",
    description:
      "Placeholder example showing one simple way a user can go from question to structured result in minutes.",
  },
  {
    eyebrow: "Get Moving",
    title: "Quick start guide",
    description:
      "Placeholder checklist for choosing a task, selecting a prompt, running a workflow, and reviewing output.",
  },
];

const categories = ["All", "Sales", "CS", "Ops", "Research"];

const promptLibrary = [
  ["Account Review Brief", "Placeholder prompt for summarizing account context, signals, and next steps.", "CS"],
  ["Deal Inspection", "Placeholder prompt for pressure-testing a live opportunity before a critical meeting.", "Sales"],
  ["Workflow Builder", "Placeholder prompt for turning a repeated manual task into a repeatable MCP sequence.", "Ops"],
  ["Customer Signal Scan", "Placeholder prompt for extracting themes and moments worth amplifying from source material.", "Research"],
  ["Tool Selection Coach", "Placeholder prompt for helping a user pick the right MCP tools for the job.", "Ops"],
  ["Meeting Prep Draft", "Placeholder prompt for building a concise prep brief with context and talking points.", "Sales"],
].map(([title, description, category]) => ({ title, description, category }));

const tools = [
  {
    name: "Prompt Runner",
    description: "Placeholder summary of the core interaction for running structured prompts.",
    details:
      "Placeholder details covering when to use it, what inputs it expects, and what a successful output looks like.",
  },
  {
    name: "Workflow Composer",
    description: "Placeholder summary of assembling repeatable multi-step MCP workflows.",
    details:
      "Placeholder details about sequencing, approvals, and how to package a winning pattern for team reuse.",
  },
  {
    name: "Connector Layer",
    description: "Placeholder summary of the systems and context sources MCP can access.",
    details:
      "Placeholder details about data boundaries, permissions, and choosing the right connector for the task.",
  },
  {
    name: "Evaluation Loop",
    description: "Placeholder summary of reviewing, refining, and operationalizing output quality.",
    details:
      "Placeholder details about QA, iteration loops, and lightweight governance for adoption.",
  },
];

const personas = [
  {
    id: "revenue",
    label: "Revenue Teams",
    cards: [
      {
        title: "Deal Coaching",
        problem: "Placeholder problem statement for speeding up deal inspection and rep guidance.",
        workflow: "Placeholder workflow: collect context, run prompt, inspect gaps, refine action plan.",
      },
      {
        title: "Meeting Preparation",
        problem: "Placeholder problem statement for assembling cleaner pre-call context faster.",
        workflow: "Placeholder workflow: gather context, summarize recent activity, generate a brief, tailor the agenda.",
      },
    ],
  },
  {
    id: "enablement",
    label: "Enablement",
    cards: [
      {
        title: "Prompt Rollout",
        problem: "Placeholder problem statement for teaching new users repeatable prompt patterns.",
        workflow: "Placeholder workflow: choose role-based prompts, pilot, gather feedback, publish standards.",
      },
      {
        title: "Call Review Support",
        problem: "Placeholder problem statement for turning source material into teaching assets more efficiently.",
        workflow: "Placeholder workflow: ingest source material, extract insights, create examples, package guidance.",
      },
    ],
  },
  {
    id: "ops",
    label: "Ops",
    cards: [
      {
        title: "Process Acceleration",
        problem: "Placeholder problem statement for repeated research and handoff steps that slow teams down.",
        workflow: "Placeholder workflow: define the trigger, map inputs, run the sequence, review and route output.",
      },
      {
        title: "Knowledge Access",
        problem: "Placeholder problem statement for scattered docs that make retrieval and reuse difficult.",
        workflow: "Placeholder workflow: connect sources, frame prompts, validate results, package for reuse.",
      },
    ],
  },
];

const workflowColumns = [
  {
    title: "Learn",
    steps: [
      "Scan a short explainer and a starter use case.",
      "Choose a prompt template matched to the job.",
      "Review the expected inputs and output shape.",
    ],
  },
  {
    title: "Try",
    steps: [
      "Run a prompt with lightweight context and safe inputs.",
      "Inspect the result for clarity, usefulness, and gaps.",
      "Tighten once before sharing or scaling.",
    ],
  },
  {
    title: "Operationalize",
    steps: [
      "Document the winning pattern as a workflow.",
      "Attach the right tools and approval points.",
      "Roll out the pattern with lightweight guidance.",
    ],
  },
];

const howToItems = [
  "Start with a narrow outcome instead of a vague broad request.",
  "Bring the right context so the output is grounded and useful.",
  "Use tools intentionally based on the job and the action boundary.",
  "Review the result, tighten the pattern, then operationalize it.",
];

const resources = [
  ["Video Walkthroughs", "Placeholder library of demos and onboarding explainers."],
  ["Slide Decks", "Placeholder location for enablement decks and internal rollouts."],
  ["Documentation", "Placeholder docs area for setup notes, FAQs, and workflow guidance."],
];

function SurfaceCard({ children, className = "" }) {
  return (
    <div className={`rounded-[28px] border border-royal/10 bg-card-surface shadow-clozd ${className}`}>
      {children}
    </div>
  );
}

function Section({ id, eyebrow, title, subtitle, action, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.26em] text-[#09b8b0]">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-charcoal sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-7 text-[#5b6770] sm:text-lg">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function PillTabs({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              active
                ? "border-blue/20 bg-blue/10 text-[#1484cd]"
                : "border-royal/10 bg-white/80 text-royal hover:border-blue/20 hover:text-[#1484cd]"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function Button({ children, primary = false }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
        primary
          ? "bg-gradient-to-r from-patina to-blue text-white shadow-glow hover:-translate-y-0.5"
          : "border border-royal/15 bg-white/80 text-royal shadow-clozd hover:border-blue/25 hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

function App() {
  const [category, setCategory] = useState("All");
  const [persona, setPersona] = useState(personas[0].id);
  const [openTool, setOpenTool] = useState(tools[0].name);

  const visiblePrompts =
    category === "All" ? promptLibrary : promptLibrary.filter((item) => item.category === category);
  const activePersona = personas.find((item) => item.id === persona) || personas[0];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-royal/10 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-patina to-royal text-white shadow-glow">
              M
            </div>
            <div>
              <p className="text-sm font-bold tracking-[-0.03em] text-charcoal">MCP Playbook</p>
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Enablement Hub</p>
            </div>
          </div>
          <nav className="hidden items-center gap-2 lg:flex">
            {["Start Here", "Prompt Library", "Tools", "Use Cases", "Workflows", "Resources"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full border border-royal/12 bg-white/75 px-4 py-2 text-sm font-semibold text-royal shadow-[0_4px_14px_rgba(39,79,219,0.06)] transition hover:border-blue/20 hover:bg-blue/10 hover:text-[#1484cd]"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SurfaceCard className="overflow-hidden">
          <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.15fr)_360px] lg:px-10 lg:py-12">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-royal/10 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#09b8b0]">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-patina to-blue"></span>
                Practical Resource Center
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-charcoal sm:text-6xl">
                MCP <span className="bg-gradient-to-r from-patina to-blue bg-clip-text text-transparent">Playbook</span>
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#57636d] sm:text-xl">
                Placeholder subtitle explaining what MCP is, why it matters, and how this playbook helps teams learn,
                try, and operationalize MCP-powered workflows with less friction.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Prompt libraries", "Tool-by-tool guidance", "Use-case workflows", "Operational playbooks"].map(
                  (pill) => (
                    <span key={pill} className="rounded-full border border-royal/10 bg-white/75 px-4 py-2 text-sm font-medium text-[#44515b]">
                      {pill}
                    </span>
                  ),
                )}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button primary>Get Started</Button>
                <Button>Explore Prompts</Button>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-[26px] bg-hero-accent p-6 text-white shadow-glow">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Playbook Snapshot</p>
                <div className="mt-4 text-5xl font-semibold tracking-[-0.06em]">3 Paths</div>
                <p className="mt-3 text-sm leading-7 text-white/85">
                  Placeholder summary of the core arc: understand MCP, test a practical use case, and convert the
                  result into a repeatable operating pattern.
                </p>
              </div>
              {[
                ["Primary outcome", "Help users go from curiosity to first workflow quickly."],
                ["Best for", "Teams that need practical examples, not abstract platform language."],
                ["Experience goal", "Make the page feel like a clear working guide rather than a splashy campaign site."],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[22px] border border-royal/10 bg-white/78 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-charcoal">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <Section
          id="start-here"
          eyebrow="Start Here"
          title="A fast path for new users to understand the system and get moving."
          subtitle="This opening section should reduce hesitation, establish the basics, and point people toward one confident first action."
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {startHereItems.map((item) => (
              <SurfaceCard key={item.title} className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-patina/15 to-blue/15 text-[#1484cd]">
                  ●
                </div>
                <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#09b8b0]">{item.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5c6973]">{item.description}</p>
              </SurfaceCard>
            ))}
          </div>
        </Section>

        <Section
          id="prompt-library"
          eyebrow="Prompt Library"
          title="Reusable prompts organized like working assets, not hidden templates."
          subtitle="Users should be able to browse by category, understand what each prompt is for, and copy one into action immediately."
          action={<PillTabs options={categories} value={category} onChange={setCategory} />}
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visiblePrompts.map((item) => (
              <SurfaceCard key={item.title} className="flex h-full flex-col p-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-royal">{item.category}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-charcoal">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#5d6a74]">{item.description}</p>
                <div className="mt-auto pt-6">
                  <Button>Copy Prompt</Button>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </Section>

        <Section
          id="tools"
          eyebrow="Tools Overview"
          title="A practical explanation of the MCP building blocks users interact with."
          subtitle="This section should help users understand the tool landscape without turning into documentation overload."
        >
          <SurfaceCard className="p-4 sm:p-5">
            <div className="grid gap-3">
              {tools.map((tool) => {
                const isOpen = openTool === tool.name;
                return (
                  <div key={tool.name} className="rounded-[22px] border border-royal/10 bg-white/80">
                    <button
                      onClick={() => setOpenTool(isOpen ? "" : tool.name)}
                      className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left"
                    >
                      <div>
                        <h3 className="text-lg font-semibold tracking-[-0.02em] text-charcoal">{tool.name}</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#62707a]">{tool.description}</p>
                      </div>
                      <span className="rounded-full border border-royal/10 bg-white px-3 py-2 text-sm text-royal">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen ? (
                      <div className="border-t border-royal/10 px-5 py-4 text-sm leading-7 text-[#4f5c66]">{tool.details}</div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </SurfaceCard>
        </Section>

        <Section
          id="use-cases"
          eyebrow="Use Cases"
          title="Realistic application patterns organized by who is trying to get the job done."
          subtitle="Persona-based grouping keeps the page useful for mixed audiences and makes the next step feel obvious."
          action={<PillTabs options={personas.map((item) => item.label)} value={activePersona.label} onChange={(label) => setPersona((personas.find((item) => item.label === label) || personas[0]).id)} />}
        >
          <div className="grid gap-5 lg:grid-cols-2">
            {activePersona.cards.map((card) => (
              <SurfaceCard key={card.title} className="p-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#09b8b0]">{activePersona.label}</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-charcoal">{card.title}</h3>
                <div className="mt-5 space-y-4">
                  <div className="rounded-[22px] border border-royal/10 bg-white/80 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Problem</p>
                    <p className="mt-2 text-sm leading-7 text-[#57636d]">{card.problem}</p>
                  </div>
                  <div className="rounded-[22px] border border-royal/10 bg-gradient-to-b from-white/95 to-blue/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Example workflow</p>
                    <p className="mt-2 text-sm leading-7 text-[#57636d]">{card.workflow}</p>
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </Section>

        <Section
          id="workflows"
          eyebrow="Workflows"
          title="Step-based patterns that show how MCP goes from idea to repeatable execution."
          subtitle="This should feel procedural and usable, with enough structure that a team can map the pattern into real operations."
        >
          <div className="grid gap-5 xl:grid-cols-3">
            {workflowColumns.map((column, columnIndex) => (
              <SurfaceCard key={column.title} className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-royal/15 to-patina/15 text-lg font-semibold text-[#1484cd]">
                    {columnIndex + 1}
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-charcoal">{column.title}</h3>
                </div>
                <div className="mt-6 space-y-4">
                  {column.steps.map((step, stepIndex) => (
                    <div key={step} className="rounded-[22px] border border-royal/10 bg-white/80 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Step {stepIndex + 1}</p>
                      <p className="mt-2 text-sm leading-7 text-[#55616b]">{step}</p>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            ))}
          </div>
        </Section>

        <Section
          id="how-to-use-mcp"
          eyebrow="How To Use MCP"
          title="Simple guidance that helps users work with MCP more effectively from day one."
          subtitle="This section is intentionally instructional and low-drama. It should teach the behavior that leads to better outcomes."
        >
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <SurfaceCard className="p-6 sm:p-8">
              <div className="space-y-4">
                {howToItems.map((item, index) => (
                  <div key={item} className="rounded-[24px] border border-royal/10 bg-white/80 p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-patina/15 to-blue/15 text-sm font-bold text-[#1484cd]">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-7 text-[#5c6872]">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SurfaceCard>
            <SurfaceCard className="p-6 sm:p-8">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#09b8b0]">Usage Notes</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-charcoal">
                Keep the guidance short, practical, and easy to reuse.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#58646e]">
                Placeholder space for lightweight instruction, guardrails, and examples of what good MCP usage looks
                like when a team starts to operationalize it.
              </p>
              <div className="mt-6 grid gap-4">
                {["Example input checklist", "Prompt writing dos and don'ts", "When to use a workflow vs. a single prompt"].map(
                  (item) => (
                    <div key={item} className="rounded-[22px] border border-royal/10 bg-gradient-to-b from-white/95 to-blue/5 px-4 py-4 text-sm font-medium text-[#23303a]">
                      {item}
                    </div>
                  ),
                )}
              </div>
            </SurfaceCard>
          </div>
        </Section>

        <Section
          id="resources"
          eyebrow="Resources"
          title="Supporting materials users can grab when they need more context or team-ready assets."
          subtitle="Videos, decks, and documentation should feel close to the workflows, not buried in a disconnected appendix."
        >
          <div className="grid gap-5 md:grid-cols-3">
            {resources.map(([title, description]) => (
              <SurfaceCard key={title} className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-royal/15 to-blue/15 text-[#1484cd]">
                  □
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-charcoal">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5c6872]">{description}</p>
                <button className="mt-6 text-sm font-semibold text-royal transition hover:text-[#1484cd]">
                  View resource
                </button>
              </SurfaceCard>
            ))}
          </div>
        </Section>

        <SurfaceCard className="overflow-hidden">
          <div className="grid gap-6 bg-gradient-to-br from-white to-blue/10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#09b8b0]">Ready To Try</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-charcoal sm:text-4xl">
                Turn the first useful MCP pattern into a working team workflow.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#56626c]">
                Placeholder CTA copy that nudges the user from learning mode into hands-on experimentation with a
                guided first workflow.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button primary>Try Your First Workflow</Button>
            </div>
          </div>
        </SurfaceCard>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
