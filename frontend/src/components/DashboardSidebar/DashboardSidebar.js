import { useState, useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { InfoIcon, PhoneIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { SidebarData } from "./SidebarData";
import { AuthContext } from "../../context/auth";
import { Link } from 'react-router-dom';

const drawerWidth = 250;

// When resizing the main content can go behind the sidebar. Someone should fix that.
const DashboardSidebar = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useContext(AuthContext);

  console.log(SidebarData);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <Divider />
      <List>
        {SidebarData[user.accountType].map(({ title, path, icon }, i) => (
          <Link to={path}>
            <ListItem button key={i}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <PlusSquareIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary={"Contact"} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={"About Us"} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default DashboardSidebar;
