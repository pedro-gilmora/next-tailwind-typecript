import React from "react";
import "reflect-metadata";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return React.createElement(Component, {...pageProps} )
}

export default MyApp
