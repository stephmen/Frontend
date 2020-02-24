import React from 'react';
import App from 'next/app';
import Page from '../components/Page';
import { withApollo } from "../lib/nextApollo";

class MyApp extends App {
  static async getInitialProps({ Component, ctx}) {
    let pageProps = {};
    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx);
    }
    //this expose the query to the users
    pageProps.query = ctx.query;
    return { pageProps }
  }
  render() {
    const { Component, pageProps} = this.props;
    return (
        
        <Page>
          <Component {...pageProps} />
        </Page>
        
    );
  }
}

export default MyApp;
