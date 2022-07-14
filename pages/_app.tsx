import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { AppWrapper } from '../context/state'
import App from 'next/app'
import ConfirmationGuard from '../components/ConfirmationGuard/ConfirmationGuard'
import RouteGuard from '../components/RouteGuard/RouteGuard'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
function MyApp({ Component, pageProps }: AppProps) {
  const [token, setToken] = useState('')
  // const router = useRouter()

  // useEffect(
  //   () => {
  //     if (token == '' && pageProps.protected) {
  //       router.push({
  //         pathname: '/login',
  //         query: { returnUrl: "/dashboard" }
  //       });
  //     }
  //   }
  //   , [])

  // if (token == '' && pageProps.protected) {
  //   return <p>....Loading......</p>
  // }


  return (
    <AppWrapper setToken={setToken}>
      {/* <RouteGuard> */}

      <Layout>
        {/* <ConfirmationGuard> */}

        <Component {...pageProps} />

        {/* </ConfirmationGuard> */}
      </Layout>
      {/* </RouteGuard> */}
    </AppWrapper>
  )
}

export default MyApp
