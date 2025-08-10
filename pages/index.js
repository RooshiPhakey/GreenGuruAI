import Image from 'next/image'
import Head from 'next/head'
import Chat from '../components/Chat'

const SITE_NAME = process.env.SITE_NAME || 'GreenGuruAI'

export default function Home() {
  const picks = [
    {
      name: 'Carry Case +',
      link: 'https://amzn.to/4lon8VA',
      img: 'https://m.media-amazon.com/images/I/81GwOmUpA4L._AC_SX679_.jpg'
    },
    {
      name: 'Santa Cruz Shredder',
      link: 'https://amzn.to/4lmVicu',
      img: 'https://m.media-amazon.com/images/I/71KFwOfXEPL._AC_SX679_.jpg'
    },
    {
      name: 'Work-Safe Pre-Roll Holder',
      link: 'https://amzn.to/4lmVicu',
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
        {/* Centered Blaze heading */}
        <div style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          gap:16,
          textAlign:'center',
          marginTop:20
        }}>
          <Image
            src="/blaze.png"
            alt="Blaze — your Green Guru AI Assistant"
            width={140}
            height={140}
            className="blaze"
            priority
          />
          <h1 style={{margin:'8px 0'}}>Meet your Green Guru AI Assistant <span style={{color:'#A4C639'}}>Blaze</span></h1>
          <p className="muted">Anonymous-friendly chat. Ask about strains, methods, safer use, legality by region, and more.</p>
        </div>

        {/* Chat */}
        <Chat />

        {/* Centered Featured Picks */}
        <section style={{marginTop:32, textAlign:'center'}}>
          <h2>Featured Picks</h2>

          <div style={{
            display:'flex',
            flexWrap:'wrap',
            gap:'12px',
            marginTop:'12px',
            justifyContent:'center'
          }}>
            {picks.map((p, i) => (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noreferrer sponsored nofollow"
                style={{
                  flex:'1 1 220px',
                  maxWidth:'280px',
                  textAlign:'center',
                  border:'1px solid rgba(255,255,255,0.2)',
                  borderRadius:'12px',
                  padding:'8px',
                  background:'#fff',
                  color:'#000',
                  textDecoration:'none',
                  boxShadow:'0 8px 20px rgba(0,0,0,0.12)',
                  transition:'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  cursor:'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.18)'
                  e.currentTarget.style.borderColor = '#A4C639'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    maxWidth:'100%',
                    maxHeight:'150px',
                    objectFit:'contain',
                    borderRadius:'8px'
                  }}
                />
                <strong style={{display:'block',margin:'8px 0 6px'}}>{p.name}</strong>
                <span style={{
                  display:'inline-block',
                  background:'#A4C639',
                  color:'#fff',
                  padding:'6px 10px',
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

        {/* Centered Buy Me a Coffee */}
        <div style={{marginTop:16, display:'flex', justifyContent:'center'}}>
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

