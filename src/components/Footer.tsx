import { site } from '../data/site'

const socialLinks = [
  {
    label: 'Facebook',
    href: site.social.facebook,
    icon: <path fill="currentColor" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.24 0-1.62.77-1.62 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />,
  },
  {
    label: 'Instagram',
    href: site.social.instagram,
    icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
  },
  {
    label: 'LinkedIn',
    href: site.social.linkedin,
    icon: <path fill="currentColor" d="M6.5 8.3H3.2V19h3.3V8.3ZM4.85 3A1.93 1.93 0 1 0 4.85 6.86 1.93 1.93 0 0 0 4.85 3ZM19.8 12.85c0-3.22-1.72-4.72-4.02-4.72a3.48 3.48 0 0 0-3.16 1.74V8.3H9.3V19h3.32v-5.3c0-1.4.27-2.77 2.02-2.77 1.72 0 1.74 1.61 1.74 2.86V19h3.32l.1-6.15Z" />,
  },
  {
    label: 'GitHub',
    href: site.social.github,
    icon: <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />,
  },
] as const

export function Footer() {
  return (
    <footer>
      <div className="wrap footer__inner">
        <span>© {site.year} {site.fullName}</span>
        <div className="footer__links" aria-label="Social profiles">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`Visit ${site.fullName} on ${social.label}`} title={social.label}>
              <svg viewBox="0 0 24 24" aria-hidden="true">{social.icon}</svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
