import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TypoGraphy from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  drawerHeader: {
    width: 250,
    display: "flex",
    backgroundColor: theme.palette.grey[400],
    padding: "0 8px"
  },

  drawerInner: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper
  },
  menuItem: {
    display: "flex"
  }
}));

function ListItemLink(props) {
  const { primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem button component={renderLink}>
      <ListItemText primary={primary} />
    </ListItem>
  );
}

ListItemLink.propTypes = {
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

function NavBar(props) {
  const classes = useStyles();

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setDrawerIsOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerIsOpen(false);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            onClick={handleDrawerOpen}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <List component="nav">
            <ListItem component="div">
              <ListItemLink to="/" primary="Home" />

              <ListItemText inset>
                <TypoGraphy color="inherit" variant="title">
                  <ListItemLink to="/about" primary="About" />
                </TypoGraphy>
              </ListItemText>

              <ListItemText inset>
                <TypoGraphy color="inherit" variant="title">
                  <ListItemLink to="/contact" primary="Contact" />
                </TypoGraphy>
              </ListItemText>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        classes={{
          paper: classes.drawerPaper
        }}
        open={drawerIsOpen}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div className={classes.drawerInner}>
          <List component="nav">
            <ListItemLink to="/" primary="Home" />
            <ListItemLink to="/about" primary="About" />
            <ListItemLink to="/contact" primary="Contact" />
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default NavBar;
