import Items from '../components/Items';
import { withApollo } from '../lib/apollo'

const Home = props => (
  <div>
    <Items />
  </div>
);

export default withApollo(Home);