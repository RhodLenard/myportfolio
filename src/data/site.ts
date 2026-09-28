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
    lead: "I'm a developer focused on building useful digital products across the web, software systems, and mobile experiences, where thoughtful design meets dependable engineering.",
    portraitHint: "Hover to read more",
    details: [
      {
        title: "Web development",
        text: "Responsive, accessible websites and web applications built for speed, usability, and a consistent experience across browsers.",
      },
      {
        title: "Software development",
        text: "Maintainable applications, APIs, databases, and business logic designed around clear structure and reliable performance.",
      },
      {
        title: "Mobile development",
        text: "Mobile-first and cross-platform experiences with intuitive navigation, responsive interfaces, and practical offline-friendly features.",
      },
    ],
    craft:
      "I build complete digital products—from responsive interfaces and mobile experiences to backend services, databases, testing, and deployment.",
    mindset:
      "I approach web, software, and mobile development with the same priorities: understand the problem, keep the experience simple, and write code that can grow.",
    hobbies: ["Web", "Software", "Mobile"],
  },
  contact: {
    title: "Let’s create something amazing.",
    text: "Have a project in mind? Let’s discuss how we can bring your ideas to life with cutting-edge technology and creative design.",
  },
  social: {
    facebook: "https://www.facebook.com/rhodlenard.delasnieves",
    instagram: "https://www.instagram.com/rhodlenard/?hl=en",
    linkedin: "https://www.linkedin.com/in/rhod-lenard-villanueva-92878a33b/",
    github: "https://github.com/RhodLenard",
  },
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
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "React Native",
  "Expo",
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
