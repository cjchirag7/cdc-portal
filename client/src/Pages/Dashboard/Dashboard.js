import React, { useState } from 'react';
import { Redirect, Switch, useHistory } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, ListItemAvatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import PeopleIcon from '@mui/icons-material/People';
import Users from './Users';
import { signOut } from '../../store/actions/AuthAction';
import getInitialsFromName from '../../utils/getInitialsFromName';
import ChangePassword from './Profile/ChangePassword';
import RoleBasedRoute from '../../RoleBasedRoute';
import { ADMIN, USER } from '../../store/roles';
import JNFList from './JNFs';
import MyJNFs from './JNFs/MyJNFs';

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authData } = useSelector((state) => state.auth);
  const theme = useTheme();
  const authRole = authData?.user?.role;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(signOut(authData));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CDC IIT(ISM)
          </Typography>
          <IconButton
            size="large"
            aria-label={authData?.user?.email}
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{ ml: 'auto' }}
          >
            <Avatar sx={{ color: 'white', bgcolor: 'secondary.main' }}>
              {getInitialsFromName(authData?.user?.name)}
            </Avatar>
          </IconButton>
          <Menu
            id="profile-menu"
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
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <ListItem sx={{ pt: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ color: 'white', bgcolor: 'secondary.main' }}>
                  {getInitialsFromName(authData?.user?.name)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={authData?.user?.name} secondary={authData?.user?.email} />
            </ListItem>
            <Divider />
            <MenuItem
              onClick={() => {
                history.push('/dashboard/profile/change-password');
                handleClose();
              }}
            >
              Change Password
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: { backgroundColor: 'primary.main', color: 'white' },
        }}
      >
        <DrawerHeader>
          <Typography variant="h6" noWrap component="div">
            Company Portal
          </Typography>
          <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {authRole === ADMIN && (
            <Tooltip title="Users" disableInteractive>
              <ListItem
                button
                key={'Users'}
                onClick={() => {
                  history.push('/dashboard/users');
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={'Users'} />
              </ListItem>
            </Tooltip>
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Switch>
          <RoleBasedRoute path="/dashboard/users" exact component={Users} userRole={ADMIN} />
          <RoleBasedRoute path="/dashboard/my-jnfs" exact component={MyJNFs} userRole={USER} />
          <RoleBasedRoute path="/dashboard/jnfs" exact component={JNFList} userRole={ADMIN} />
          <RoleBasedRoute path="/dashboard/profile/change-password" exact component={ChangePassword} userRole={USER} />
          <Redirect from="/dashboard" to="/dashboard/users" />
        </Switch>
      </Box>
    </Box>
  );
}
