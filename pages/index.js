import React from "react";
import Items from "../components/Items";
import PropTypes from "prop-types";

const Home = (props) => {
  Home.propTypes = {
    query: PropTypes.object.isRequired
  };
  Home.defaultProps = {
    query: { page: "1"}
  };
  return (
    
      <Items page={parseFloat(props.query.page) || 1} />
    
  );
};

export default Home;
