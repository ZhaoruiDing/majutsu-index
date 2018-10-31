import React from 'react';
import { Button } from 'antd';
import $ from 'jquery'
import {API_ROOT} from "../constants"

export class WatchAndUnwatchButton extends React.Component{
  state ={
    watchstatus: this.props.curAnime.watchstatus,
  }

  handleUnwatch = () => {
    this.setState({watchstatus:(1-this.state.watchstatus)});
    $.ajax({
      url:`${API_ROOT}/animes/watchstatus`,
      method: 'POST',
      data: JSON.stringify({
        email: localStorage.getItem("TOKEN_KEY"),
        animeID: this.props.curAnime.id,
        watchstatus: 0,
      }),
    }).then((response)=>{
      this.setState({watchstatus:(1-this.state.watchstatus)});
    }, (error)=>{
      console.log(error);
    }).catch((e)=>{
      console.log(e);
    });
  }

  handleWatch = () => {
    this.setState({watchstatus:(1-this.state.watchstatus)});
    $.ajax({
      url:`${API_ROOT}/animes/fav`,
      method: 'POST',
      data: JSON.stringify({
        email: localStorage.getItem("TOKEN_KEY"),
        animeID: this.props.curAnime.id,
        watchstatus: 1
      }),
    }).then((response)=>{
      this.setState({watchstatus:(1-this.state.watchstatus)});
    }, (error)=>{
      console.log(error);
    }).catch((e)=>{
      console.log(e);
    });
  }
  render(){
    return (
      //this.props.curAnime.likeStatus === 1?
      this.state.watchstatus == 1?
        <Button type="danger" onClick={this.handleUnwatch}>I don't want to watch</Button>:<Button type="primary" onClick={this.handleWatch}>I want to watch</Button>
    )
  }

}