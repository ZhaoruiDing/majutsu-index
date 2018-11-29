import React, { Component } from 'react';
import { Rate, Button, Radio} from 'antd';
// import './DetailPage.css';
import 'antd/dist/antd.css';
import {API_ROOT, TOKEN_KEY} from "../constants"
import $ from "jquery"
import {message} from "antd/lib/index"


export class DetailPage extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     Watched: "0",
  //     value: 0,
  //   };
  // }
  //['animeID', 'name', 'imageLink', 'releaseDate', 'releaseYear', 'episode', 'studio', 'director', 'tags', 'likestatus', 'watchstatus' 'rate']
 state = {
   animeID: this.props.match.params.id,
   name: "",
   imageLink: "",
   releaseDate: "",
   releaseYear: 0,
   episode: 0,
   studio: "",
   director: "",
   tags: "",
   likestatus: 0,
   watchstatus: "0",
   rate: "",
   imageLink: "",
   userrate: 0,
   rate: "",

 }

 componentWillMount(){
   console.log("草泥马");
   this.loadDetailPage();
 }
  loadDetailPage = ()=>{
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    console.log(typeof(this.state.animeID));
    console.log(this.state.animeID);
    $.ajax({
      url: `${API_ROOT}/detail?UserEmail=${UserEmail}&animeID=${this.state.animeID}`,
      method: 'GET',
      // name: value
    }).then((response)=>{
        console.log(response);
        response = JSON.parse(response);
        response = response[0];
        this.setState({
          animeID: response.animeID,
          name: response.name,
          releaseDate: response.releaseDate,
          releaseYear: response.releaseYear,
          episode: response.episode,
          studio: response.studio,
          director: response.director,
          tags: response.tags,
          likestatus: response.likestatus,
          watchstatus:response.watchstatus,
          rate: response.rate,
          imageLink: response.imageLink,
          userrate: response.userrate,

        });
      }, (error)=>{
        console.log(error);
      }
    ).catch((error)=>{
      console.log(error);
    })
  }
  CreateTags = () =>{
    let ret = []
    ret.push(<Button>{this.state.tags}</Button>)
    return ret
  }

  SwitchStatus = (watchstatus) =>{
    //this.setState({Watched: a});
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    $.ajax({
      url: `${API_ROOT}/watchstatus`,
      method:'POST',
      data:JSON.stringify({
        email: UserEmail,
        watchstatus: watchstatus,
        animeID: this.state.animeID,
      }),
    }).then((response)=>{

    },(error)=>{
      message.error(error.responseText);
    }).catch((e)=>{
      console.log(e);
    });
    this.setState({watchstatus: watchstatus});
    console.log(watchstatus);
  }

  // handleChange = (value) => {
  //   this.setState({ value });
  // }
//以前用来玩rate的
  handleRateChange = (value) => {
   console.log(value);
   this.setState({userrate: value});
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    $.ajax({
      url: `${API_ROOT}/rate`,
      method:'POST',
      data:JSON.stringify({
        email: UserEmail,
        userrate: value,
        animeID: this.state.animeID,
      }),
    }).then((response)=>{
      // message.success(response);
      }
    ,(error)=>{
      message.error(error.responseText);
    }).catch((e)=>{
      console.log(e);
    });
  }



  render(){

    const { value } = this.state;

    return (

      <div>

        <img className = "center"
             src = {this.state.imageLink}
             alt = "No Anime Pic"
             width = '300'
        />

        <div>
          <h2 className="center-text">{this.state.name}</h2>

          < ul className = "info" >
            < li> < strong > Released Year: </strong> {this.state.releaseYear}</li >
            <li> <strong>Released Date:</strong> {this.state.releaseDate}</li>
            <li> <strong>Rating:</strong> {this.state.rate}</li>
            <li> <strong>Director:</strong> {this.state.director}</li>
            <li> <strong>Studio:</strong> {this.state.studio}</li>
            < li > < strong > Tags: </strong> {this.state.tags}</li >
          </ul>
        </div>


        <h3 className="text" >Watch Status: <Radio.Group defaultValue = {this.props.WatchStatus} buttonStyle="solid">
          <Radio.Button onClick={this.SwitchStatus.bind(this, "1")} value="1">Want to watch</Radio.Button>
          <Radio.Button onClick={this.SwitchStatus.bind(this, "2")} value="2">Watching</Radio.Button>
          <Radio.Button onClick={this.SwitchStatus.bind(this, "3")} value="3">Watched</Radio.Button>
          <Radio.Button onClick={this.SwitchStatus.bind(this, "4")} value="4">Dropped</Radio.Button>
        </Radio.Group></h3>

        <h3 className="text" >Your Rate: <Rate onChange={this.handleRateChange} value={this.state.userrate} /> </h3>

      </div>

    );

  }
}

DetailPage.defaultProps = {
  WatchStatus : "0",
  Tags : ["love", "school", "youth"],
  Title : "Title",
  JapName : 2,
  Released : 3,
  Rating : 4,
  Director : 5,
  Studio : 6,
  Plot : "The protagonist Beowulf, a hero of the Geats, comes to the aid of Hrothgar, king of the Danes, whose great hall, Heorot, is plagued by the monster Grendel. Beowulf kills Grendel with his bare hands and Grendel's mother with a giant's sword that he found in her lair."
}

export default DetailPage;