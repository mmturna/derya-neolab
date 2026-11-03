// Shared routing for the five Bell Labs versions: each version renders home, vision, principles and about.
export type Section = "home" | "vision" | "principles" | "about";

export const SECTIONS: Section[] = ["home", "vision", "principles", "about"];

export const VERSIONS = [
  { slug: "memo", name: "Memorandum", note: "A typed internal memo. The pages are its attachments." },
  { slug: "manual", name: "Manual", note: "A typeset page from a programmer's manual." },
  { slug: "journal", name: "Journal", note: "The cover and articles of a technical journal." },
  { slug: "printout", name: "Printout", note: "A line printer run on green-bar fanfold paper." },
  { slug: "drawing", name: "Drawing", note: "An engineering drawing in four sheets." },
] as const;

export type Version = (typeof VERSIONS)[number]["slug"];

type Params = Promise<{ page?: string[] }>;

export function sectionParams() {
  return SECTIONS.map((section) => ({ page: section === "home" ? [] : [section] }));
}

export async function sectionOf(params: Params): Promise<Section> {
  const slug = (await params).page?.[0];
  return SECTIONS.find((section) => section === slug) ?? "home";
}

export function href(version: Version, section: Section) {
  return section === "home" ? `/bell/${version}/` : `/bell/${version}/${section}/`;
}
