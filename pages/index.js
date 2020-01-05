import Items from '../components/Items';
import { withApollo } from '../lib/apollo'

const Home = props => (
  <div>
    <Items page={parseFloat(props.query.page) || 1} />
  </div>
);

export default withApollo(Home);