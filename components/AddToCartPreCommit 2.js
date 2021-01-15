import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;
const AddToCart = props => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: [{query: CURRENT_USER_QUERY}]
  });
  const id = props.id;
  return (
    <button disabled={loading} onClick={() => addToCart({ variables: { id } })}>
      Add{loading && "ing"} To Cart 🛒
    </button>
  );
};

export default AddToCart;
