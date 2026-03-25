'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('General inquiry')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message }),
      })

      if (!res.ok) throw new Error()

      setStatus('sent')
      setName('')
      setEmail('')
      setPhone('')
      setSubject('General inquiry')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="booking-card">
        <div className="cf-success">
          <h3>Message Sent</h3>
          <p>Thank you, {name || 'we'}&apos;ll get back to you within 24 hours.</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setStatus('idle')}>
            Send Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-card">
      <h3>Send a Message</h3>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" placeholder="+371 ..." value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <select value={subject} onChange={e => setSubject(e.target.value)}>
            <option>General inquiry</option>
            <option>Route recommendation</option>
            <option>Group booking (10+)</option>
            <option>Corporate / team event</option>
            <option>Partnership</option>
          </select>
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea rows={5} placeholder="Tell us about your plans..." value={message} onChange={e => setMessage(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'error' && (
          <p style={{ color: '#c0392b', fontSize: 14, marginTop: 8, textAlign: 'center' }}>
            Something went wrong. Please try again or email us directly.
          </p>
        )}
      </form>
    </div>
  )
}
