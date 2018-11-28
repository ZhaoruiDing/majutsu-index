import React from 'react';
import {Register} from "./Register";
import {Login} from "./Login";
import {Home} from "./Home";
import {DetailPage} from "./DetailPage"
import { Switch, Route, Redirect } from 'react-router';
export class Main extends React.Component {
  getLogin = ()=>{
    return  this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin}/>;
  }
  getHome = () => {
    return this.props.isLoggedIn? <Home/> : <Redirect to="/login"/>;
  }

  getRoot = () => {
    return <Redirect to="/login"/>;
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={this.getRoot}/>
        <Route path="/login" render={this.getLogin}/>
        <Route path="/home" render={this.getHome}/>
        <Route path="/register" component={Register}/>
        <Route path="/detail/:id" component={DetailPage}/>
        <Route render={this.getLogin}/>
      </Switch>
    );

  }
}