import React from 'react';
import { Button } from 'antd';
import $ from 'jquery'
import {API_ROOT, TOKEN_KEY} from "../constants"

export class LikeAndUnlikeButton extends React.Component{
  state ={
    //likestatus: 0
    likestatus: this.props.curAnime.likestatus || 0,
  }
  componentWillMount(){
        const UserEmail = localStorage.getItem(TOKEN_KEY);
        $.ajax({
            url: `${API_ROOT}/status/likestatus?UserEmail=${UserEmail}&animeID=${this.props.curAnime.animeID}`,
            method: 'GET',
            // name: value
        }).then((response) => {
            //this.setState({favAnimes: search_dummy_animes});
            console.log(response);
            response = JSON.parse(response);
            this.setState({
                likestatus: response['likestatus'],
            });
        }, (error) => {
            console.log(error);
        }).catch((error) => {
            console.log(error);
        })
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
      this.setState({likestatus:(1-this.state.likestatus)});
      this.props.loadFavoriteAnimes();
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