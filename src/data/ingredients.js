// Each ingredient maps to a portfolio section. `to` is an internal route;
// `href` + `external: true` is an outbound link (resume file, GitHub, LinkedIn).
export const MAP = {
  granola: {
    section: "Resume",
    color: "#C89B6B",
    emoji: "🌾",
    label: "Granola",
    blurb: "The base of it all — education, experience, skills.",
    href: "#", // TODO: link to your resume PDF (e.g. "/resume.pdf" in /public)
    external: true,
  },
  blueberry: {
    section: "Projects",
    color: "#5B6FB0",
    emoji: "🫐",
    label: "Blueberries",
    blurb: "The colorful highlights — things I've built.",
    to: "/projects",
  },
  strawberry: {
    section: "GitHub",
    color: "#E4586B",
    emoji: "🍓",
    label: "Strawberries",
    blurb: "Where the code lives — repos & commits.",
    href: "#", // TODO: your GitHub profile URL
    external: true,
  },
  kiwi: {
    section: "LinkedIn",
    color: "#8FB63C",
    emoji: "🥝",
    label: "Kiwi",
    blurb: "Let's connect professionally.",
    href: "#", // TODO: your LinkedIn profile URL
    external: true,
  },
  banana: {
    section: "Contact",
    color: "#F2D479",
    emoji: "🍌",
    label: "Banana",
    blurb: "Say hi — always room for more.",
    to: "/contact",
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

export const LEFT = ["granola", "blueberry", "acai"];
export const RIGHT = ["strawberry", "kiwi", "banana"];
export const ORDER = [...LEFT, ...RIGHT];
