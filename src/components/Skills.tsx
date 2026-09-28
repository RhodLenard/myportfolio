import { skills } from '../data/skills'

export function Skills() {
  return <section id="skills" aria-labelledby="skills-title"><div className="wrap"><p className="eyebrow">Tech stack</p><h2 id="skills-title">My skills</h2><p className="lead lead--compact">Tools I reach for most often.</p><div className="skills">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></section>
}
