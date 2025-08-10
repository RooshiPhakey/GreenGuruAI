// components/AntiAutoScroll.js
import { useEffect } from 'react'

export default function AntiAutoScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('scrollRestoration' in history) {
      try { history.scrollRestoration = 'manual' } catch {}
    }

    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const id = setTimeout(() => window.scrollTo(0, 0), 0)
    return () => clearTimeout(id)
  }, [])

  return null
}
