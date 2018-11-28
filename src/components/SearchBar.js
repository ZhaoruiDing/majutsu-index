import React from 'react';
import { AutoComplete, Icon, Input } from 'antd';
import $ from 'jquery';
import {API_ROOT, TOKEN_KEY} from "../constants"
import {dummy_animes} from "../constants"

function onSelect(value) {
  console.log('onSelect', value);
}
const Option = AutoComplete.Option;
export class SearchBar extends React.Component {
  state = {
    dataSource: [],
    searchType: this.props.searchType, //all, fav, rec
  }

  handleSearch = (value) => {
    const UserEmail = localStorage.getItem(TOKEN_KEY);
    //var searchRes = dummy_animes;
    //var searchRes = [];
    $.ajax({
        url: `${API_ROOT}/search/${this.state.searchType}?UserEmail=${UserEmail}&value=${value}`,
        method: 'GET',
        //name: value
      }).then((response)=>{
        response = JSON.parse(response);
        response = response || [];
        this.setState({
          dataSource: !value ? [] : response.map(({animeID, name})=>
            <Option key={animeID} value={name}>

              <span>{name}</span>
            </Option>
          ),
        });
        //searchRes = dummy_animes;
    }, (error)=>{
        console.log(error);
    }
    ).catch((error)=>{
      console.log(error);
    })
    // this.setState({
    //   dataSource: !value ? [] : response.map(({animeID, name})=>
    //     <Option key={animeID} value={name}>
    //
    //       <span>{name}</span>
    //     </Option>
    //   ),
    // });
  }
  onSelectFn = (value) => {

    if (this.props.searchType === "all"){
      console.log('onSelect', value);
      return this.props.loadSearchResAll;
    }
    else if (this.props.searchType === "fav"){
      console.log('onSelect', value);
      return this.props.loadSearchResFav;
    }
    else{
      console.log('onSelect', value);
      return this.props.loadSearchResRec;
    }
    //console.log('onSelect', value);
  }

  onSelect = (value) => {
    var targetFunction = this.onSelectFn(this.props.searchType);
    targetFunction(value);
  }

  onChange = (value) => {
    if (value === ""){
      if (this.props.searchType === "all"){
        console.log("ffefefefeffef");
        this.props.loadAnimes();
        console.log("loading");
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
        // onSelect={this.onSelectFn()}
        onSelect={this.onSelect}
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