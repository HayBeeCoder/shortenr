import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { AppWrapper } from '../context/state'
import App from 'next/app'
import ConfirmationGuard from '../components/ConfirmationGuard/ConfirmationGuard'
import RouteGuard from '../components/RouteGuard/RouteGuard'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <RouteGuard>

      <Layout>
      {/* <ConfirmationGuard> */}

        <Component {...pageProps} />

        {/* </ConfirmationGuard> */}
      </Layout>
      </RouteGuard>
    </AppWrapper>
  )
}

export default MyApp
