import { FormEvent, useState } from 'react'
import { site } from '../data/site'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    if (data.get('_honey')) {
      setStatus('success')
      form.reset()
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          _subject: `Portfolio message: ${data.get('subject')}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })

      if (!response.ok) throw new Error('Unable to send message')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title">{site.contact.title}</h2>
        <p className="lead">{site.contact.text}</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__grid">
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
          </div>
          <label>
            <span>Subject</span>
            <input name="subject" type="text" placeholder="What would you like to build?" required />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows={6} placeholder="Tell me a little about your project..." required />
          </label>
          <input className="contact-form__honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="contact-form__footer">
            <button className="button contact-form__submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <p className={`contact-form__status contact-form__status--${status}`} role="status" aria-live="polite">
              {status === 'success' && 'Thanks—your message has been sent.'}
              {status === 'error' && <>Something went wrong. Please email <a href={`mailto:${site.email}`}>{site.email}</a>.</>}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
