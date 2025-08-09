import { useEffect, useState } from 'react'

/**
 * Background modes:
 * - gradient (default): animated CSS gradient
 * - rotate: crossfades through images defined in BACKGROUND_IMAGES (comma-separated)
 */
export default function Background() {
  const mode = process.env.NEXT_PUBLIC_BACKGROUND_MODE || process.env.BACKGROUND_MODE || 'gradient'
  const list = (process.env.NEXT_PUBLIC_BACKGROUND_IMAGES || process.env.BACKGROUND_IMAGES || '').split(',').map(s => s.trim()).filter(Boolean)

  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (mode !== 'rotate' || list.length === 0) return
    const t = setInterval(() => setIdx(i => (i + 1) % list.length), 8000)
    return () => clearInterval(t)
  }, [mode, list.length])

  if (mode !== 'rotate' || list.length === 0) return null

  const url = list[idx]
  return <div className="gg-rotator" style={{ backgroundImage: `url(${url})` }} />
}
