// Manual version: its own page list, since it has more pages than the other four versions.
export const PAGES = [
  { slug: "", cmd: "derya", title: "Home", summary: "intelligence for the companies that build the physical world" },
  { slug: "manifesto", cmd: "manifesto", title: "Manifesto", summary: "why the physical world needs its own intelligence" },
  { slug: "principles", cmd: "principles", title: "Principles", summary: "five rules every agent follows" },
  { slug: "who-we-help", cmd: "who", title: "Who we help", summary: "the manufacturers and people Derya works for" },
  { slug: "research", cmd: "research", title: "Research", summary: "papers and notes from the lab" },
  { slug: "about", cmd: "about", title: "About", summary: "a small company working on an old industry" },
] as const;

export type Page = (typeof PAGES)[number];

export function pageParams() {
  return PAGES.map((p) => ({ page: p.slug ? [p.slug] : [] }));
}

export async function pageOf(params: Promise<{ page?: string[] }>): Promise<Page> {
  const slug = (await params).page?.[0] ?? "";
  return PAGES.find((p) => p.slug === slug) ?? PAGES[0];
}

export function pageHref(p: Page) {
  return p.slug ? `/bell/manual/${p.slug}/` : "/bell/manual/";
}
