import React from 'react';
//import { useMutation } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import { gql } from '@apollo/client'
//import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;
function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button type="button" disabled={loading} onClick={addToCart}>
      {/* <button disabled={loading} onClick={() => addToCart({ variables: { id } })}></button> */}
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
};

export default AddToCart;
export { ADD_TO_CART_MUTATION };