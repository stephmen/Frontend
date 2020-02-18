import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Logout from "./Logout"

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
      <a><AccountCircleIcon style={{ fontSize: 45, color: 'green'}}/></a>
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