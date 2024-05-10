import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { registration, login } from '../http/userAPI';

const Authform = ({ mode, onToggle }) => {
  const onFinish = async (values) => {
    const { email, password } = values;

    if (mode === 'register') {
      const response = await registration(email, password);
      console.log(response);
    } else {
      const response = await login(email, password);
      console.log(response);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Form
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Почта"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {mode === 'register' && (
          <Form.Item
            label="Подтвердить пароль"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {mode === 'register' ? 'Зарегистрироваться' : 'Войти'}
          </Button>
          <Button type="link" onClick={onToggle}>
            {mode === 'register' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Authform;