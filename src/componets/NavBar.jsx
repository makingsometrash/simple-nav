import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TypoGraphy from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px"
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
    <li>
      <ListItem button component={renderLink}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
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
    </div>
  );
}

export default NavBar;
