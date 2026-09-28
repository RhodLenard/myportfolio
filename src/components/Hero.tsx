import { FormEvent, useState } from 'react'
import { answers, fallbackAnswer } from '../data/answers'
import { site } from '../data/site'

type HeroProps = { ready: boolean }

export function Hero({ ready }: HeroProps) {
  const [question, setQuestion] = useState('')
  const [reply, setReply] = useState('')

  function ask(event: FormEvent) {
    event.preventDefault()
    const value = question.toLowerCase().trim()
    if (!value) return
    const answer = answers.find(({ keywords }) => keywords.some((keyword) => value.includes(keyword)))
    setReply(answer?.text ?? fallbackAnswer)
    setQuestion('')
    if (answer) window.setTimeout(() => document.getElementById(answer.section)?.scrollIntoView(), 700)
  }

  return (
    <header className={`hero${ready ? ' hero--ready' : ''}`} id="home">
      <div className="wrap hero__inner">
        <p className="hero__hello">Hi, I&apos;m</p>
        <h1 className="hero__name" aria-label={site.name}>
          {Array.from(site.name).map((letter, index) => letter === ' '
            ? <span className="hero__space" key={index} />
            : <span key={`${letter}-${index}`} style={{ animationDelay: `${index * 70}ms` }}>{letter}</span>)}
        </h1>
        <p className="hero__role">{site.role}</p>
        <div className="ask">
          <form className="ask__box" onSubmit={ask}>
            <label className="sr-only" htmlFor="ask-input">Ask a question about {site.name}</label>
            <input id="ask-input" value={question} onChange={(event) => setQuestion(event.target.value)} autoComplete="off" placeholder={`Ask me anything about ${site.name}...`} />
            <button className="ask__send" type="submit" aria-label="Send question">↑</button>
          </form>
          <div className="chips" aria-label="Suggested destinations">
            <a className="chip" href="#projects">Work</a><a className="chip" href="#about">About me</a><a className="chip" href="#skills">Skills</a><a className="chip" href="#contact">Contact</a>
          </div>
          {reply && <p className="ask__reply" role="status">{reply}</p>}
        </div>
        <a className="hero__scroll" href="#about">Scroll to explore <span aria-hidden="true">↓</span></a>
      </div>
    </header>
  )
}
