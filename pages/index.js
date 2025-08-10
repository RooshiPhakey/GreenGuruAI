import Image from 'next/image'
import Head from 'next/head'
import Chat from '../components/Chat'

const SITE_NAME = process.env.SITE_NAME || 'GreenGuruAI'

export default function Home() {
  // Your Featured Picks with product images
  const picks = [
    {
      name: 'Work-Safe Pre-Roll Holder',
      link: 'https://amzn.to/4lmVicu',
      img: 'https://m.media-amazon.com/images/I/81GwOmUpA4L._AC_SX679_.jpg'
    },
    {
      name: 'Santa Cruz Shredder',
      link: 'https://amzn.to/4lmVicu',
      img: 'https://m.media-amazon.com/images/I/71KFwOfXEPL._AC_SX679_.jpg'
    },
    {
      name: 'Carry Case +',
      link: 'https://amzn.to/4lon8VA',
      img: 'https://m.media-amazon.com/images/I/613ayF1eOhL._AC_SX679_.jpg'
    }
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
        {/* Heading + Blaze */}
        <div style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
          <div>
            <h1 style={{margin:'8px 0'}}>Meet your Guru Assistant <span style={{color:'#A4C639'}}>Blaze</span></h1>
            <p className="muted">Anonymous-friendly chat. Ask about strains, methods, safer use, legality by region, and more.</p>
          </div>
          <Image
            src="/blaze.png"
            alt="Blaze — your Guru Assistant"
            width={140}
            height={140}
            className="blaze"
            priority
          />
        </div>

        {/* Chat */}
        <Chat />

        {/* Featured Picks with images */}
        <section style={{marginTop:32}}>
          <h2>Featured Picks</h2>
          <p className="muted">Hand-picked cannabis gear we love.</p>

          <div style={{display:'flex',flexWrap:'wrap',gap:'12px',marginTop:'12px'}}>
            {picks.map((p, i) => (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noreferrer sponsored nofollow"
                style={{
                  flex:'1 1 220px',
                  textAlign:'center',
                  border:'1px solid rgba(255,255,255,0.2)',
                  borderRadius:'12px',
                  padding:'12px',
                  background:'#fff',
                  color:'#000',
                  textDecoration:'none',
                  boxShadow:'0 8px 20px rgba(0,0,0,0.12)'
                }}
              >
                <img
  src={p.img}
  alt={p.name}
  style={{
    maxWidth: '100%',
    maxHeight: '150px', // limits height
    objectFit: 'contain', // keeps aspect ratio without cropping
    borderRadius: '8px'
  }}
/>

                <strong style={{display:'block',margin:'10px 0 8px'}}>{p.name}</strong>
                <span style={{
                  display:'inline-block',
                  background:'#A4C639',
                  color:'#fff',
                  padding:'8px 14px',
                  borderRadius:'8px',
                  fontWeight:'bold'
                }}>Shop Now</span>
              </a>
            ))}
          </div>

          <p className="legal" style={{marginTop:8}}>
            As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </section>

        {/* Buy Me a Coffee */}
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
