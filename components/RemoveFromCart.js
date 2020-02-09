import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

const RemoveFromCart = (props) => {
  // This gets called as soon as we get a response back from the server after a mutation has been performed
  const update = (cache, payload) => {
    console.log('Running remove from cart update fn');
    // 1. first read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    console.log(data);
    // 2. remove that item from the cart
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    // 3. write it back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };
  RemoveFromCart.propTypes = {
    id: PropTypes.string.isRequired,
  };
  const [removeFromCart,{loading,data,error}]=useMutation(REMOVE_FROM_CART_MUTATION,{
    update,
    optimisticResponse:{
      __typename: 'Mutation',
      removeFromCart: {
        __typename: 'CartItem',
        id: props.id,
      },
    }}
  )
    return (
      
          <BigButton
            disabled={loading}
            onClick={() => {
              removeFromCart({variables:{ id: props.id }}).catch(err => alert(err.message));
            }}
            title="Delete Item"
          >
            &times;
          </BigButton>
        
     
    );
  
}

export default RemoveFromCart;
