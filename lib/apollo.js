import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

export function withApollo(PageComponent) {
  const WithApollo = props => {
    const client = new ApolloClient({
      uri: 'http://localhost:4444',
      fetch,
      cache: new InMemoryCache()
    });

    return (
      <ApolloProvider client={client}>
        <PageComponent {...props} />
      </ApolloProvider>
    );
  };

  return WithApollo;
}