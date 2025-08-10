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
  fontSize = 20,
  fade = 0.12,        // trail strength per frame
  rowsPerSec = 1.2,   // base speed in rows/second (slow & readable)
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
    let width = 0, height = 0, cols = 0
    let rows = 0
    let positions = []   // y in rows
    let speeds = []      // rows per second
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    function setSize() {
      const parent = canvas.parentElement || document.body
      width = parent.clientWidth || window.innerWidth
      height = parent.clientHeight || Math.max(window.innerHeight * 0.5, 320)
      rows = Math.ceil(height / fontSize) + 4
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.max(8, Math.floor(width / (fontSize * 1.2)))
      positions = Array(cols).fill(0).map(() => Math.random() * rows)
      speeds = Array(cols).fill(0).map(() => rowsPerSec * (0.75 + Math.random() * 0.5)) // slight variance
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
      ctx.textBaseline = 'top'
    }

    function draw(ts) {
      if (!lastRef.current) lastRef.current = ts
      const dt = Math.min(0.1, Math.max(0.0001, (ts - lastRef.current) / 1000)) // clamp 0 < dt <= 100ms
      lastRef.current = ts

      // trail
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = `rgba(0,0,0,${fade})`
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = color
      for (let i = 0; i < cols; i++) {
        // convert row to px
        const x = i * (fontSize * 1.2)
        const yPx = positions[i] * fontSize

        const s = strains[(i + Math.floor(positions[i])) % strains.length]
        const len = Math.max(3, Math.min(s.length, 10))
        const start = Math.floor(positions[i] % Math.max(1, s.length - len))
        const chunk = s.slice(start, start + len)

        ctx.fillText(chunk, x, yPx)

        // motion: rows per second * dt
        positions[i] += speeds[i] * dt
        if (yPx > height + fontSize * 2) {
          positions[i] = -Math.random() * 6
          speeds[i] = rowsPerSec * (0.75 + Math.random() * 0.5)
        }
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    setSize()
    rafRef.current = requestAnimationFrame(draw)
    const onResize = () => setSize()
    window.addEventListener('resize', onResize)

    // watchdog fallback: if RAF ever stalls > 400ms, kick it
    const watchdog = setInterval(() => {
      const now = performance.now()
      if (now - lastRef.current > 400) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(draw)
      }
    }, 500)

    return () => {
      clearInterval(watchdog)
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [enabled, fade, fontSize, color, strains, rowsPerSec])

  return <canvas ref={ref} className="matrix-canvas" aria-hidden="true" />
}
