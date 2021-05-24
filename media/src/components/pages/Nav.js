import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import { useAuth0 } from "@auth0/auth0-react";
/* eslint-disable */
/**=================================================**/
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
/**=================================================**/
export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menu, setMenu] = React.useState(null);
  const open = Boolean(menu);
  const ProfileMenu = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    console.log('broken',event.currentTarget);
    console.log(menu);
    console.log(anchorEl);
    setMenu(event.currentTarget);
  };

  const handleProfile = (event) => {
    console.log('fixed',event.currentTarget);
    console.log(menu);
    console.log(anchorEl);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  const { loginWithRedirect } = useAuth0();

  return (
    <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
        <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
               <MenuIcon />
              </IconButton>
        <Menu 
         id="menu-appbar"
         anchorEl={anchorEl}
         anchorOrigin={{
           vertical: 'top',
           horizontal: 'left',
         }}
         keepMounted
         transformOrigin={{
           vertical: 'top',
           horizontal: 'left',
         }}
         open={open}
         onClose={handleCloseMenu}> 
          <MenuItem onClick={handleCloseMenu}><Link href="/">Main</Link></MenuItem>
          {/* <MenuItem onClick={handleCloseMenu}><Link href="/SignUp">SignUp</Link></MenuItem> */}
          <MenuItem onClick={() => loginWithRedirect()}><Link href="/SignIn">SignIn</Link></MenuItem>
          
        </Menu>
          <Typography variant="h6" className={classes.title}>
            My Library
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfile}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={ProfileMenu}
                onClose={handleCloseProfile}
              >
                <MenuItem onClick={handleCloseProfile}><Link href="">Profile</Link></MenuItem>
                <MenuItem onClick={handleCloseMenu}><Link href="">logout</Link></MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
