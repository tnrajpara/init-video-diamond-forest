import { useEffect, useState } from 'react'
import './App.css'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

function App() {
  const [isCalendlyReady, setIsCalendlyReady] = useState(false)
  const BASE = import.meta.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL ||
    'https://pub-1724a984308b418f8dbf7e115755e995.r2.dev/web-assets'
  const HORIZONTAL = `${BASE}/teaser-horizontal.mov`
  const VERTICAL = `${BASE}/teaser-vertical.mov`

  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-calendly-widget="true"]',
    )

    if (window.Calendly) {
      setIsCalendlyReady(true)
      return
    }

    if (existingScript) {
      existingScript.addEventListener(
        'load',
        () => setIsCalendlyReady(true),
        { once: true },
      )
      return
    }

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.dataset.calendlyWidget = 'true'
    script.addEventListener('load', () => setIsCalendlyReady(true), {
      once: true,
    })
    document.body.appendChild(script)
  }, [])

  const openCalendly = () => {
    window.Calendly?.initPopupWidget({
      url: 'https://calendly.com/cservice-diamondforest/30min?primary_color=143930',
    })
  }

  return (
    <div className="video-only">
      <video playsInline muted loop autoPlay aria-label="Teaser video">
        <source media="(max-width: 767px)" src={VERTICAL} type="video/mp4" />
        <source media="(min-width: 768px)" src={HORIZONTAL} type="video/mp4" />
        <source src={HORIZONTAL} type="video/mp4" />
      </video>

      <button
        className="calendly-overlay-button"
        onClick={openCalendly}
        disabled={!isCalendlyReady}
        type="button"
      >
        Schedule Meeting
      </button>
    </div>
  )
}

export default App
