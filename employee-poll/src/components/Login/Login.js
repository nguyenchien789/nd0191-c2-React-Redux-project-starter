import React from 'react';
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { store } from "../../state/store/store.js"
import { userLogin } from "../../state/action/action.js";
import { useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    var user = store.getState().users[values.username];
    if(user !== undefined && user.password === values.password) {
      store.dispatch(userLogin(user));
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get('redirectTo');
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate("/");
      }
    }
  };
  return <div style={{display: "flex", justifyContent: "center", marginTop: "30vh"}}>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input data-testid="username" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          data-testid="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{width: "100%"}} className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  </div>;
};

export default Login;
