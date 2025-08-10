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
  color = '#A4C639',   // brand green (readable on dark bg)
  fontSize = 20,       // desktop default (auto-scales a bit on mobile)
  fade = 0.10,         // longer trails for smooth look
  rowsPerSec = 1.4,    // fluid but readable; tune 1.2–1.6 to taste
  enabled = true
}) {
  const ref = useRef(null)
  const rafRef = useRef(0)
  const lastRef = useRef(0)

  useEffect(() => {
    if (!enabled) return
    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = 0, height = 0, cols = 0, rows = 0
    let positions = []   // y in rows (float)
    let speeds = []      // rows per second (float)
    let dpr = Math.max(1, window.devicePixelRatio || 1)
    let fsize = fontSize

    function setSize() {
      const parent = canvas.parentElement || document.body
      width = parent.clientWidth || window.innerWidth
      height = parent.clientHeight || Math.max(window.innerHeight * 0.5, 320)

      // Responsive for mobile: gently reduce size below 480px width
      fsize = fontSize
      if (width < 480) fsize = Math.max(14, Math.round(fontSize * 0.85))

      rows = Math.ceil(height / fsize) + 4
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Full-width columns spaced by character width
      cols = Math.max(10, Math.floor(width / (fsize * 1.1)))

      positions = Array(cols).fill(0).map(() => Math.random() * rows)

      // per-column variance; clamp so nothing crawls or races
      speeds = Array(cols).fill(0).map(() => {
        const s = rowsPerSec * (0.85 + Math.random() * 0.4)
        return Math.max(rowsPerSec * 0.7, Math.min(rowsPerSec * 1.3, s))
      })

      ctx.font = `${fsize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
      ctx.textBaseline = 'top'
    }

    function draw(ts) {
      if (!lastRef.current) lastRef.current = ts
      const dt = Math.min(0.08, Math.max(0.0001, (ts - lastRef.current) / 1000)) // clamp dt to avoid spikes
      lastRef.current = ts

      // trails
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = `rgba(0,0,0,${fade})`
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = color
      for (let i = 0; i < cols; i++) {
        const x = i * (fsize * 1.1)
        const yPx = positions[i] * fsize

        const s = strains[(i + Math.floor(positions[i])) % strains.length]
        const len = Math.max(3, Math.min(s.length, 10))
        const start = Math.floor(positions[i] % Math.max(1, s.length - len))
        const chunk = s.slice(start, start + len)

        ctx.fillText(chunk, x, yPx)

        // advance & loop forever
        positions[i] += speeds[i] * dt
        if (yPx > height + fsize * 2) {
          positions[i] = -Math.random() * 4
          const v = rowsPerSec * (0.85 + Math.random() * 0.4)
          speeds[i] = Math.max(rowsPerSec * 0.7, Math.min(rowsPerSec * 1.3, v))
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    setSize()
    rafRef.current = requestAnimationFrame(draw)
    const onResize = () => setSize()
    window.addEventListener('resize', onResize)

    // watchdog: if rAF ever stalls (tab throttled), kick it back on
    const watchdog = setInterval(() => {
      const now = performance.now()
      if (now - lastRef.current > 400) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(draw)
      }
    }, 600)

    return () => {
      clearInterval(watchdog)
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [enabled, fade, fontSize, color, strains, rowsPerSec])

  return <canvas ref={ref} className="matrix-canvas" aria-hidden="true" />
}
