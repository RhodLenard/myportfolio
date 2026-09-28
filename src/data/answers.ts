export type Answer = { keywords: string[]; text: string; section: string }

export const answers: Answer[] = [
  { keywords: ['work', 'project', 'portfolio'], text: 'My featured work includes an AI analytics dashboard, a Web3 shopping experience, a motion design system, and a real-time collaboration tool.', section: 'projects' },
  { keywords: ['about', 'who', 'background', 'experience'], text: 'I’m a software developer with over five years of experience, focused on digital experiences where creativity meets technical precision.', section: 'about' },
  { keywords: ['skill', 'stack', 'technology', 'tech', 'mobile', 'software'], text: 'I work across web, software, and mobile development using React, TypeScript, Node.js, PostgreSQL, React Native, Expo, testing, and cloud deployment.', section: 'skills' },
  { keywords: ['hire', 'contact', 'email', 'book', 'call'], text: 'I’m available to discuss new projects. You can reach me at villanuevarhodlenard@gmail.com.', section: 'contact' },
]

export const fallbackAnswer = 'I don’t have a written answer for that yet. Try asking about my work, background, skills, or contact details.'
