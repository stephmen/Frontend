import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Logout from "./Logout"
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;  

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      <AccountCircleIcon style={{ fontSize: 45, color: 'green'}}/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{fontSize:30}}
      >
        <MenuItem onClick={handleClose} style={{fontSize:30}}>My Account</MenuItem>
        <MenuItem onClick={handleClose} style={{fontSize:30}}>My Cart</MenuItem>
        <MenuItem onClick={handleClose} style={{fontSize:30}}>My Orders</MenuItem>
        <MenuItem onClick={handleClose} style={{fontSize:30}}>Sell</MenuItem>
        <MenuItem onClick={handleClose} style={{fontSize:30}}><Logout/ ></MenuItem>
      </Menu>
    </div>
  );
}