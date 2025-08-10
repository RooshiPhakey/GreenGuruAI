import { useEffect, useRef, useState } from 'react'
function todayKey() {
  const d = new Date();
  const m = String(d.getUTCMonth() + 1).padStart(2,'0');
  const day = String(d.getUTCDate()).padStart(2,'0');
  return `gg_limit_${d.getUTCFullYear()}-${m}-${day}`;
}


export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! Whats's Good!? Im Blaze. Ask me about cannabis education, legality by country, safer use, product types, or industry trends. I keep it anonymous ✌️' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function sendMessage(e) {
    e.preventDefault()
    const content = input.trim()
    // simple per-browser daily limit
try {
  const key = todayKey();
  const used = Number(localStorage.getItem(key) || 0);
  const LIMIT = 10; // ← change if you want
  if (used >= LIMIT) {
    const nextList = [...messages, { role:'assistant', content:`Daily limit reached (${LIMIT}/day). Come back tomorrow 💚` }];
    setMessages(nextList);
    return;
  }
  localStorage.setItem(key, used + 1);
} catch {}

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

  const quick = [
    '📍 Is cannabis legal in the UK?',
    '💡 Give me safer-use tips',
    '🛠 What gear do you recommend for beginners?'
  ]

  return (
    <div className="card">
      <div style={{display:'flex',flexDirection:'column',gap:8, minHeight: 420}}>
        <div style={{marginTop:4, marginBottom:8, display:'flex', flexWrap:'wrap', gap:8}}>
          {quick.map((q, idx) => (
            <button key={idx} type="button" className="btn" style={{fontSize:12, padding:'6px 10px'}}
              onClick={()=>setInput(q)}>{q}</button>
          ))}
        </div>
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
