import React from "react";
import App from "next/app";
import { ApolloProvider } from "@apollo/client";
import Page from "../components/Page";
import { withApollo } from "../lib/nextApollo";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    //this expose the query to the users
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      
      //added ApolloProvider from wes Boss
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
