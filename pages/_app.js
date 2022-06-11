import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>
}

export default MyApp
