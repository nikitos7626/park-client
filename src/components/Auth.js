import React, { useContext, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { registration, login } from '../http/userAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { Attractions_route, login_route } from '../utils/consts';
import { Context } from '../index';

const Authform = () => {
  const location = useLocation();
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');

  const click = async () => {
    let data;
    try {
      if (mode === 'login') {
        data = await login(email, password);
        console.log("login")
      } else if (mode === 'register') {
        console.log("register")
        data = await registration(email, password);
      } else {
        // Обработка некорректного режима (например, вывести ошибку)
        console.error('Некорректный режим формы');
        return;
      }


      user.setUser(data); // Передаем данные пользователя из ответа сервера

      // Устанавливаем состояние авторизации
      user.setIsAuth(true); // Добавьте метод setIsAuth в UserStore
      navigate(Attractions_route)

    } catch (error) {
      // Обработка ошибок
      console.error(error);
    }
  };

  const onToggle = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
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
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
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
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
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
          <Button type="primary" onClick={click}>
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