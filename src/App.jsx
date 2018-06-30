import React, { Component } from 'react';
import './App.css';
import Layouts from './Views/Layouts'
import Login from './Views/Login'
import cookie from 'react-cookies'
import $ from 'jquery'
import { Modal } from '@material-ui/core';
import util from './Others/Utils'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      username: ''
    }
  }
  componentWillMount() {
    let username = ''
    $.ajax({
      async:false,
      type: 'get',
      url: util.serverURL+'/admin/islogedin',
      xhrFields: {
        withCredentials: true
      }
    }).done(res => {
      if(res.code==0){
        this.setState({
          login:true,
          username:res.username
        })
        username = res.username
      }
    }).fail(err => {
      console.log(err)
    })
  }
  handleLogin() {
    this.setState({
      login: true
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.login ? <Layouts /> : <Login parent={this} />}
      </div>
    );
  }
}

export default App;
