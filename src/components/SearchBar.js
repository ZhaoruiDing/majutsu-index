import React from 'react';
import { AutoComplete, Icon, Input } from 'antd';
import $ from 'jquery';
import {API_ROOT, TOKEN_KEY} from "../constants"
import {dummy_animes} from "../constants"


const Option = AutoComplete.Option;
export class SearchBar extends React.Component {
  state = {
    dataSource: [],
    searchType: this.props.searchType, //all, fav, rec
  }

  handleSearch = (value) => {
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    var searchRes = dummy_animes;
    $.ajax({
        url: `${API_ROOT}/search/${this.state.searchType}?UserEmail=${UserEmail}`,
        method: 'GET',
        name: value
      }).then((response)=>{
        searchRes = response;
        searchRes = dummy_animes;
    }, (error)=>{
        console.log(error);
    }
    ).catch((error)=>{
      console.log(error);
    })
    this.setState({
      dataSource: !value ? [] : searchRes.map(({animeID, name})=>
        <Option key={animeID} value={name}>

          <span>{name}</span>
        </Option>
      ),
    });
  }
  onSelectFn = () => {

    if (this.props.searchType === "all"){
      console.log("ffefefefeffef");
      return this.props.loadSearchResAll;
    }
    else if (this.props.searchType === "fav"){

      return this.props.loadSearchResFav;
    }
    else{
      return this.props.loadSearchResRec;
    }
  }

  onChange = (value) => {
    if (value === ""){
      if (this.props.searchType === "all"){
        console.log("ffefefefeffef");
        this.props.loadAnimes();
      }
      else if (this.props.searchType === "fav"){
        this.props.loadFavoriteAnimes();
      }
      else{
        this.props.loadRecommendAnimes();
      }
    }

  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        className={"search-bar"}
        size="large"
        onSelect={this.onSelectFn()}
        onSearch={this.handleSearch}
        onChange={this.onChange}
        placeholder="Search Anime"
        optionLabelProp="value"
      >
        <Input suffix={<Icon type="search" />} />
      </AutoComplete>
    );
  }
}