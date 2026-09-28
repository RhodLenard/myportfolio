export const site = {
  name: "Rhod Lenard",
  fullName: "Rhod Lenard Villanueva",
  initials: "RL",
  role: "Web Developer",
  email: "villanuevarhodlenard@gmail.com",
  gmailComposeUrl:
    "https://mail.google.com/mail/u/0/?extsrc=mailto&url=mailto%3Avillanuevarhodlenard%40gmail.com",
  location: {
    city: "Quezon City",
    country: "Philippines",
    coordinates: "Available for remote collaboration",
  },
  intro: "Crafting digital experiences where design meets innovation.",
  availability: "Have a project in mind? Let’s bring it to life.",
  about: {
    eyebrow: "About",
    title: "Design sense, engineering habits.",
    lead: "I’m a passionate developer who believes in pushing the boundaries of web experiences, where creativity meets technical precision.",
    portraitHint: "Hover to read more",
    details: [
      {
        title: "10+ projects",
        text: "Completed projects spanning modern web products and immersive digital experiences.",
      },
      {
        title: "1 year",
        text: "Experience creating polished applications that perform across devices.",
      },
      {
        title: "5+ clients",
        text: "Happy clients helped through creative design and reliable development.",
      },
    ],
    craft:
      "I specialize in immersive digital experiences that look stunning and perform flawlessly, using modern frontend, backend, and cloud tooling.",
    mindset:
      "My work sits at the intersection of design and code, combining creativity, innovation, and technical precision.",
    hobbies: ["Design", "Innovation", "Performance"],
  },
  contact: {
    title: "Let’s create something amazing.",
    text: "Have a project in mind? Let’s discuss how we can bring your ideas to life with cutting-edge technology and creative design.",
  },
  social: { github: "", linkedin: "" },
  year: 2026,
} as const;

export const navigation = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Other", id: "other" },
] as const;

export const craftTags = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Git",
  "Vercel",
];

export const exploreCards = [
  {
    title: "Guestbook",
    text: "Leave a note and read what others wrote.",
    href: "/guestbook",
  },
  {
    title: "Achievements",
    text: "Milestones, certificates and awards.",
    href: "/achievements",
  },
  { title: "My links", text: "Find me across the web.", href: "/links" },
];
