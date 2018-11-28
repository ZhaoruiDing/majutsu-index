import React from 'react';
import {YearInput} from "./YearInput"
import {MonthInput} from "./MonthInput"
import { Button } from 'antd';
export class DateInput extends React.Component{
    state = {
      month: 1,
      year: 2009,
    }

    getMonth = (value) => {
      console.log(value);
      console.log(typeof (value));
      this.setState({month: value});
    }

    getYear = (value) => {
      console.log(value);
      console.log(typeof (value));
      this.setState({year: value});
    }
    onClick = () =>{
        this.props.loadSearchDateResAll();
    }
    render(){
      return (
        <div>
          <span className="search-date-info">Or you can search an anime by date</span>
          <YearInput getYear={this.getYear}/>
          <MonthInput getMonth={this.getMonth}/>
          <Button shape="circle" icon="search" className="date-search-button" onClick={this.onClick}/>

        </div>
      )
    }

}