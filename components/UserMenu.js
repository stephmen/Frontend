
import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import gql from "graphql-tag";
import UserMenuStyles from "./styles/UserMenuStyles";
import User from './User';
import { LOCAL_STATE_QUERY } from './Cart'
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import Logout from "./Logout"
import { TOGGLE_CART_MUTATION } from './Cart';





const TOGGLE_USERMENU_MUTATION = gql`
  mutation {
    toggleUserMenu @client
  }
`;

const UserMenu = (props) => {
const { loading, error, data } = useQuery(LOCAL_STATE_QUERY,{
  onCompleted: data => { }
});
  const [toggleUserMenu] = useMutation(TOGGLE_USERMENU_MUTATION);
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
  if (loading && !data) return <p>Loading...</p>;
  console.log(data)
  return(
  <User>
    {({ data: { me } }) => {
      if (!me) return null;
      return (
        <UserMenuStyles open={data.userMenuOpen}>
          <header>
            <CloseButton onClick={toggleUserMenu} title="close">
              &times;
            </CloseButton>
          </header>

              <ul>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <br />
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <br />
              <Link href="/me">
                <a>Account</a>
              </Link>
              <br />
              //<button onClick={() => {toggleCart(); toggleUserMenu() }}>My Cart</button>
              <button onClick={toggleCart}>My CartHELLO</button>
              {/* <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}></CartCount> */}
              
              <Logout />


              </ul>
            
         
          
        </UserMenuStyles>
      );
    }}
  </User>);
};
export default UserMenu;
export { TOGGLE_USERMENU_MUTATION };
