// pages/_app.js
import '../styles/globals.css'
import AntiAutoScroll from '../components/AntiAutoScroll'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AntiAutoScroll />
      <Component {...pageProps} />
    </>
  )
}
