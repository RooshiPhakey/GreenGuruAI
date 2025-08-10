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
  color = '#39FF14',
  fontSize = 16,
  fade = 0.06,        // trail strength (higher = faster fade)
  speed = 1.0,        // base speed multiplier
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
      drops = Array(cols).fill(1 + Math.random() * 10)
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
      ctx.textBaseline = 'top'
    }

    function draw() {
      // Fade the canvas slightly to create the trail effect
      ctx.fillStyle = `rgba(0,0,0,${fade})`
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = color
      for (let i = 0; i < cols; i++) {
        const x = i * (fontSize * 1.2)
        const y = drops[i] * fontSize
        // Pick a random strain each step
        const s = strains[(i + Math.floor(y / fontSize)) % strains.length]
        // Draw a slice so it looks like vertical rain
        const len = Math.max(3, Math.min(s.length, 10))
        const start = Math.floor((y / fontSize) % Math.max(1, s.length - len))
        const chunk = s.slice(start, start + len)
        ctx.fillText(chunk, x, y)

        // Move downward; reset randomly once off screen
        drops[i] += speed * (0.6 + Math.random() * 0.7)
        if (y > height + 60) {
          drops[i] = -Math.random() * 10
        }
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    setSize()
    rafRef.current = requestAnimationFrame(draw)
    const onResize = () => { setSize() }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [enabled, fade, fontSize, color, strains, speed])

  return <canvas ref={ref} className="matrix-canvas" aria-hidden="true" />
}
