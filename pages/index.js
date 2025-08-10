import Image from 'next/image'
import Head from 'next/head'
import Chat from '../components/Chat'
import LeavesCanvas from '../components/LeavesCanvas'
import MatrixNamesCanvas from '../components/MatrixNamesCanvas' // keep if you might toggle later

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>GreenGuru AI</title>
      </Head>

      <section className="hero" style={{ position:'relative', zIndex:2 }}>
        {/* Animated background behind content */}
        <LeavesCanvas enabled={true} />
        {/* If you want Matrix later, swap: <MatrixNamesCanvas enabled={true} /> */}

        {/* Your existing hero content goes here */}
        <div style={{ position:'relative', zIndex:2 }}>
          <h1 className="muted" style={{ fontSize: 28, marginBottom: 8 }}>
            Your AI Cannabis Expert — Blaze
          </h1>
          <p className="muted" style={{ marginBottom: 16 }}>
            Friendly, safe, and helpful. No medical or legal advice.
          </p>
        </div>
      </section>

      {/* Chat + products etc. */}
      <div style={{ marginTop: 24 }}>
        <Chat />
      </div>
    </div>
  )
}
