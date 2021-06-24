// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

import "../styles/prism-theme.scss";

// used for collection views (optional)
import "rc-dropdown/assets/index.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import "../styles/globals.scss";
import "../styles/notion-overrides.scss";

import { ReactNode } from "react";
import { NextComponentType, NextPageContext } from 'next';
import type { AppProps } from "next/app";

interface LayoutAppProps extends AppProps {
  Layout: ReactNode;
  Component: NextComponentType<NextPageContext, any, {}> & { extendedHeader: boolean; }
}

const Noop = ({ children }: { children: ReactNode }) => children;

function MyApp({ Component, pageProps }: LayoutAppProps) {
  // @ts-expect-error
  const Layout = Component.Layout || Noop;
  let hasExtendedHeader = false;
  if (Component.extendedHeader) hasExtendedHeader = true;
  return (
    <>
      <a className="skip-link" href="#skip-link">Skip to main</a>
      <Layout extendedHeader={hasExtendedHeader}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;
