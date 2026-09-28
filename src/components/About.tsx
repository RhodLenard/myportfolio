import { useState } from 'react'
import { craftTags, site } from '../data/site'

export function About() {
  const [portraitOpen, setPortraitOpen] = useState(false)
  const togglePortrait = () => setPortraitOpen((open) => !open)
  return (
    <section id="about" aria-labelledby="about-title">
      <div className="wrap">
        <p className="eyebrow">{site.about.eyebrow}</p>
        <h2 id="about-title">{site.about.title}</h2>
        <p className="lead">{site.about.lead}</p>
        <div className="bento">
          <button className={`card portrait${portraitOpen ? ' portrait--open' : ''}`} type="button" onClick={togglePortrait} aria-expanded={portraitOpen}>
            <span className="portrait__initials">{site.initials}</span>
            <span className="portrait__hint">{site.about.portraitHint}</span>
            <span className="portrait__overlay">
              {site.about.details.map((detail) => <span className="portrait__detail" key={detail.title}><strong>{detail.title}</strong><span>{detail.text}</span></span>)}
            </span>
          </button>
          <article className="card craft">
            <h3>Craft</h3><p>{site.about.craft}</p>
            <div className="marquee"><div className="marquee__track">{[...craftTags, ...craftTags].map((tag, index) => <span key={`${tag}-${index}`}>{tag}</span>)}</div></div>
          </article>
          <article className="card availability"><p><span className="pulse" aria-hidden="true" />Open to freelance</p><span>{site.availability}</span></article>
          <article className="card location"><div>{site.location.city}<br />{site.location.country}</div><small>{site.location.coordinates}</small></article>
          <article className="card mindset"><h3>Mindset</h3><p>{site.about.mindset}</p><div className="chips chips--left">{site.about.hobbies.map((hobby) => <span className="chip" key={hobby}>{hobby}</span>)}</div></article>
        </div>
      </div>
    </section>
  )
}
