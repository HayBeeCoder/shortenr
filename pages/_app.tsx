import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { AppWrapper } from '../context/state'
import App from 'next/app'
import ConfirmationGuard from '../components/ConfirmationGuard/ConfirmationGuard'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>

      <Layout>
      {/* <ConfirmationGuard> */}

        <Component {...pageProps} />

        {/* </ConfirmationGuard> */}
      </Layout>
    </AppWrapper>
  )
}

export default MyApp
