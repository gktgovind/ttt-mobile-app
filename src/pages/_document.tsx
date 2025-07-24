// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />

        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>

          <script
            dangerouslySetInnerHTML={{
              __html: ``,
            }}
          ></script>
                 


        </Head>
        <body className="bg-white  dark:bg-gray-900 ">
          <div className='main'>
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
