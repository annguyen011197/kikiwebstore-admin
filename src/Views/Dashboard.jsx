import React, { Component } from 'react'
import {
  Button,
  Modal,
  Dialog
} from "@material-ui/core";
import CreateUser from './CreateUser'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state={
      open: false
    }
  }
  handleAction() {
    this.setState({
      open: !this.state.open
    })
  }
  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleAction.bind(this)}>
          Tạo tài khoản
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleAction.bind(this)}
        >
          <CreateUser />
        </Dialog>
      </div>
    )
  }
}
