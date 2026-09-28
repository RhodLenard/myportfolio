export type Project = {
  type: string
  title: string
  description: string
  tags: string[]
  link: string
  linkLabel: string
  colors: [string, string]
}

const sourceProjectLink = 'https://rhodlenard-portfolio.vercel.app/#projects'

export const projects: Project[] = [
  { type: 'SaaS Platform', title: 'AI-Powered Analytics Dashboard', description: 'Real-time analytics dashboard with AI-driven insights and predictive modeling for enterprise clients.', tags: ['React', 'TypeScript', 'D3.js', 'Node.js'], link: sourceProjectLink, linkLabel: 'View original portfolio', colors: ['#d97757', '#e9a67f'] },
  { type: 'Web3 Application', title: 'Metaverse E-Commerce', description: 'Immersive 3D shopping experience built with Three.js and blockchain integration for NFT collectibles.', tags: ['Three.js', 'Web3', 'Solidity', 'Next.js'], link: sourceProjectLink, linkLabel: 'View original portfolio', colors: ['#6b7bd9', '#a7b0f0'] },
  { type: 'Design System', title: 'Motion Design System', description: 'Comprehensive component library with advanced animations and accessibility features for modern web apps.', tags: ['React', 'Motion', 'Storybook', 'Tailwind'], link: sourceProjectLink, linkLabel: 'View original portfolio', colors: ['#4c9b82', '#8fd0b7'] },
  { type: 'Productivity App', title: 'Real-time Collaboration Tool', description: 'Collaborative workspace with live cursors, comments, and version control.', tags: ['WebSockets', 'React', 'Canvas API', 'Redis'], link: sourceProjectLink, linkLabel: 'View original portfolio', colors: ['#b4658f', '#e2a3c4'] },
]
