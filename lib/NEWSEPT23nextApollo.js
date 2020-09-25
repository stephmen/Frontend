import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/react-ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';
import paginationField from './paginationField';

import { LOCAL_STATE_QUERY } from "../components/Cart";

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          credentials: 'include',
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allItems: paginationField(),
          },
        },
      },
    }).restore(initialState || {}),
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
}

export default withApollo(createClient, { getDataFromTree });