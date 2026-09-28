import { skillGroups } from '../data/skills'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title">
      <div className="wrap">
        <p className="eyebrow">Capabilities</p>
        <h2 id="skills-title">Web, software, and mobile skills</h2>
        <p className="lead">A practical toolkit for designing, building, testing, and shipping complete digital products.</p>
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <article className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="skills">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
