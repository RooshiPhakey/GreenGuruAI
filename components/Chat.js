import { useEffect, useRef, useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! I\'m your GreenGuru assistant. Ask me about cannabis education, legality by region, safer use, product types, or industry trends. I keep it anonymous ✌️' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function sendMessage(e) {
    e.preventDefault()
    const content = input.trim()
    if (!content) return
    const next = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-10) })
      })
      const data = await res.json()
      if (data.reply) {
        setMessages([...next, { role: 'assistant', content: data.reply }])
      } else {
        const hint = data.error ? ` (${data.error}${data.details ? ': ' + data.details : ''})` : ''
        setMessages([...next, { role: 'assistant', content: 'Sorry, I had trouble answering. Please try again.' + hint }])
      }
    } catch (err) {
      setMessages([...next, { role: 'assistant', content: 'Network error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div style={{display:'flex',flexDirection:'column',gap:8, minHeight: 420}}>
        {messages.map((m, i) => (
          <div key={i} className={'bubble ' + (m.role === 'user' ? 'user' : 'bot')}>
            {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="row" style={{marginTop:12}}>
        <input
          className="input"
          placeholder="Ask GreenGuru…"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          disabled={loading}
        />
        <button className="btn" disabled={loading}>{loading ? 'Thinking…' : 'Send'}</button>
      </form>
      <p className="legal" style={{marginTop:12}}>
        Educational purposes only. Not medical or legal advice. For adults where lawful.
      </p>
    </div>
  )
}
