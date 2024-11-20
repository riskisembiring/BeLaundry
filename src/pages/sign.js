// src/pages/SignIn.js
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/sign.css';

const SignIn = () => {
  const { setData, setToken } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dataResponse, setDataResponse] = useState([]);

  const signInPostData = async (values) => {
    try {
      setLoading(true);
      const response = await fetch('https://belaundry-api.sebaris.link/platform/user/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const data = await response.json();   
      setDataResponse(data.response);
      setToken(data.response);
      localStorage.setItem('authToken', data.response);
      if (data.status === true) {
        await userInfo(data);
        message.success(data.message).then(() => {
          navigate('/home');
        });
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const userInfo = async (data) => {
    try {
      const response = await fetch('https://belaundry-api.sebaris.link/platform/user/info', {
        headers: {
          'Content-Type': 'application/json',
          'token': data.response,
          'Cache-Control': 'no-cache',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result.response.name);
    } catch (error) {
      message.error('Error data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    signInPostData(values)
    // userInfo();
  };

  return (
    <div className="sign-in-container">
      <Card title="Sign In" className="sign-in-card">
        <Form
          name="sign_in"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
          className="sign-in-form"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="email"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="sign-in-button"
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
