import React from 'react';
import Items from "../components/Items";



const Home = (props) => {
Home.defaultProps = {
  query: {page: 1 }
}
  return (
    <div>
      <Items page={parseFloat(props.query.page)} />
    </div>
  );
};

export default Home;
