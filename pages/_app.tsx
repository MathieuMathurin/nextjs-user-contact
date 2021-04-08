import Head from 'next/head'
import { Provider } from 'next-auth/client'

import { createMockServer } from '../lib/mockedServer';
import '../styles/globals.scss'

import Header from '../components/header/header';

createMockServer();

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Contact App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}

export default MyApp
