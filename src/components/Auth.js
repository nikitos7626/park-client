import React, { useContext, useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { registration, login } from '../http/userAPI';
import { useNavigate } from 'react-router-dom';
import { Attractions_route } from '../utils/consts';
import { Context } from '../index';

const Authform = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mode, setMode] = useState('login');

  const click = async () => {
    let data;
    try {
      if (mode === 'login') {
        data = await login(email, password);
        console.log("login")
      } else if (mode === 'register') {
        console.log("register")
        // Проверка паролей при регистрации
        if (password !== confirmPassword) {
          message.error('Пароли не совпадают!');
          return;
        }
        // Проверка наличия символа "@" в почте
        if (!email.includes('@')) {
          message.error('Некорректный адрес электронной почты!');
          return;
        }
        data = await registration(email, password);
      } else {
        // Обработка некорректного режима (например, вывести ошибку)
        console.error('Некорректный режим формы');
        return;
      }


      user.setUser(data); 

      // Проверка роли пользователя после входа
      if (data.role === 'Banned') {
        message.error('Ваш аккаунт временно заблокирован из-за нарушения правил нашего заведения. Для решения вашей проблемы просим позвонить на номер +79616926522');
        return;
      }

      user.setIsAuth(true); 
      navigate(Attractions_route)

    } catch (error) {
      message.error(error.response.data.message);
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
              message: 'Введите почту!',
            },
            {
              type: 'email',
              message: 'Пожалуйста введите корректную почту!',
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
              message: 'Введите пароль!',
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
                message: 'Подтвердите свой пароль!',
              },
            ]}
          >
            <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> 
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