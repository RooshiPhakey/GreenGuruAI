// components/MatrixStrains.js
import { useEffect, useRef } from 'react'

const DEFAULT_STRAINS = [
  "Blue Dream","Gorilla Glue","OG Kush","Sour Diesel","Girl Scout Cookies",
  "Wedding Cake","Gelato","Pineapple Express","Jack Herer","Zkittlez",
  "Northern Lights","Purple Haze","Do-Si-Dos","Runtz","AK-47","Skywalker OG",
  "Super Lemon Haze","White Widow","Apple Fritter","Mimosa","Tangie","Trainwreck"
]

export default function MatrixStrains({
  strains = DEFAULT_STRAINS,
  color = '#39FF14',
  opacity = 0.16,
  fontSize = 16,
  enabled = true
}) {
  const ref = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!enabled) return
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let dpr = Math.max(1, window.devicePixelRatio || 1)
    let width = 0, height = 0
    let cols = 0
    let yPositions = []
    let names = strains.filter(Boolean)

    function resize() {
      const parent = canvas.parentElement || document.body
      const clientWidth = parent.clientWidth || window.innerWidth
      const clientHeight = parent.clientHeight || window.innerHeight
      width = clientWidth
      height = clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.max(8, Math.floor(width / (fontSize * 1.25)))
      yPositions = new Array(cols).fill(0).map(() => Math.random() * height)
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
    }

    function draw() {
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = color

      for (let i = 0; i < cols; i++) {
        const x = i * (fontSize * 1.25)
        const name = names[(i + Math.floor(yPositions[i] / fontSize)) % names.length]
        const sliceLen = Math.max(3, Math.min(name.length, 10))
        const start = Math.max(0, Math.floor((yPositions[i] / fontSize) % Math.max(1, name.length - sliceLen)))
        const chunk = name.slice(start, start + sliceLen)
        ctx.fillText(chunk, x, yPositions[i])
        yPositions[i] += fontSize * (0.9 + Math.random() * 0.6)
        if (yPositions[i] > height + 50) {
          yPositions[i] = -Math.random() * 200
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [enabled, opacity, fontSize, color, strains])

  return <canvas ref={ref} className="matrix-canvas" aria-hidden="true" />
}
