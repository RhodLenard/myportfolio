import { exploreCards } from '../data/site'

export function More() {
  return <section id="other" aria-labelledby="other-title"><div className="wrap"><h2 id="other-title">More to explore</h2><p className="lead">Extra places to get to know my work.</p><div className="more">{exploreCards.map((card) => <a href={card.href} key={card.title}><h3>{card.title}</h3><p>{card.text}</p><em>Explore →</em></a>)}</div></div></section>
}
