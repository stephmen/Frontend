import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
 
export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: 'http://172.30.212.146:4444',
      cache: new InMemoryCache().restore(initialState || {})
    });
  },
  {
    render: ({ Page, props }) => {
      Page.getInitialProps = ctx => {
        const apolloClient = ctx.apolloClient;
      };
      return (
        <ApolloProvider>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);