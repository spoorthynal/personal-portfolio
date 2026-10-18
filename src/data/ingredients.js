// Each ingredient maps to a portfolio section. `to` is an in-page section anchor;
// `href` + `external: true` is an outbound link (resume file, GitHub, LinkedIn).
export const MAP = {
  granola: {
    section: "GitHub",
    color: "#C89B6B",
    emoji: "🌾",
    label: "Granola",
    href: "https://github.com/spoorthynal", // TODO: your GitHub profile URL
    external: true,
  },
  blueberry: {
    section: "LinkedIn",
    color: "#5B6FB0",
    emoji: "🫐",
    label: "Blueberries",
    href: "https://www.linkedin.com/in/spoorthy-nalumachu",
    external: true,
  },
  strawberry: {
    section: "Work",
    color: "#E4586B",
    emoji: "🍓",
    label: "Strawberries",
    to: "#work",
  },
  coconut: {
    section: "Contact",
    color: "#8FB63C",
    emoji: "🥥",
    label: "Coconut",
    to: "#contact",
  },
  banana: {
    section: "Resume",
    color: "#F2D479",
    emoji: "🍌",
    label: "Banana",
    href: "#", // TODO: link to your resume PDF (e.g. "/resume.pdf" in /public)
    external: true,
  },
  acai: {
    section: "About",
    color: "#942193",
    emoji: "🥣",
    label: "Açaí base",
    to: "#about",
  },
};

export const LEFT = ["acai", "strawberry", "banana"];
export const RIGHT = ["blueberry", "granola", "coconut"];
export const ORDER = [...LEFT, ...RIGHT];
