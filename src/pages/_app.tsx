import { AppProps } from 'next/app';
import { appWithI18Next } from 'ni18n';
import Head from 'next/head';
import Script from 'next/script';
import '@/styles/globals.css';
import 'flowbite';
// import Link from 'next/link';


// pages/_app.tsx
import { ni18nConfig } from '../ni18n.config';

// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
// import '@/styles/colors.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        ></link>
        <link
          href='https://fonts.googleapis.com/css?family=Poppins'
          rel='stylesheet'
        ></link> */}
      </Head>
      <Component {...pageProps} />
      {/* <script src='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js'></script> */}
      <Script src='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/datepicker.min.js' />
      {/* <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> */}
      <Script src='https://cdn.jsdelivr.net/npm/chart.js' />
      <Script src='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js' />
    </>
  );
}

export default appWithI18Next(MyApp, ni18nConfig);
