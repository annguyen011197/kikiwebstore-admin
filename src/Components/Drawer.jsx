import React, { Component } from "react";
import {
  Hidden,
  Drawer,
  withStyles,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  Avatar,
  ListItemIcon
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  Create,
  ViewList
} from '@material-ui/icons';
import { Link } from 'react-router-dom'

let drawerwidth = 200
let style = theme => ({
  drawer: {
    width: drawerwidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    }
  },
  logo: {
    width: '100%'
  },
  avatar: {
    width: 80,
    height: 80,
    alignSelf: 'center'
  },
  avatarContainer: {
    justifyContent: 'center'
  },
  usernameContainer: {
    textAlign: 'center'
  }
})
class DrawerMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: false,
      category: false
    }
  }
  renderDrawer() {
    const { classes, theme } = this.props;
    return (
      <List>
        <ListItem button component={props => <Link to="/" {...props} />}>
          <img src="https://kikibookstore.herokuapp.com/media/logo.png"
            className={classes.logo}
            href='/'
          />
        </ListItem>
        <ListItem>
          <ListItemText secondary="v1.0" />
        </ListItem>
        <Divider />
        <ListItem className={classes.avatarContainer}>
          <Avatar className={classes.avatar} style={{
            backgroundColor: this.props.avatarColor
          }}>A</Avatar>
        </ListItem>
        <ListItem className={classes.usernameContainer} >
          <ListItemText primary="admin" />
        </ListItem>
        <Divider />
        <ListItem button component={props => <Link to="/user" {...props} />}>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={props => <Link to="/oder" {...props} />}>
          <ListItemText primary="Order" />
        </ListItem>
        <ListItem button onClick={() => {
          this.setState({
            book: !this.state.book
          })
        }}>
          <ListItemText primary="Book" />
          {this.state.book ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.book} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={props => <Link to="/book/create" {...props} />} >
              <ListItemIcon>
                <Create />
              </ListItemIcon>
              <ListItemText inset primary="Create" />
            </ListItem>
            <ListItem button component={props => <Link to="/book" {...props} />} >
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText inset primary="List" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={() => {
          this.setState({
            category: !this.state.category
          })
        }}>
          <ListItemText primary="Category" />
          {this.state.category ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.category} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button >
              <ListItemIcon>
                <Create />
              </ListItemIcon>
              <ListItemText inset primary="Create" />
            </ListItem>
            <ListItem button component={props => <Link to="/category" {...props} />} >
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText inset primary="List" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button component={props => <Link to="/event" {...props} />}>
          <ListItemText primary="Event" />
        </ListItem>
      </List>
    )
  }
  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <Hidden mdUp>
          <Drawer
            open={this.props.drawerOpen}
            onClose={this.props.drawerOnClose}
            variant="temporary"
            ModalProps={{
              keepMounted: true
            }}
            classes={{
              paper: classes.drawer
            }}
          >
            {this.renderDrawer()}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            open={false}
            variant="permanent"
            ModalProps={{
              keepMounted: true
            }}
            classes={{
              paper: classes.drawer
            }}
          >
            {this.renderDrawer()}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}


export default withStyles(style, { withTheme: true })(DrawerMenu)