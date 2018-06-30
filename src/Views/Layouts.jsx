import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Dashboard from './Dashboard'
import BookList from './Booklist'
import Category from './Category'
import CreateBook from './CreateBook'
import EventForm from './EventForm'
import OrderList from './OrderList'
import { withStyles } from '@material-ui/core';
// component
import Header from '../Components/Header';
import DrawerMenu from '../Components/Drawer';

import Utils from '../Others/Utils'

var indexRoutes = [
  { path: "/category", name: "HomePage", component: Category },
  { path: "/book/create", name: "CreateBookPage", component: CreateBook },
  { path: "/book", name: "BookListPage", component: BookList },
  { path: "/event", name: "CreateEventPage", component: EventForm },
  { path: '/oder', name: 'OderPage', component: OrderList },
  { path: "/", name: "HomePage", component: Dashboard },
];
let drawerwidth = 200
let style = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  drawer: {
    width: drawerwidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    }
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    overflow: 'scroll'
  }
})

class Layouts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false
    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  }
  renderMain() {
    return (
      <div>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} key={key}
              component={prop.component}
            />
          })}
        </Switch>
      </div>
    )
  }
  render() {
    const { classes, theme } = this.props;
    let color = Utils.getRandomColor()
    return (
      <Router>
        <div className={classes.root}>
          <Header
            menuClick={this.handleDrawerToggle}
            avatarColor={color}
          />
          <DrawerMenu
            drawerOpen={this.state.mobileOpen}
            drawerOnClose={this.handleDrawerToggle}
            avatarColor={color}
          />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {this.renderMain()}
          </main>
        </div>
      </Router>
    )
  }
}

export default withStyles(style, { withTheme: true })(Layouts)