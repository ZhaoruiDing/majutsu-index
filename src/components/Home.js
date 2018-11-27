import React from 'react';
import { Tabs, Spin, message} from 'antd';
import $ from 'jquery';
import {API_ROOT, TOKEN_KEY} from "../constants"
import { Gallery} from './Gallery';
import {dummy_animes} from '../constants'
import {search_dummy_animes} from "../constants"
import {SearchBar} from "./SearchBar"
import {DateInput} from "./DateInput"

const TabPane = Tabs.TabPane;



export class Home extends React.Component{

  state = {
    animes: [],
    favAnimes: [],
    recommendAnimes: [],
    wishAnimes: [],
    error:'',
    loadingAnimes: false,
    loadingFavAnimes: false,
    loadingRecommendAnimes: false,
    loadingWishAnimes: false,
    curTab: "all" //all, fav, rec, wish
  }

  componentDidMount(){
    this.loadAnimes();
    this.loadFavoriteAnimes();
    this.loadRecommendAnimes();
    this.loadWishAnimes();
  }

  getGalleryPanelContentAllAnime = () => {
    //this.setState({curTab: "all"});
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
          src: anime.imageLink,
          //src: 'https://i.kinja-img.com/gawker-media/image/upload/s--s1IAfVS_--/c_fill,f_auto,fl_progressive,g_center,h_675,q_80,w_1200/kaprfadz9rnvypesa2u9.png',
          //thumbnail: 'https://i.kinja-img.com/gawker-media/image/upload/s--s1IAfVS_--/c_fill,f_auto,fl_progressive,g_center,h_675,q_80,w_1200/kaprfadz9rnvypesa2u9.png',
          thumbnail: anime.imageLink,
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

      return <Gallery images={images} galleryType="All" animes={this.state.animes}
                      loadAnimes={this.loadAnimes}
                      loadFavoriteAnimes={this.loadFavoriteAnimes}
                      loadRecommendAnimes = {this.loadRecommendAnimes}
                      loadWishAnimes={this.loadWishAnimes}
                      curTab = "all"/>;
    }
    else {
      console.log("sqsqsq111111");
      return null;
    }
  }

  getGalleryPanelContentFavAnimes = () => {
    //this.setState({curTab: "fav"});
    if (this.state.favAnimes && this.state.favAnimes.length > 0) {
      const images = this.state.favAnimes.map((anime) => {
        return {
          //: anime.user,
          src: anime.imageLink,
          //src: 'https://i.kinja-img.com/gawker-media/image/upload/s--s1IAfVS_--/c_fill,f_auto,fl_progressive,g_center,h_675,q_80,w_1200/kaprfadz9rnvypesa2u9.png',
          thumbnail: anime.imageLink,
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
      return <Gallery images={images} galleryType="Fav" animes={this.state.favAnimes}
                      loadAnimes={this.loadAnimes}
                      loadFavoriteAnimes={this.loadFavoriteAnimes}
                      loadRecommendAnimes = {this.loadRecommendAnimes}
                      loadWishAnimes={this.loadWishAnimes}
                      curTab = "fav"/>;
    }
    else {
      return null;
    }
  }
  getGalleryPanelContentRecommendAnimes = () => {

    if (this.state.recommendAnimes && this.state.recommendAnimes.length > 0) {
      //this.setState({curTab: "rec"});
      const images = this.state.recommendAnimes.map((anime) => {
        console.log("gagaggaaga");
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
          src: anime.imageLink,
          //src: 'https://i.kinja-img.com/gawker-media/image/upload/s--s1IAfVS_--/c_fill,f_auto,fl_progressive,g_center,h_675,q_80,w_1200/kaprfadz9rnvypesa2u9.png',
          thumbnail: anime.imageLink,
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

      return <Gallery images={images} galleryType="Rec" animes={this.state.recommendAnimes}
                      loadAnimes={this.loadAnimes}
                      loadFavoriteAnimes={this.loadFavoriteAnimes}
                      loadRecommendAnimes = {this.loadRecommendAnimes}
                      loadWishAnimes={this.loadWishAnimes}
                      curTab = "rec"/>;
    }
    else {
      return null;
    }
  }


  getGalleryPanelContentWishAnimes = () => {
    //this.setState({curTab: "fav"});
    if (this.state.wishAnimes && this.state.wishAnimes.length > 0) {
      const images = this.state.wishAnimes.map((anime) => {
        return {
          //: anime.user,
          src: anime.imageLink,
          //src: 'https://i.kinja-img.com/gawker-media/image/upload/s--s1IAfVS_--/c_fill,f_auto,fl_progressive,g_center,h_675,q_80,w_1200/kaprfadz9rnvypesa2u9.png',
          thumbnail: anime.imageLink,
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
      return <Gallery images={images} galleryType="Wish" animes={this.state.wishAnimes}
                      loadAnimes={this.loadAnimes}
                      loadFavoriteAnimes={this.loadFavoriteAnimes}
                      loadRecommendAnimes = {this.loadRecommendAnimes}
                      loadWishAnimes={this.loadWishAnimes}
                      curTab = "wish"/>;
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
          //this.setState({animes: dummy_animes, loadingAnimes: false, error: ''});
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
    this.setState({loadingFavAnimes: true, error:''});
    $.ajax({
      url: `${API_ROOT}/animes/fav?UserEmail=${UserEmail}`,
      method: 'GET',
      headers: {},
    }).then((response)=>{
        //this.setState({favAnimes: dummy_animes, loadingFavAnimes: false, error: ''});
      response = JSON.parse(response);
      this.setState({favAnimes: response || [], loadingFavAnimes: false, error: ''});
      console.log(this.state.favAnimes)
      }, (error) => {
        //this.setState({ loadingFavAnimes: false, error: error.responseText});

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
      url: `${API_ROOT}/animes/rec?UserEmail=${UserEmail}`,
      method: 'GET',
      headers: {},
    }).then((response)=>{
        // this.setState({recommendAnimes: dummy_animes, loadingRecommendAnimes: false, error: ''});
        console.log(response);
        response = JSON.parse(response);
        this.setState({recommendAnimes: response || [], loadingRecommendAnimes: false, error: ''});
      }, (error) => {
        this.setState({ loadingRecommendAnimes: false, error: error.responseText});
        console.log(error);
      }
    ).catch((error)=>{
      console.log(error);
    });
  }

  loadWishAnimes = () =>{
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    this.setState({loadWishAnimes: true, error:''});
    $.ajax({
      url: `${API_ROOT}/wish?UserEmail=${UserEmail}`,
      method: 'GET',
      headers: {},
    }).then((response)=>{
        //this.setState({animes: dummy_animes, loadingAnimes: false, error: ''});
        response = JSON.parse(response);
        this.setState({wishAnimes: response || [], loadingWishAnimes: false, error: ''});
        console.log(response);
      }, (error) => {
        this.setState({ loadingWishAnimes: false, error: error.responseText });
        console.log(error);
      }
    ).catch((error)=>{
      console.log(error);
    });
  }

  loadSearchResAll = (value) =>{
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    $.ajax({
      url: `${API_ROOT}/search/all?UserEmail=${UserEmail}&value=${value}`,
      method: 'GET',
      // name: value
    }).then((response)=>{
      console.log(response);
      response = JSON.parse(response);
      this.setState({animes: response || []});
      }, (error)=>{
        console.log(error);
      }
    ).catch((error)=>{
      console.log(error);
    })

  }

  loadSearchResFav = (value)=>{
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    $.ajax({
      url: `${API_ROOT}/search/fav?UserEmail=${UserEmail}&value=${value}`,
      method: 'GET',
      // name: value
    }).then((response)=>{
        //this.setState({favAnimes: search_dummy_animes});
      console.log(response);
      response = JSON.parse(response);
      this.setState({favAnimes: response || []});
      }, (error)=>{
        console.log(error);
      }
    ).catch((error)=>{
      console.log(error);
    })
  }

  loadSearchResRec = (value)=>{
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    $.ajax({
      url: `${API_ROOT}/search/rec?UserEmail=${UserEmail}&value=${value}`,
      method: 'GET',
      // name: value
    }).then((response)=>{
        //this.setState({recommendAnimes: search_dummy_animes});
      console.log(response);
      response = JSON.parse(response);
      this.setState({recommendAnimes: response || []});
      }, (error)=>{
        console.log(error);
      }
    ).catch((error)=>{
      console.log(error);
    })
  }

  loadSearchResWish = (value)=>{
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    $.ajax({
      url: `${API_ROOT}/search/wish?UserEmail=${UserEmail}&value=${value}`,
      method: 'GET',
      // name: value
    }).then((response)=>{
        //this.setState({recommendAnimes: search_dummy_animes});
        console.log(response);
        response = JSON.parse(response);
        this.setState({wishAnimes: response || []});
      }, (error)=>{
        console.log(error);
      }
    ).catch((error)=>{
      console.log(error);
    })
  }

  loadSearchDateResAll = (month, year) => {
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    $.ajax({
      url: `${API_ROOT}/search/date?UserEmail=${UserEmail}&year=${year}&month=${month}`,
      method: 'GET',
      // month: month,
      // year: year,
    }).then((response)=>{
      console.log(response);
      response = JSON.parse(response);
      this.setState({animes: response || []});
      }, (error)=>{
        console.log(error);
      }
    ).catch((error)=>{
      console.log(error);
    })

  }
  callback = (key) => {
    console.log(key);
    if (key === "1"){
      this.setState({curTab: "all"});
    }
    else if (key === "2"){
      this.setState({curTab: "fav"});
    }
    else{
      this.setState({curTab: "rec"});
    }
  }
  render(){
    return (
      <div>
      <SearchBar searchType = {this.state.curTab} loadSearchResAll={this.loadSearchResAll}
                                                  loadSearchResFav={this.loadSearchResFav}
                                                  loadSearchResRec={this.loadSearchResRec}
                                                  loadSearchResWish={this.loadSearchResWish}
                                                  loadAnimes={this.loadAnimes}
                                                  loadFavoriteAnimes={this.loadFavoriteAnimes}
                                                  loadRecommendAnimes={this.loadRecommendAnimes}
                                                  loadWishAnimes={this.loadWishAnimes}/>

        {this.state.curTab === 'all' ? <DateInput loadSearchDateResAll={this.loadSearchDateResAll}/> : null}
      <div className="main-tabs">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Anime Gallery" key="1">
            {this.getGalleryPanelContentAllAnime()}
          </TabPane>
          <TabPane tab="Favorite" key="2">
            {this.getGalleryPanelContentFavAnimes()}
          </TabPane>
          <TabPane tab="You may like" key="3">
            {this.getGalleryPanelContentRecommendAnimes()}
          </TabPane>
          <TabPane tab="Wish List" key="4">
            {this.getGalleryPanelContentWishAnimes()}
          </TabPane>
        </Tabs>,
      </div>
      </div>
    );
  }

}

