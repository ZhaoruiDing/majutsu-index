import React from 'react';
import { InputNumber } from 'antd';

export class MonthInput extends React.Component {
  state = {
    month: 1,
  }

  onChange = (value)=>{
    console.log(value);
    this.props.getMonth(value);
  }

  render(){
    return  <InputNumber min={1} max={12} defaultValue={1} onChange={this.onChange} />
  }
}