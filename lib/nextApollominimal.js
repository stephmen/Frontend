import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { LOCAL_STATE_QUERY } from "../components/Cart";
import fetch from 'isomorphic-unfetch';

export default function withApollo(PageComponent) {
  const cache = new InMemoryCache()
    cache.writeData({
      data: {
        cartOpen: false,
        userMenuOpen: false
      }
    });
  const withApollo = props => {
    const client = new ApolloClient({
      uri: 'http://localhost:4444',
      credentials: 'include',
      fetch,
      cache,
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
            console.log("Local Mutation")
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
            console.log("Local Mutation")
            return data;
          }
        }
      }
    });

    return (
      <ApolloProvider client={client}>
        <PageComponent {...props} />
      </ApolloProvider>
    );
  };

  return withApollo;
}