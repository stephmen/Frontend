//import withApollo from 'next-with-apollo';
import withApollo from '../lib/nextApollo';
import { ApolloProvider } from '@apollo/react-hooks';
//added Page to default
import Page from "../components/Page";
import ApolloClient, { InMemoryCache } from 'apollo-boost';
 
const App = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <Page >
    <Component {...pageProps} />
    </Page>
  </ApolloProvider>
);
 
export default withApollo(({ initialState }) => {
  return new ApolloClient({
    uri: 'http://localhost:7777',
    cache: new InMemoryCache().restore(initialState || {})
  });
})(App);