import React from 'react';
import Items from "../components/Items";



const Home = (props) => {
if (props.query === {}) {
    {props: {query: { page: 1 } }};
    }
    console.log(props)
  return (
    <div>
      <Items page={parseFloat(props.query.page) || 1} />
      {/* <Items page={1} /> */}
    </div>
  );
};

export default Home;
