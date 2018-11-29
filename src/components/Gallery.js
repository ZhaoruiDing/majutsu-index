import React, { Component }from 'react';
import ReactDOM from 'react-dom';
import { Button, Menu, Dropdown, Icon, Radio } from 'antd';
import {LikeAndUnlikeButton} from "./LikeAndUnlikeButton";
import {WatchAndUnwatchButton} from "./WatchAndUnwatchButton";
import PropTypes from 'prop-types';
import GridGallery from 'react-grid-gallery';
import { Switch, Route, Redirect,withRouter} from 'react-router'
import { browserHistory } from 'react-router'
class GalleryLow extends Component {

  state = {
    animes: this.props.animes,
    currentAnime: 0,
  }

  onCurrentAnimeChange= (index)=>{
    this.setState({currentAnime: index});
    //ReactDOM.render(<Redirect to="/detail"/>);

  }

  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        //user: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        animeID: PropTypes.number.isRequired,
        watchstatus: PropTypes.number.isRequired,
        likestatus: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        srcset: PropTypes.array,
        // caption: PropTypes.string,
        thumbnailWidth: PropTypes.number.isRequired,
        thumbnailHeight: PropTypes.number.isRequired
      })
    ).isRequired
  }
  onSelectImage = (index, animes) =>{;

    this.props.history.push(`/detail/${this.props.animes[index].animeID}`);
    //加上id
  }
  render() {
    const images = this.props.images.map((image) => {
      return {
        ...image,
        customOverlay: (
          <div style={captionStyle}>
            <div>{`${image.name}`}</div>
          </div>
        ),
      };
    });



    return (
      <div style={wrapperStyle}>
        <GridGallery
          backdropClosesModal
          images={images}
          //enableImageSelection={false}
          enableImageSelection={true}
          onSelectImage={this.onSelectImage}
          currentImageWillChange={this.onCurrentAnimeChange}
          customControls={[
            //<button key="deleteImage" onClick={this.deleteImage}>Delete Image</button>,
            <div key={this.state.animes[this.state.currentAnime].animeID}>
              <LikeAndUnlikeButton curAnime={this.props.animes[this.state.currentAnime]} curTab={this.props.curTab} loadFavoriteAnimes = {this.props.loadFavoriteAnimes}/>
              {/*<WatchAndUnwatchButton curAnime={this.state.animes[this.state.currentAnime]} curTab={this.props.curTab} loadWishAnimes={this.props.loadWishAnimes}/>*/}
            </div>


          ]}
        />
      </div>
    );
  }
}


const wrapperStyle = {
  display: "block",
  minHeight: "1px",
  width: "100%",
  border: "1px solid #ddd",
  overflow: "auto"
};

const captionStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  maxHeight: "240px",
  overflow: "hidden",
  position: "absolute",
  bottom: "0",
  width: "100%",
  color: "white",
  padding: "2px",
  fontSize: "90%"
};

export const Gallery = withRouter(GalleryLow);