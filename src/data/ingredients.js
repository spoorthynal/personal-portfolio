// Each ingredient maps to a portfolio section. `to` is an internal route;
// `href` + `external: true` is an outbound link (resume file, GitHub, LinkedIn).
export const MAP = {
  granola: {
    section: "GitHub",
    color: "#C89B6B",
    emoji: "🌾",
    label: "Granola",
    blurb: "Where the code lives — repos & commits.",
    href: "#", // TODO: your GitHub profile URL
    external: true,
  },
  blueberry: {
    section: "LinkedIn",
    color: "#5B6FB0",
    emoji: "🫐",
    label: "Blueberries",
    blurb: "Let's connect professionally.",
    href: "#", // TODO: your LinkedIn profile URL
    external: true,
  },
  strawberry: {
    section: "Projects",
    color: "#E4586B",
    emoji: "🍓",
    label: "Strawberries",
    blurb: "The colorful highlights — things I've built.",
    to: "/projects",
  },
  coconut: {
    section: "Contact",
    color: "#8FB63C",
    emoji: "🥥",
    label: "Coconut",
    blurb: "Say hi — always room for more.",
    to: "/contact",
  },
  banana: {
    section: "Resume",
    color: "#F2D479",
    emoji: "🍌",
    label: "Banana",
    blurb: "The base of it all — education, experience, skills.",
    href: "#", // TODO: link to your resume PDF (e.g. "/resume.pdf" in /public)
    external: true,
  },
  acai: {
    section: "About",
    color: "#942193",
    emoji: "🥣",
    label: "Açaí base",
    blurb: "Who I am beneath it all.",
    to: "/about",
  },
};

export const LEFT = ["acai", "strawberry", "banana"];
export const RIGHT = ["blueberry", "granola", "coconut"];
export const ORDER = [...LEFT, ...RIGHT];
