import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import gql from 'graphql-tag';
import Link from "next/link";
import Logout from "./Logout";
import { TOGGLE_CART_MUTATION } from './Cart';
import { CURRENT_USER_QUERY } from './User';


const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },  
  paper: {
    marginRight: theme.spacing(2),
  },
  menulist: {
    fontSize: 18
  }
  
}));

export default function MenuListComposition() {
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries:[{query: CURRENT_USER_QUERY}]
  })

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
  
        <div >
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AccountCircleIcon style={{ fontSize: 45, color: "green" }} />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  className={classes.menulist}
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  
                  
                  
                      <MenuItem onClick={handleClose} style={{fontSize:30}}><Link href="/me">
                    <a>My Account</a></Link></MenuItem>
                  
                  
                  
                  
                  <MenuItem onClick={handleClose} style={{fontSize:30}}><Link href="/orders">
                    <a>My Orders</a></Link></MenuItem>
                  
                  <MenuItem onClick={handleClose} style={{fontSize:30}}><Link href="/sell">
                    <a>Sell Items</a></Link></MenuItem>
                  
                  <MenuItem onClick={handleClose} style={{fontSize:30}}><Link href="/myitems">
                    <a>My Items</a></Link></MenuItem>
                  
                  <MenuItem onClick={() => toggleCart()} style={{fontSize:30}}>My Cart</MenuItem>
                  <MenuItem onClick={() => signout()} style={{fontSize:30}}>Logout</MenuItem>
                  </MenuList>
              </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
  
  );
}
