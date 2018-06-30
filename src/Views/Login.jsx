import React, { Component } from 'react'
import {
    Paper,
    Typography,
    withStyles,
    TextField,
    InputAdornment,
    Grid,
    IconButton,
    Button
} from '@material-ui/core'
import { AccountCircle, Lock, Clear } from '@material-ui/icons';
import $ from 'jquery'
const style = {
    background: {
        position: 'fixed',
        backgroundImage: `url(${"/background.webp"})`,
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        filter: 'blur(3px)',
        zIndex: -99999
    },
    content: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            errorpassword: false,
            errorusername: false
        }
        this.submitForm = this.submitForm.bind(this)
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value, [`error${prop}`]: false });
    };
    handleClear = prop => event => {
        this.setState({ [prop]: '' })
    }
    Test() {
        $.ajax({
            type:'get',
            url:'http://localhost:3000/api/books',
            data:{
                offset:1,
                limit:10
            },
            xhrFields: {
                withCredentials: true
           }
        }).done(res=>{
            console.log(res)
        }).fail(err=>{
            console.log(err)
        })
    }
    submitForm = () => {
        if (this.state.password == '') {
            this.setState({
                errorpassword: true
            })
        }
        else if (this.state.username == '') {
            this.setState({
                errorusername: true
            })
        } else {
            let username = this.state.username
            let password = this.state.password
            let data = {
                email: username,
                password: password,
                type: 'admin'
            }
            $.ajax({
                type: "post",
                url: "http://localhost:3000/users/login",
                data: data,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
               }
            }).done(res=>{
               this.props.parent.handleLogin()
            }).fail(err=>{
                alert('Wrong username or password')
            })
        }
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <div className={classes.background}
                >
                </div  >
                <div className={classes.content}>
                    <Paper elevation={1} style={{
                        height: 'fit-content',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        padding: 55
                    }}>
                        <div>
                            <img src="https://kikibookstore.herokuapp.com/media/logo.png" />
                        </div>

                        <Typography variant="title" component="h1" style={{
                            fontSize: '3em',
                            marginTop: 30,
                            marginBottom: 30
                        }}>
                            Login
                        </Typography>
                        <div >
                            <Grid container spacing={8} alignItems="center">
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        error={this.state.errorusername}
                                        label="Username"
                                        type="text"
                                        margin="normal"
                                        fullWidth
                                        onChange={this.handleChange('username')}
                                        value={this.state.username}
                                        InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    {this.state.username == '' ?
                                                        <div></div>
                                                        : <IconButton onClick={this.handleClear('username')}>
                                                            <Clear />
                                                        </IconButton>}
                                                </InputAdornment>
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div >
                            <Grid container spacing={8} alignItems="center">
                                <Grid item>
                                    <Lock />
                                </Grid>
                                <Grid xs item
                                >
                                    <TextField
                                        error={this.state.errorpassword}
                                        label="Password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        margin="normal"
                                        onChange={this.handleChange('password')}
                                        value={this.state.password}
                                        fullWidth
                                        InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    {this.state.password == '' ?
                                                        <div></div>
                                                        : <IconButton onClick={this.handleClear('password')}>
                                                            <Clear />
                                                        </IconButton>}
                                                </InputAdornment>
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <div style={{
                            textAlign: 'right'
                        }}>
                            <Button color="primary"
                                onClick={() => {
                                    this.setState({
                                        showPassword: !this.state.showPassword
                                    })
                                }}
                            >
                                Show Password
                            </Button>
                        </div>

                        <div style={{
                            textAlign: 'right',
                        }}>
                            <Button variant="extendedFab" style={{
                                paddingLeft: 30,
                                paddingRight: 30
                            }}
                                onClick={this.submitForm}
                            >
                                Login
                        </Button>
                        </div>
                    </Paper>
                </div>
            </div>

        )
    }
}

export default withStyles(style)(LogIn)
