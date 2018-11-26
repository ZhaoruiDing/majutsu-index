import React from 'react';
import { Button } from 'antd';
import $ from 'jquery'
import {API_ROOT} from "../constants"

export class LikeAndUnlikeButton extends React.Component{
  state ={
    likestatus: 0
    //this.props.curAnime.likestatus,
  }

  handleDislike = () => {
    //this.setState({likestatus:(1-this.state.likestatus)});
    $.ajax({
      url:`${API_ROOT}/animes/fav`,
      method: 'POST',
      data: JSON.stringify({
        email: localStorage.getItem("TOKEN_KEY"),
        animeID: this.props.curAnime.animeID,
        action: 0
      }),
    }).then((response)=>{
      this.setState({likestatus:(1-this.state.likestatus)});
      this.props.loadFavoriteAnimes();
    }, (error)=>{
      console.log(error);
    }).catch((e)=>{
      console.log(e);
    });
  }

  handleLike = () => {
    //this.setState({likestatus:(1-this.state.likestatus)});
    $.ajax({
      url:`${API_ROOT}/animes/fav`,
      method: 'POST',
      data: JSON.stringify({
        email: localStorage.getItem("TOKEN_KEY"),
        animeID: this.props.curAnime.animeID,
        action: 1
      }),
    }).then((response)=>{
      this.props.loadFavoriteAnimes();
      this.setState({likestatus:(1-this.state.likestatus)});
    }, (error)=>{
      console.log(error);
    }).catch((e)=>{
      console.log(e);
    });
  }
  render(){
    return (
      //this.props.curAnime.likestatus === 1?
      this.state.likestatus == 1?
     <Button type="danger" onClick={this.handleDislike}>Unlike</Button>:<Button type="primary" onClick={this.handleLike}>Like</Button>
    )
  }

}