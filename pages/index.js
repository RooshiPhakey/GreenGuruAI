import Head from 'next/head'
import Chat from '../components/Chat'

const SITE_NAME = process.env.SITE_NAME || 'GreenGuruAI'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>{SITE_NAME} — Cannabis AI Assistant</title>
        <meta name="description" content="Anonymous, friendly cannabis education and industry insights." />
      </Head>
      <header className="header">
        <div className="logo">
          <div className="brand-dot" />
          <strong style={{fontSize:22}}>{SITE_NAME}</strong>
        </div>
        <nav className="muted">
          <a href="/privacy">Privacy</a> &nbsp;•&nbsp; <a href="/terms">Terms</a>
        </nav>
      </header>

      <main>
        <h1 style={{margin:'8px 0'}}>Meet your {SITE_NAME} assistant</h1>
        <p className="muted">Anonymous-friendly chat. Ask about strains, methods, effects, safer use, product types, legalization status by region, or industry trends.</p>
        <Chat />
      </main>
    </div>
  )
}
