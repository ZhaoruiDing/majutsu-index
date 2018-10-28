import React from 'react';
import logo from '../assets/logo.svg';

export class Header extends React.Component{
  render(){
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title"> Majutsu Index </h1>
      </header>
    );
  }
}