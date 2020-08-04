import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';



const initApolloClient = (initialState = {}) => {
    const cache = new InMemoryCache();
    const link = new HttpLink({
        uri: `${url}/api/graphql`,
    });
    const ssrMode = typeof window === 'undefined';
    const client = new ApolloClient({
        ssrMode,
        link,
        cache,
    })
  return client;
};