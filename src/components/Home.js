import React from 'react';
import { Tabs, Spin, message} from 'antd';
import $ from 'jquery';
import {API_ROOT, TOKEN_KEY} from "../constants"
import { Gallery} from './Gallery';
import {dummy_animes} from '../constants'
const TabPane = Tabs.TabPane;
function callback(key) {
  console.log(key);
}


export class Home extends React.Component{

  state = {
    animes: [],
    // favAnimes: [],
    // recommendAnimes: [],
    error:'',
    loadingAnimes: false,
    loadingFavAnimes: false,
    loadingRecommendAnimes: false,
  }

  componentDidMount(){
    this.loadAnimes();
    // this.loadFavoriteAnimes();
    // this.loadRecommendAnimes();
  }

  getGalleryPanelContentAllAnime = () => {
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
    else if (this.state.loadingAnimes) {
      return <Spin tip="LoadingAnimes..."/>;
    }
    else if (this.state.animes && this.state.animes.length > 0) {
      // console.log(this.state.animes);
      console.log(this.state.animes);
      const images = this.state.animes.map((anime) => {
        return {
          // //: anime.user,
          // src: anime.url,
          // thumbnail: anime.url,
          // thumbnailWidth: 400,
          // thumbnailHeight: 300,
          // name: anime.name,
          // likestatus:anime.likestatus,
          // watchstatus: anime.watchstatus,
          // animeID: anime.animeID,
          // //caption: post.message,
          src: 'https://i.kinja-img.com/gawker-media/image/upload/s--s1IAfVS_--/c_fill,f_auto,fl_progressive,g_center,h_675,q_80,w_1200/kaprfadz9rnvypesa2u9.png',
          thumbnail: 'https://i.kinja-img.com/gawker-media/image/upload/s--s1IAfVS_--/c_fill,f_auto,fl_progressive,g_center,h_675,q_80,w_1200/kaprfadz9rnvypesa2u9.png',
          thumbnailWidth: 400,
          thumbnailHeight: 300,
          name: anime.name,
          //likestatus:anime.likestatus,
          //watchstatus: anime.watchstatus,
          likestatus: 0,
          watchstatus: 0,
          animeID: anime.animeID,
          //caption: post.message,
        }
      });

      return <Gallery images={images} galleryType="All" animes={this.state.animes}/>;
    }
    else {
      console.log("sqsqsq111111");
      return null;
    }
  }

  getGalleryPanelContentFavAnimes = () => {
    if (this.state.animes && this.state.animes.length > 0) {
      const images = this.state.animes.map((anime) => {
        return {
          //: anime.user,
          //src: anime.url,
          src: 'https://i.kinja-img.com/gawker-media/image/upload/s--s1IAfVS_--/c_fill,f_auto,fl_progressive,g_center,h_675,q_80,w_1200/kaprfadz9rnvypesa2u9.png',
          thumbnail: anime.url,
          thumbnailWidth: 400,
          thumbnailHeight: 300,
          name: anime.name,
          //likestatus:anime.likestatus,
          //watchstatus: anime.watchstatus,
          likestatus: 0,
          watchstatus: 0,
          animeID: anime.animeID,
          //caption: post.message,
        }
      });
      return <Gallery images={images} galleryType="Fav" animes={this.state.animes}/>;
    }
    else {
      return null;
    }
  }
  getGalleryPanelContentRecommendAnimes = () => {
    if (this.state.animes && this.state.animes.length > 0) {
      const images = this.state.animes.map((anime) => {
        console.log("1111111");
        return {
          // //: anime.user,
          // src: anime.url,
          // thumbnail: anime.url,
          // thumbnailWidth: 400,
          // thumbnailHeight: 300,
          // name: anime.name,
          // likestatus:anime.likestatus,
          // watchstatus: anime.watchstatus,
          // animeID: anime.animeID,
          // //caption: post.message,
          src: 'https://i.kinja-img.com/gawker-media/image/upload/s--s1IAfVS_--/c_fill,f_auto,fl_progressive,g_center,h_675,q_80,w_1200/kaprfadz9rnvypesa2u9.png',
          thumbnail: anime.url,
          thumbnailWidth: 400,
          thumbnailHeight: 300,
          name: anime.name,
          //likestatus:anime.likestatus,
          //watchstatus: anime.watchstatus,
          likestatus: 0,
          watchstatus: 0,
          animeID: anime.animeID,
          //caption: post.message,
        }
      });
      return <Gallery images={images} galleryType="Fav" animes={this.state.animes}/>;
    }
    else {
      return null;
    }
  }

  loadAnimes = () =>{
      const UserEmail = localStorage.getItem(TOKEN_KEY);
      this.setState({loadingAnimes: true, error:''});
      $.ajax({
        url: `${API_ROOT}/animes?UserEmail=${UserEmail}`,
        method: 'GET',
        headers: {},
    }).then((response)=>{
        response = JSON.parse(response);
        this.setState({animes: response || [], loadingAnimes: false, error: ''});
        console.log(response);
      }, (error) => {
        this.setState({ loadingAnimes: false, error: error.responseText });
        console.log(error);
        }
      ).catch((error)=>{
        console.log(error);
      });
  }

  loadFavoriteAnimes = () =>{
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    this.setState({loadingAnimes: true, error:''});
    $.ajax({
      url: `${API_ROOT}/fav?UserEmail=${UserEmail}`,
      method: 'GET',
      headers: {},
    }).then((response)=>{
        this.setState({animes: response, loadingFavAnimes: false, error: ''});
        console.log(response);
      }, (error) => {
        this.setState({ loadingFavAnimes: false, error: error.responseText});
        console.log(error);
      }
    ).catch((error)=>{
      console.log(error);
    });
  }

  loadRecommendAnimes = () =>{
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    this.setState({loadingRecommendAnimes: true, error:''});
    $.ajax({
      url: `${API_ROOT}/fav?UserEmail=${UserEmail}`,
      method: 'GET',
      headers: {},
    }).then((response)=>{
        this.setState({animes: response, loadingRecommendAnimes: false, error: ''});
        console.log(response);
      }, (error) => {
        this.setState({ loadingRecommendAnimes: false, error: error.responseText});
        console.log(error);
      }
    ).catch((error)=>{
      console.log(error);
    });
  }

  render(){
    return (
      <div className="main-tabs">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Anime Gallery" key="1">
            {this.getGalleryPanelContentAllAnime()}
          </TabPane>
          <TabPane tab="Favorite" key="2">
            {this.getGalleryPanelContentRecommendAnimes()}
          </TabPane>
          <TabPane tab="You may like" key="3">
            {this.getGalleryPanelContentFavAnimes()}
          </TabPane>
        </Tabs>,
      </div>
    );
  }

}

