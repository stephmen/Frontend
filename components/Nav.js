import React from 'react'
import Link from "next/link";
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import { TOGGLE_CART_MUTATION } from './Cart';
import { TOGGLE_USERMENU_MUTATION } from './UserMenu';
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Logout from "./Logout";
import CartCount from "./CartCount"
//import AccountIcon from '../components/icons/AccountIcon'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import withApollo from '../lib/nextApollo'
import SimpleMenu from './Menu'


const Nav = (props) => {
  
  
  
  
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
  const [toggleUserMenu] = useMutation(TOGGLE_USERMENU_MUTATION);
  
  return(
    // <NavStyles>
    <User>
      {({ data }) => {
        const me = data ? data.me : null;
        return (
          <>
          {me && (
            <>
                
              <SimpleMenu />
              
            </>
          )}
          {!me && (
            <Link href="/login">
              <a><AccountCircleIcon style={{ fontSize: 45 }}/></a>
            </Link>
          )}
        </>
      );
    }}
  </User>
  // </NavStyles>
  )
};

export default Nav;
