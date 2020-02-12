import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CartStyles from "./styles/CartStyles";
import User from './User';
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";
import CartItem from "./CartItem"
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import TakeMyMoney from './TakeMyMoney';
import { withApollo } from "../lib/nextApollo";

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;
const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = (props) => {
  const { loading, error, data } = useQuery(LOCAL_STATE_QUERY);
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
  return(
  <User>
    {({ data: { me } }) => {
      if (!me) return null;
      return (
        <CartStyles open={data.cartOpen}>
          <header>
            <CloseButton onClick={toggleCart} title="close">
              &times;
            </CloseButton>
            <Supreme>Your Cart</Supreme>
            You Have {me.cart.length} Item{me.cart.length === 1 ? "" : "s"} in
            your cart.
          </header>
          <ul>
            {me.cart.map(cartItem => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </ul>
          <footer>
          <p>{formatMoney(calcTotalPrice(me.cart))}</p>
          {me.cart.length && (
            <TakeMyMoney>
              <SickButton>Checkout</SickButton>
            </TakeMyMoney>
          )}
          </footer>
        </CartStyles>
      );
    }}
  </User>);
};
export default withApollo(Cart);
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
