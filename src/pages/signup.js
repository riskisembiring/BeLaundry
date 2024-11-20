import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import '../styles/signup.css';

const { Text } = Typography;

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const signUpPostData = async (values) => {
    try {
      setLoading(true);
      const response = await fetch('https://belaundry-api.sebaris.link/platform/user/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
        }),
      });
      const data = await response.json();
      if (data.status === true) {
        message.success(data.message);
      }
      else {
        message.error(data.message);
      }      
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-container">
      <Card title="Sign Up" className="sign-up-card">
        <Form
          name="sign_up"
          onFinish={signUpPostData}
          layout="vertical"
        >
        <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Name"
              autoComplete="name"
              className="sign-up-input"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Please input your number phone!' }]}
          >
            <Input
              prefix={<PhoneOutlined/>}
              placeholder="Phone"
              autoComplete="phone"
              className="sign-up-input"
            />
          </Form.Item>
          
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              autoComplete="email"
              className="sign-up-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              autoComplete="new-password"
              className="sign-up-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="sign-up-button"
            >
              Sign Up
            </Button>
          </Form.Item>

          <Form.Item>
            <Text type="secondary" className="sign-up-text">
              Sudah punya akun? <a href="/sign">Masuk di sini</a>
            </Text>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
