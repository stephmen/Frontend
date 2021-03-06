import { ApolloClient, gql } from '@apollo/client';
// import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getDataFromTree } from '@apollo/react-ssr';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { LOCAL_STATE_QUERY } from "../components/Cart";
import { endpoint, prodEndpoint } from '../config';


export default function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  WithApollo.getInitialProps = async ctx => {
    const { AppTree } = ctx;
    const apolloClient = (ctx.apollClient = initApolloClient());

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }

    // If on server
    if (typeof window === 'undefined') {
      if (ctx.res && ctx.res.finished) {
        return pageProps;
      }

      try {
        const { getDataFromTree } = await import('@apollo/react-ssr');
        await getDataFromTree(
          <AppTree
            pageProps={{
              ...pageProps,
              apolloClient
            }}
          />
        );
      } catch (e) {
        console.error(e);
      }

      Head.rewind();
    }

    const apolloState = apolloClient.cache.extract();
    return {
      ...pageProps,
      apolloState
    };
  };

  return WithApollo;
}

const initApolloClient = (initialState = {}) => {
  const ssrMode = typeof window === 'undefined';
  const cache = new InMemoryCache().restore(initialState);
  cache.writeQuery({
    query: gql`
      query{
        cartOpen,
        userMenuOpen
      }`,
    data: {
      cartOpen: false,
      userMenuOpen: false
    }
  });
  const link = new HttpLink({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    credentials: "include",  
});



  const client = new ApolloClient({
    //ssrMode: true,
    //fetch,
    fetchPolicy: 'no-cache',
    link,
    cache,
    //credentials: "include",
    resolvers: {
      Mutation: {
        toggleCart(_, variables, { cache }) {
          // read the cartOpen value from the cache
          const { cartOpen } = cache.readQuery({
          query: LOCAL_STATE_QUERY
          });
          // Write the cart State to the opposite
          const data = {
            data: { cartOpen: !cartOpen }
          };
          cache.writeData(data);
          return data;
          
        },
        toggleUserMenu(_, variables, { cache }) {
          // read the cartOpen value from the cache
          const { userMenuOpen } = cache.readQuery({
            query: LOCAL_STATE_QUERY
          });
          // Write the cart State to the opposite
          const data = {
            data: { userMenuOpen: !userMenuOpen }
          };
          cache.writeData(data);
          
          return data;
        }
      }
    }
  });
  return client;
};
