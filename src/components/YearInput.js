import React from 'react';
import { InputNumber } from 'antd';

export class YearInput extends React.Component {
  state = {
    year: 1,
  }

  onChange = (value)=>{
    console.log(value);
    this.props.getYear(value);
  }

  render(){
    return  <InputNumber min={2009} max={2018} defaultValue={2009} onChange={this.onChange} />
  }
}