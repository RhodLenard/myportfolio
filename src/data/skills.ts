export type SkillGroup = {
  title: string
  description: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Web development',
    description: 'Responsive interfaces and full-stack web applications built for accessibility, performance, and maintainability.',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Accessibility'],
  },
  {
    title: 'Software development',
    description: 'Application architecture, backend services, databases, authentication, testing, and dependable development workflows.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'PostgreSQL', 'Prisma', 'Redis', 'JWT', 'Jest', 'Git'],
  },
  {
    title: 'Mobile development',
    description: 'Touch-friendly, cross-platform experiences with responsive layouts and integrations for modern mobile products.',
    skills: ['React Native', 'Expo', 'Mobile UI', 'Firebase', 'Push Notifications', 'Offline Support', 'PWA'],
  },
  {
    title: 'Tools and deployment',
    description: 'Tools used to design, test, automate, and ship reliable products from idea to production.',
    skills: ['Figma', 'Docker', 'GitHub Actions', 'Vercel', 'AWS', 'Cypress', 'React Testing Library'],
  },
]
