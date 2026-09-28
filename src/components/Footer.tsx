import { site } from '../data/site'

export function Footer() {
  return <footer><div className="wrap footer__inner"><span>© {site.year} {site.fullName}</span><div className="footer__links">{site.social.github && <a href={site.social.github} target="_blank" rel="noreferrer">GitHub</a>}{site.social.linkedin && <a href={site.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}<a href={site.gmailComposeUrl} target="_blank" rel="noreferrer" aria-label={`Compose an email to ${site.fullName} in Gmail`}>Email</a></div></div></footer>
}
