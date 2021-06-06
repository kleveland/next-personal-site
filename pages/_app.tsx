// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";

// used for collection views (optional)
import "rc-dropdown/assets/index.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import "../styles/globals.css";
import "../styles/notion-overrides.css";

import { ReactNode } from "react";

import type { AppProps } from "next/app";

interface LayoutAppProps extends AppProps {
  Layout: ReactNode;
}

const Noop = ({ children }: { children: ReactNode }) => children;

function MyApp({ Component, pageProps }: LayoutAppProps) {
  // @ts-expect-error
  const Layout = Component.Layout || Noop;

  return (
    <>
      <a className="skip-link" href="#skip-link">Skip to main</a>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;
