// Shared copy for both site versions: the vision essay, the principles and the about text.
export const STATEMENT = "Intelligence for the companies that build the physical world.";
export const SUPPORT = "We are building agents that work beside the people who sell what factories make.";

export const VISION_TITLE = "The physical world is built by companies most people never hear of.";
export const VISION = [
  "Behind every bridge, turbine and hospital there is a manufacturer that machined a part, cast a housing or wound a coil. These companies are old, specialised and quietly essential. Their engineering is precise. The work around it, the commercial work, still runs on inboxes, spreadsheets and the memory of a few people who have been there for thirty years.",
  "That memory is the real asset. Which materials a customer accepts. Which tolerances are worth a conversation. What a job cost the last time, and why it was won or lost. It lives in people and in decades of documents, and it walks out the door when they retire.",
  "We think the next generation of industrial companies will keep that knowledge in systems that can read it, reason over it and act on it. The people who hold it stay in charge. The systems give each of them the reach of a whole department.",
  "Derya is building those systems: agents that work beside commercial teams, read what comes in, find what matters and prepare the work for a person to judge. Every fact they use points back to where it came from. Nothing leaves without a person saying yes.",
  "We are starting where industrial companies win or lose their work. Over time we want Derya to be the place where a manufacturer's commercial knowledge lives, and where it compounds instead of fading.",
];

export const PRINCIPLES_TITLE = "How our agents work.";
export const PRINCIPLES = [
  {
    name: "Sources first",
    text: "Every fact an agent uses points to the page, message or record it came from. What cannot be found stays unknown. It is never guessed.",
  },
  {
    name: "People decide",
    text: "Agents prepare the work. A person approves anything that reaches a customer or a supplier.",
  },
  {
    name: "Rules are written down",
    text: "Prices and commitments come from the company's own rules, kept as plain, predictable logic. Models read, draft and explain. They do not invent the numbers.",
  },
  {
    name: "Each company is its own world",
    text: "What one manufacturer teaches Derya stays with that manufacturer.",
  },
  {
    name: "Meet the work where it is",
    text: "Commercial work lives in email and documents. Derya reads it there instead of asking a team to move.",
  },
];

export const ABOUT_TITLE = "A small company working on an old industry.";
export const ABOUT = [
  "Derya builds agents for the commercial side of industrial manufacturing. It was founded by Mert Turna. We are early, and deliberately small.",
  "The name is the Turkish word for the sea. Most of what factories make crosses one on the way to where it is used.",
];

export const WHO_TITLE = "Manufacturers that make things to order, and the people who sell them.";
export const WHO_INTRO =
  "Derya is for industrial companies whose products are engineered, specified and priced job by job. Their commercial teams are small, expert and stretched.";
export const WHO_COMPANIES = [
  "Machine shops and fabricators",
  "Foundries and forges",
  "Makers of motors, pumps, valves and switchgear",
  "Component suppliers to energy, infrastructure and transport",
];
export const WHO_PEOPLE = [
  { role: "Sales engineers", text: "Read specifications and drawings to work out what a customer actually needs." },
  { role: "Estimators", text: "Turn requirements into a cost they can stand behind." },
  { role: "Inside sales", text: "Answer the steady flow of customer email, every day." },
  { role: "Tender teams", text: "Work through long public tenders against a deadline." },
  { role: "Commercial leads", text: "Decide which work is worth chasing." },
];
export const WHO_CLOSE = "Derya's agents do the reading and the preparation. The people above make every call.";

export const RESEARCH_TITLE = "Notes from the lab.";
export const RESEARCH_INTRO = "We publish what we learn about agents that act on changing facts, including the results that came out null.";
export const RESEARCH = [
  {
    year: "2026",
    title: "When Must an Agent Remember?",
    kind: "Paper",
    text: "When the facts behind a job keep changing, does giving an agent a compact record of the current state help it take the right action, compared with searching its full history?",
    href: null,
    status: "Not yet public",
  },
  {
    year: "2026",
    title: "Corvus: successful but inapplicable memories",
    kind: "Research note",
    text: "An agent is shown a past case that succeeded. The current case looks the same, but calls for a different action. Does the agent copy the precedent?",
    href: "https://mmturna.github.io/corvus/",
    status: "Read",
  },
] as const;
