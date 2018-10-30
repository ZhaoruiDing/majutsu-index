import React from 'react';

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import $ from 'jquery';
import {API_ROOT} from "../constants";
import {Link} from 'react-router-dom';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        $.ajax({
          url: `${API_ROOT}/login`,
          method:'POST',
          data:JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }).then((response)=>{
          message.success(response);
          this.props.history.push("/home");
        },(error)=>{
          message.error(error.responseText);
        }).catch((e)=>{
          console.log(e);
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">


        {/*<FormItem*/}
          {/*//{...formItemLayout}*/}
          {/*label="E-mail"*/}
        {/*>*/}
          {/*{getFieldDecorator('email', {*/}
            {/*rules: [{*/}
              {/*type: 'email', message: 'The input is not valid E-mail!',*/}
            {/*}, {*/}
              {/*required: true, message: 'Please input your E-mail!',*/}
            {/*}],*/}
          {/*})(*/}
            {/*<Input />*/}
          {/*)}*/}
        {/*</FormItem>*/}


        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </FormItem>
      </Form>
    );
  }
}

export const Login = Form.create()(NormalLoginForm);