import { Head, Html, Main, NextScript } from 'next/document';
import 'flowbite';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preload'
          href='/fonts/inter-var-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css'
        ></link>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        ></link>
        <link
          href='https://fonts.googleapis.com/css?family=Poppins'
          rel='stylesheet'
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <script src='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js'></script> */}
        <Script src='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js' />
        <Script src='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/datepicker.min.js' />
      </body>
    </Html>
  );
}
