import React from "react";
import App from "next/app";
import { ApolloProvider } from "@apollo/client";
import Page from "../components/Page";
import withApollo  from "../lib/nextApollo";
import { getDataFromTree } from '@apollo/react-ssr'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      

      <ApolloProvider client={withApollo}>
        <Page >
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);

