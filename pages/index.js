import Image from 'next/image'
import Head from 'next/head'
import Chat from '../components/Chat'

const SITE_NAME = process.env.SITE_NAME || 'GreenGuruAI'

export default function Home() {
  const picks = [
    { name:'Smell-proof bag', link:'https://example.com/smell-proof-bag' },
    { name:'Quality grinder', link:'https://example.com/grinder' },
    { name:'Rolling tray', link:'https://example.com/rolling-tray' }
  ]

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
        <div style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
          <div>
            <h1 style={{margin:'8px 0'}}>Meet your Guru Assistant <span style={{color:'#A4C639'}}>Blaze</span></h1>
            <p className="muted">Anonymous-friendly chat. Ask about strains, methods, safer use, legality by region, and more.</p>
          </div>
          <Image
            src="/blaze.png"
            alt="Blaze — your Green Guru AI Assistant"
            width={140}
            height={140}
            className="blaze"
            priority
          />
        </div>

        <Chat />

        <section style={{marginTop:32}}>
          <h2>Featured Picks</h2>
          <p className="muted">Hand-picked cannabis gear we love (add your affiliate links).</p>
          <div style={{display:'flex', gap:16, flexWrap:'wrap', marginTop:12}}>
            {picks.map((p, i)=>(
              <a key={i} className="card" href={p.link} target="_blank" rel="noreferrer" style={{flex:'1 1 180px', textAlign:'center'}}>
                <strong>{p.name}</strong>
              </a>
            ))}
          </div>
        </section>

        <div style={{marginTop:16}}>
          <a
            className="btn"
            href={(process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL || process.env.BUYMEACOFFEE_URL || 'https://www.buymeacoffee.com/greenguruai')}
            target="_blank"
            rel="noreferrer"
          >
            Buy us a coffee ☕
          </a>
        </div>
      </main>
    </div>
  )
}
