import React from 'react'
import Link from "next/link";
import gql from 'graphql-tag';
import { useMutation, useQuery } from "@apollo/react-hooks";
// import { TOGGLE_CART_MUTATION } from './Cart';
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Logout from "./Logout";
import CartCount from "./CartCount"
import { withApollo } from '../lib/nextApollo'

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;
const Nav = (props) => {
  
  
  
  
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
  
  return(
    <User>
      {({ data }) => {
        const me = data ? data.me : null;
        return (
          <NavStyles>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {me && (
            <>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
          
              <button onClick={() => toggleCart()}>My Cart
              {/* <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}></CartCount> */}

              </button>
              
              <Logout />
            </>
          )}
          {!me && (
            <Link href="/login">
              <a>Login</a>
            </Link>
          )}
        </NavStyles>
      );
    }}
  </User>)
};

export default withApollo(Nav);
