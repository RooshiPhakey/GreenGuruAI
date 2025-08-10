// components/LeavesCanvas.js
import { useEffect, useRef } from 'react'

export default function LeavesCanvas({
  count = 40,
  minSize = 10,
  maxSize = 26,
  minSpeed = 12,
  maxSpeed = 38,
  sway = 18,
  color = '#7CC25B',
  color2 = '#A4C639',
  enabled = true
}) {
  const ref = useRef(null)
  const rafRef = useRef(0)
  const lastRef = useRef(0)
  const leavesRef = useRef([])

  useEffect(() => {
    if (!enabled) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let dpr = Math.max(1, window.devicePixelRatio || 1)
    let width = 0, height = 0, targetCount = count

    function rand(a,b){ return a + Math.random()*(b-a) }
    function choose(a,b){ return Math.random()<0.5 ? a : b }

    function setSize() {
      const parent = canvas.parentElement || document.body
      width = parent.clientWidth || window.innerWidth
      height = parent.clientHeight || Math.max(window.innerHeight*0.5, 320)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr,0,0,dpr,0,0)
      targetCount = Math.max(18, Math.floor(width / 24))
      if (width < 480) targetCount = Math.max(14, Math.floor(width / 28))
      seed()
    }

    function makeLeaf(fromTop=false){
      const size = rand(minSize, maxSize)
      return {
        x0: rand(0, width),
        y: fromTop ? -rand(0, height*0.3) : rand(-height, height),
        phase: rand(0, Math.PI*2),
        speed: rand(minSpeed, maxSpeed),
        rot: rand(0, Math.PI*2),
        rotSpeed: rand(-1, 1) * 0.8,
        size,
        hue: choose(color, color2)
      }
    }

    function seed(){
      const out = []
      for (let i=0;i<targetCount;i++) out.push(makeLeaf())
      leavesRef.current = out
    }

    function drawLeaf(x, y, s, r, fill){
      const p = new Path2D()
      p.moveTo(0, 0)
      p.quadraticCurveTo(s*0.6, -s*0.5, 0, -s)
      p.quadraticCurveTo(-s*0.6, -s*0.5, 0, 0)
      p.moveTo(0, 0)
      p.lineTo(0, s*0.6)

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(r)
      ctx.fillStyle = fill
      ctx.strokeStyle = 'rgba(0,0,0,0.15)'
      ctx.lineWidth = 1
      ctx.fill(p)
      ctx.stroke(p)
      ctx.restore()
    }

    function tick(ts){
      if (!lastRef.current) lastRef.current = ts
      const dt = Math.min(0.06, Math.max(0.0001, (ts - lastRef.current)/1000))
      lastRef.current = ts

      ctx.clearRect(0,0,width,height)

      const arr = leavesRef.current
      const TWO_PI = Math.PI*2
      for (let i=0;i<arr.length;i++){
        const L = arr[i]
        const x = L.x0 + Math.sin(L.phase) * sway
        drawLeaf(x, L.y, L.size, L.rot, L.hue)

        L.y += L.speed * dt
        L.phase += dt * 1.2
        if (L.phase > TWO_PI) L.phase -= TWO_PI
        L.rot += L.rotSpeed * dt

        if (L.y - L.size > height) {
          const newLeaf = makeLeaf(true)
          newLeaf.x0 = L.x0
          arr[i] = newLeaf
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    setSize()
    rafRef.current = requestAnimationFrame(tick)
    const onResize = () => setSize()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [enabled, count, minSize, maxSize, minSpeed, maxSpeed, sway, color, color2])

  return <canvas ref={ref} className="leaves-canvas" aria-hidden="true" />
}
