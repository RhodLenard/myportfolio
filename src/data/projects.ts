export type Project = {
  type: string
  title: string
  description: string
  tags: string[]
  link: string
  linkLabel: string
  colors: [string, string]
}

const sourceProjectLink = 'https://rhodlenard.me/#projects'

export const projects: Project[] = [
  {
    type: 'Web Development',
    title: 'AI-Powered Analytics Dashboard',
    description: 'A responsive analytics platform that turns complex data into clear visual insights, with accessible navigation and fast client-side interactions.',
    tags: ['React', 'TypeScript', 'D3.js', 'Responsive UI'],
    link: sourceProjectLink,
    linkLabel: 'View project',
    colors: ['#d97757', '#e9a67f'],
  },
  {
    type: 'Software Development',
    title: 'Real-time Collaboration Tool',
    description: 'A structured collaboration system with live updates, comments, persistent data, and reusable services designed for maintainability.',
    tags: ['Node.js', 'WebSockets', 'PostgreSQL', 'REST API'],
    link: sourceProjectLink,
    linkLabel: 'View project',
    colors: ['#6b7bd9', '#a7b0f0'],
  },
  {
    type: 'Mobile Development',
    title: 'Mobile Commerce Experience',
    description: 'A cross-platform shopping experience designed for touch, simple navigation, secure account flows, and reliable performance on mobile devices.',
    tags: ['React Native', 'Expo', 'Mobile UI', 'Firebase'],
    link: sourceProjectLink,
    linkLabel: 'View project',
    colors: ['#4c9b82', '#8fd0b7'],
  },
  {
    type: 'UI Engineering',
    title: 'Motion Design System',
    description: 'A reusable component library connecting product design with web and mobile implementation through shared patterns and accessible interactions.',
    tags: ['React', 'Storybook', 'Motion', 'Accessibility'],
    link: sourceProjectLink,
    linkLabel: 'View project',
    colors: ['#b4658f', '#e2a3c4'],
  },
]
