import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, makeStyles, useTheme, Drawer, 
         List, Divider, ListItem, ListItemIcon, ListItemText }  from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import clsx from "clsx";
import { Link } from "react-router-dom";
import {navbarOptions, navbarLinks, navbarIcons} from "../../models/navbarModels";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  },[]) 
  const [accountType, setAccountType] = useState("admin");
  const [isLoggedIn, setLogedStatus] = useState(true);
  //const isLoggedIn = window.localStorage.getItem("authUser") ? true : false;

  let menuList = navbarOptions[accountType] || null;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (

    <ClickAwayListener
    mouseEvent="onMouseDown"
    touchEvent="onTouchStart"
    onClickAway={handleClickAway}
    >
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link to='/' className={classes.title}>
                Logo
            </Link>               
            {isLoggedIn &&<IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.hide)}
            >
            <MenuIcon />
            </IconButton>}
          </Toolbar>
      </AppBar>
       <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
        paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuList.map((text, index) => (
            <ListItem button key={text} onClick = {() => setOpen(false)}>
              <ListItemIcon>
                {navbarIcons[text]}
              </ListItemIcon>
              <ListItemText primary={navbarLinks[text]} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
   </ClickAwayListener>
 );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   marginRight: -drawerWidth,
  // },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default Navbar;
