import './App.css'

function App() {
  const BASE = import.meta.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL ||
    'https://pub-1724a984308b418f8dbf7e115755e995.r2.dev/web-assets'
  const HORIZONTAL = `${BASE}/teaser-horizontal.mov`
  const VERTICAL = `${BASE}/teaser-vertical.mov`

  return (
    <div className="video-only">
      <video playsInline muted loop autoPlay aria-label="Teaser video">
        <source media="(max-width: 767px)" src={VERTICAL} type="video/mp4" />
        <source media="(min-width: 768px)" src={HORIZONTAL} type="video/mp4" />
        <source src={HORIZONTAL} type="video/mp4" />
      </video>
    </div>
  )
}

export default App
