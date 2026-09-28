import { exploreCards } from '../data/site'

export function More() {
  const replaySocialHighlight = () => {
    const footer = document.getElementById('social-links')
    if (!footer) return

    footer.classList.remove('footer--highlight')
    void footer.offsetWidth
    footer.classList.add('footer--highlight')

    const lastSocialLink = footer.querySelector('.footer__links a:last-child')
    lastSocialLink?.addEventListener(
      'animationend',
      () => footer.classList.remove('footer--highlight'),
      { once: true },
    )
  }

  return (
    <section id="other" aria-labelledby="other-title">
      <div className="wrap">
        <p className="eyebrow">More</p>
        <h2 id="other-title">More to explore</h2>
        <p className="lead">A few more ways to follow my work and progress.</p>
        <div className="more">
          {exploreCards.map((card) => 'href' in card ? (
            <a className="more-card" href={card.href} key={card.title} onClick={replaySocialHighlight}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <em>{card.action}</em>
            </a>
          ) : (
            <article className="more-card more-card--soon" key={card.title}>
              <span className="more-card__status">{card.status}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
