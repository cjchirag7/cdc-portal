import React, { useState } from 'react';
import { Redirect, Switch, useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ToggleButton from '@mui/material/ToggleButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { Avatar, ListItemAvatar, Menu, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Users from './Users';
import { signOut } from '../../store/actions/AuthAction';
import getInitialsFromName from '../../utils/getInitialsFromName';
import ChangePassword from './Profile/ChangePassword';
import RoleBasedRoute from '../../RoleBasedRoute';
import { ADMIN, USER } from '../../store/roles';
import JNFList from './JNFs';
import MyJNFs from './JNFs/MyJNFs';
import NewJNF from './JNFs/NewJNF';
import INFList from './INFs';
import MyINFs from './INFs/myINF';
import ViewJNF from './JNFs/viewJNF';
import ViewINF from './INFs/viewINF';
import Settings from './Settings';
import PreviewJNF from './JNFs/PreviewJNF';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export default function Dashboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authData } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const isAdmin = authData?.user?.role === ADMIN;
  const isUser = authData?.user?.role === USER;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(signOut(authData));
  };

  const toggleResponsiveHeader = () => {
    setOpen(!open);
  };

  const list = () => (
    <Box
      sx={{ width: '250', mt: '55px', pl: '70px', backgroundColor: 'primary.main', color: 'white' }}
      role="presentation"
      onClose={toggleResponsiveHeader}
    >
      <List>
        <ListItem button onClick={() => history.push('/dashboard/jnfs')}>
          <ListItemText primary="JNF" />
        </ListItem>
        <ListItem button onClick={() => history.push('/dashboard/infs')}>
          <ListItemText primary="INF" />
        </ListItem>
        {isUser && (
          <ListItem button onClick={() => history.push('/dashboard/new-jnf')}>
            <ListItemText primary="Create JNF" />
          </ListItem>
        )}
        {isAdmin && (
          <ListItem button onClick={() => history.push('/dashboard/settings')}>
            <ListItemText primary="SETTINGS" />
          </ListItem>
        )}
        {isUser && (
          <ListItem button onClick={() => history.push('/dashboard/new-inf')}>
            <ListItemText primary="Create INF" />
          </ListItem>
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <React.Fragment key="left">
            <ToggleButton
              value="check"
              sx={{ color: 'white', display: { xs: 'flex', md: 'none' }, mr: '25px' }}
              onClick={toggleResponsiveHeader}
            >
              <MenuIcon />
            </ToggleButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleResponsiveHeader}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              {list()}
            </Drawer>
          </React.Fragment>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              history.push('/dashboard');
            }}
          >
            CDC IIT(ISM)
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isAdmin && (
              <Button
                sx={{ my: 2, color: 'white', display: 'block', ml: '25px', fontSize: '18px' }}
                onClick={() => {
                  history.push('/dashboard/jnfs');
                }}
              >
                JNF
              </Button>
            )}
            {isUser && (
              <Button
                sx={{ my: 2, color: 'white', display: 'block', ml: '25px', fontSize: '18px' }}
                onClick={() => {
                  history.push('/dashboard/my-jnfs');
                }}
              >
                JNF
              </Button>
            )}
            {isAdmin && (
              <Button
                sx={{ my: 2, color: 'white', display: 'block', ml: '25px', fontSize: '18px' }}
                onClick={() => {
                  history.push('/dashboard/infs');
                }}
              >
                INF
              </Button>
            )}
            {isUser && (
              <Button
                sx={{ my: 2, color: 'white', display: 'block', ml: '25px', fontSize: '18px' }}
                onClick={() => {
                  history.push('/dashboard/my-infs');
                }}
              >
                INF
              </Button>
            )}
            {isAdmin && (
              <Button
                sx={{ my: 2, color: 'white', display: 'block', ml: '25px', fontSize: '18px' }}
                onClick={() => {
                  history.push('/dashboard/settings');
                }}
              >
                Settings
              </Button>
            )}
            {isUser && (
              <Button
                sx={{ my: 2, color: 'white', display: 'block', ml: '25px', fontSize: '18px' }}
                onClick={() => {
                  history.push('/dashboard/new-jnf');
                }}
              >
                Create JNF
              </Button>
            )}
            {isUser && (
              <Button
                sx={{ my: 2, color: 'white', display: 'block', ml: '25px', fontSize: '18px' }}
                onClick={() => {
                  history.push('/dashboard/new-inf');
                }}
              >
                Create INF
              </Button>
            )}
          </Box>
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Switch>
          <RoleBasedRoute path="/dashboard/users" exact component={Users} userRole={ADMIN} />
          <RoleBasedRoute path="/dashboard/my-jnfs" exact component={MyJNFs} userRole={USER} />
          <RoleBasedRoute path="/dashboard/new-jnf" exact component={NewJNF} userRole={USER} />
          <RoleBasedRoute path="/dashboard/jnfs" exact component={JNFList} userRole={ADMIN} />
          <RoleBasedRoute path="/dashboard/jnf/:id" exact component={ViewJNF} userRole={USER} />
          <RoleBasedRoute path="/dashboard/my-infs" exact component={MyINFs} userRole={USER} />
          <RoleBasedRoute path="/dashboard/infs" exact component={INFList} userRole={ADMIN} />
          <RoleBasedRoute path="/dashboard/inf/:id" exact component={ViewINF} userRole={USER} />
          <RoleBasedRoute path="/dashboard/settings" exact component={Settings} userRole={ADMIN} />
          <RoleBasedRoute path="/dashboard/final-preview" exact component={PreviewJNF} userRole={USER} />
          <RoleBasedRoute path="/dashboard/profile/change-password" exact component={ChangePassword} userRole={USER} />
          <Redirect from="/dashboard" to="/dashboard/users" />
        </Switch>
      </Box>
    </Box>
  );
}
