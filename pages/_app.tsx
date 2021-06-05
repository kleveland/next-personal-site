// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for collection views (optional)
import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import '../styles/globals.css'

import { ReactNode } from 'react';

import type { AppProps } from 'next/app'

const Noop = ({ children }: { children: ReactNode }) => children;

function MyApp({ Component, pageProps }: AppProps) {
  
  const Layout = Component.Layout || Noop
  
  return <Layout><Component {...pageProps} /></Layout>
}
export default MyApp
