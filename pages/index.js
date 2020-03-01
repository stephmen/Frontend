import Items from "../components/Items";

import withApollo from "../lib/nextApollo";

const Home = props => {
  if (props.query.page === "undefined") {
    props = { query: { page: 1 } };
  }
  return (
    <div>
      <Items page={parseFloat(props.query.page) || 1} />
      {/* <Items page={1} /> */}
    </div>
  );
};

export default withApollo(Home);
