export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages = [] } = req.body || {};
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });

  const system = {
    role: 'system',
    content:
      "You are Blaze, the GreenGuru AI — a friendly, responsible cannabis assistant. Always introduce yourself as Blaze whenever asked who you are or what you do, even indirectly. Be concise, educational, and safe. No medical/legal advice. Refuse illegal/unsafe requests."
  };

  async function call(model) {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: [system, ...messages].slice(-12),
        temperature: 0.6
      })
    });
    const text = await resp.text();
    if (!resp.ok) throw new Error(`OpenAI ${resp.status}: ${text}`);
    const data = JSON.parse(text);
    return data.choices?.[0]?.message?.content || 'No reply.';
  }

  try {
    const primary = process.env.MODEL || 'gpt-3.5-turbo';
    let reply;
    try {
      reply = await call(primary);
    } catch {
      try {
        reply = await call('gpt-4o');
      } catch {
        reply = await call('gpt-4o-mini');
      }
    }
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(500).json({ error: 'Server error', details: String(e) });
  }
}
