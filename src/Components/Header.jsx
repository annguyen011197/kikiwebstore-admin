import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Avatar, withStyles } from "@material-ui/core";
import { Email, Notifications,Menu } from '@material-ui/icons'
import classNames  from 'classnames'

let drawerWidth = 200

const styles = theme => ({
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        backgroundColor: '#1BA4F0'
    },
    icon: {
        marginLeft: 10,
        marginRight: 10,
        color: 'white'
    },  
    navIconHide: {
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      }
})

class Header extends Component {
    render() {
        const { classes, theme } = this.props;
        return (
            <AppBar
                className={classes.appBar}
            >
                <Toolbar
                    style={{
                        justifyContent:'space-between',
                        alignItems:'center',
                        alignContent:'center'
                    }}
                >
                    <div>
                    <IconButton 
                    className={classNames(classes.icon,classes.navIconHide)} 
                    onClick={this.props.menuClick}
                    >
                            <Menu />
                        </IconButton>
                    </div>
                    <div
                        style={{
                            display:'flex',
                            alignItems:'center',
                            alignContent:'center'
                        }}
                    >
                        <IconButton className={classes.icon} >
                            <Email />
                        </IconButton>
                        <IconButton className={classes.icon}>
                            <Notifications />
                        </IconButton>
                        <Avatar
                            style={{
                                backgroundColor: this.props.avatarColor
                            }}
                        >A</Avatar>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Header)