import Items from '../components/Items';

import { withApollo } from '../lib/nextApollo'

const Home = (props) => (
  <div>
    <Items page={parseFloat(props.query.page) || 1} />
  </div>
);

export default withApollo(Home);