import { projects } from '../data/projects'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <p className="eyebrow">Portfolio</p><h2 id="projects-title">Featured projects</h2><p className="lead">Selected work across web development, software systems, mobile experiences, and interface engineering.</p>
        <div>
          {projects.map((project, index) => {
            const initials = project.title.split(' ').map((word) => word[0]).join('')
            return <article className="project" key={project.title}>
              <div className="project__copy"><span className="project__number">{String(index + 1).padStart(2, '0')} · {project.type}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="project__link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <span aria-hidden="true">→</span></a></div>
              {project.livePreview ? (
                <a className="project__preview project__preview--live" href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live site`}>
                  <iframe src={project.livePreview} title={`Live preview of ${project.title}`} loading="lazy" tabIndex={-1} sandbox="allow-scripts allow-same-origin" />
                </a>
              ) : (
                <div className="project__preview" style={{ background: `linear-gradient(135deg, ${project.colors[0]}, ${project.colors[1]})` }} aria-hidden="true"><span>{initials}</span></div>
              )}
            </article>
          })}
        </div>
      </div>
    </section>
  )
}
