import React, { Component } from 'react'
import {
    Grid,
    TextField,
    Paper,
    Button,
    Snackbar,
    Slide,
    Typography,
    Fade,
    CircularProgress
} from '@material-ui/core'
import util from '../Others/Utils'
import data from '../Others/Data'

export default class CreateUserModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            loading: false,
        }
    }
    CreateAccount() {
        if (this.state.username == '') {
            return
        }
        if (this.state.email == '') {
            return
        }
        if (this.state.password == '') {
            return
        }
        let value = {
            username: this.state.username.trim(),
            password: this.state.password.trim(),
            email:this.state.email.trim(),
            type:'admin'
        }
        this.setState({
            loading: true
        }, () => data.CreateAccount(value)
            .then((result) => {
                this.setState({
                    loading: false,
                    snackbaropen: true,
                    message: 'Success'
                },()=>data.Logout().then((result) => {
                    console.log(result)
                    window.location.reload();
                }).catch((err) => {
                    window.location.reload();
                }))
            }).catch((err) => {
                this.setState({
                    loading: false,
                    snackbaropen: true,
                    message: 'Erorr'
                })
            }))
    }
    handleNewChange = prop => event => {
        this.setState({
            [`${prop}error`]: false,
            [prop]: event.target.value
        });
    };
    renderMain() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        fullWidth
                        type="text"
                        onChange={this.handleNewChange("username")}
                        error={this.state.nameerror}
                        value={this.state.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        fullWidth
                        type="text"
                        onChange={this.handleNewChange("email")}
                        error={this.state.nameerror}
                        value={this.state.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        fullWidth
                        type="password"
                        onChange={this.handleNewChange("password")}
                        error={this.state.nameerror}
                        value={this.state.name}
                    />
                </Grid>
                <Grid>
                    <Button
                        variant="contained" color="primary"
                        onClick={this.CreateAccount.bind(this)}
                    >Thêm tài khoản</Button>
                </Grid>
            </Grid>

        )
    }
    render() {
        return (
            <Paper
            style={{
                padding: 20
            }}
            >
                {this.state.loading ?
                    <CircularProgress color="secondary" /> :
                    this.renderMain()
                }
            </Paper>

        )
    }
}
