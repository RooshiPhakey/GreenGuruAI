// components/MatrixNamesCanvas.js
import { useEffect, useRef } from 'react'

const DEFAULT_STRAINS = [
  "Blue Dream","OG Kush","Sour Diesel","Girl Scout Cookies","Granddaddy Purple",
  "Pineapple Express","White Widow","Gelato","Northern Lights","AK-47",
  "Purple Haze","Jack Herer","Maui Wowie","Trainwreck","Gorilla Glue #4",
  "Zkittlez","Runtz","Do-Si-Dos","Wedding Cake","Mimosa","Tangie","Apple Fritter"
]

export default function MatrixNamesCanvas({
  strains = DEFAULT_STRAINS,
  color = '#A4C639',  // brand green
  fontSize = 20,      // bigger for readability
  fade = 0.14,        // stronger fade so bottom doesn't build up
  speed = 0.35,       // slower overall
  enabled = true
}) {
  const ref = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!enabled) return
    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = 0, height = 0, cols = 0
    let drops = []
    let velocities = []
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    function setSize() {
      const parent = canvas.parentElement || document.body
      width = parent.clientWidth || window.innerWidth
      height = parent.clientHeight || Math.max(window.innerHeight * 0.5, 320)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.max(8, Math.floor(width / (fontSize * 1.2)))
      drops = Array(cols).fill(0).map(() => Math.random() * (height / fontSize))     // random starting rows
      velocities = Array(cols).fill(0).map(() => speed * (0.35 + Math.random() * 0.35)) // slight per-column variance
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
      ctx.textBaseline = 'top'
    }

    function draw() {
      // Fade the canvas slightly to create the trail effect
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = `rgba(0,0,0,${fade})`
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = color
      for (let i = 0; i < cols; i++) {
        const x = i * (fontSize * 1.2)
        const y = drops[i] * fontSize

        // Pick a strain for this column and show a sliding chunk
        const s = strains[(i + Math.floor(y / fontSize)) % strains.length]
        const len = Math.max(3, Math.min(s.length, 10))
        const start = Math.floor((y / fontSize) % Math.max(1, s.length - len))
        const chunk = s.slice(start, start + len)

        // Draw the chunk
        ctx.fillText(chunk, x, y)

        // Move downward; when off-screen, reset above the top and randomize speed again
        drops[i] += velocities[i]
        if (y > height + fontSize * 2) {
          drops[i] = -Math.random() * 6   // restart slightly above top
          velocities[i] = speed * (0.35 + Math.random() * 0.35)
        }
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    setSize()
    rafRef.current = requestAnimationFrame(draw)
    const onResize = () => setSize()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [enabled, fade, fontSize, color, strains, speed])

  return <canvas ref={ref} className="matrix-canvas" aria-hidden="true" />
}
