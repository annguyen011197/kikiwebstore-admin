import React, { Component } from 'react';
import './App.css';
import Layouts from './Views/Layouts'
import Login from './Views/Login'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      login:false
    }
  }
  handleLogin(){
    this.setState({
      login:true
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.login ? <Layouts/> : <Login parent={this}/>}
      </div>
    );
  }
}

export default App;
