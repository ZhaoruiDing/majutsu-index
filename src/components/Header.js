import React from 'react';
import logo from '../assets/logo.svg';
import {Icon} from 'antd';
export class Header extends React.Component{
  render(){
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title"> Majutsu Index </h1>
        {
          this.props.isLoggedIn ?
            <a className="logout"
               onClick={this.props.handleLogout}
            >
              <Icon type="logout" />{' '}Logout
            </a> : null
        }
      </header>
    );
  }
}