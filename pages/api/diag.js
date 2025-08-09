export default function handler(req, res) {
  try {
    const hasKey = !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 10);
    res.status(200).json({ ok: true, OPENAI_API_KEY_present: hasKey });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
