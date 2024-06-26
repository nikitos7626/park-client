import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Space, Table, Tag, Row, Col, ConfigProvider, Button, Input, message } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import styled from 'styled-components';
import './profile.css';


const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const Profile = observer(() => {
  const [amount, setAmount] = useState(''); // Состояние для ввода суммы
  const [showCardForm, setShowCardForm] = useState(false); // Состояние для отображения формы ввода карты
  const { ticket, user } = useContext(Context);

  useEffect(() => {
    console.log(ticket.balance); // Выводим баланс в консоль
    ticket.fetchTickets(); // Загружаем билеты пользователя
    ticket.fetchBalance();
  }, [ticket, ticket.balance]);

  const handleCancelTicket = async (record) => {
    try {
      console.log(ticket.price);
      console.log(user.balance);
      await ticket.cancelTicket(record.name); // Вызываем метод cancelTicket
      message.success('Билет успешно отменен!');
      ticket.fetchTickets(); // Обновляем список билетов
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Ошибка при отмене билета');
      }
    }
  };

  const handleUseTicket = async (record) => {
    try {
      const response = await ticket.useTicket(record.name);

      if (response.status === 200) {
        // Обработка успешного ответа
        message.success('Билет успешно использован!');
        ticket.fetchTickets(); // Обновляем список билетов
      } else {
        // Обработка ошибок
        if (response.status === 404) {
          message.error('Билет уже использован');
        } else {
          message.error('Ошибка при использовании билета');
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.success('Билет успешно использован');
      }
    }
  };

  const handleAddBalance = async () => {
    try {
      const response = await ticket.addBalance(amount); // Вызываем метод addBalance

      if (response.status === 200) {
        // Обработка успешного ответа
        message.success('Баланс успешно пополнен!');
        setAmount(''); // Очищаем поле ввода
        ticket.fetchBalance();
      } else {
        message.success('Баланс успешно пополнен!');
      }
    } catch (error) {
      console.error(error);
      message.success('Баланс успешно пополнен!');
    }
  };

  const handleShowCardForm = () => {
    setShowCardForm(true);
  };

  const handleHideCardForm = () => {
    setShowCardForm(false);
  };

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'ACTIVE' ? 'green' : 'volcano';
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => {
        if (record.status === 'USED' || record.status === 'CANCELED') {
          // Если билет использован или отменен, не показываем кнопки
          return null;
        } else {
          return (
            <Space size="middle">
              <Button type="primary" onClick={() => handleUseTicket(record)}>
                Использовать
              </Button>
              <Button type="danger" onClick={() => handleCancelTicket(record)}>
                Отменить
              </Button>
            </Space>
          );
        }
      },
    },
  ];

  return (
    <Wrapper>
      <Row gutter={24}>
        <Col flex="auto">
          {/* Вывод списка билетов */}
          <h3>Ваши билеты:</h3>
          <Table columns={columns} dataSource={ticket.tickets} />
        </Col>
        <Col span={6}>
          {/* Отобразить баланс пользователя */}
          <BalanceWrapper>
            <h3>Ваш баланс:</h3>
            <Balance>{ticket.balance}</Balance>

            {/* Кнопка для показа формы ввода карты */}
            <Button type="primary" onClick={handleShowCardForm}>
              Пополнить баланс
            </Button>

            {/* Форма для ввода данных карты */}
            {showCardForm && (
              <CardForm>
                <Input
                  type="text"
                  placeholder="Номер карты"
                  style={{ marginBottom: 16 }}
                />
                <Input
                  type="text"
                  placeholder="Срок действия"
                  style={{ marginBottom: 16 }}
                />
                <Input
                  type="password"
                  placeholder="CVV"
                  style={{ marginBottom: 16 }}
                />
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Input
                    type="number"
                    placeholder="Сумма пополнения"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                          colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                          colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                          lineWidth: 0,
                        },
                      },
                    }}
                  >
                    <Button type="primary" size="large" onClick={handleAddBalance}>
                      Пополнить
                    </Button>
                  </ConfigProvider>
                </Space>
                <Button type="link" onClick={handleHideCardForm}>
                  Отмена
                </Button>
              </CardForm>
            )}
          </BalanceWrapper>
        </Col>
      </Row>
    </Wrapper>
  );
});

export default Profile;

const Wrapper = styled.div`
  padding: 24px;
`;

const BalanceWrapper = styled.div`
  background-color: #f0f2f5;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Balance = styled.h2`
  margin-top: 8px;
  font-size: 24px;
  font-weight: bold;
`;

const CardForm = styled.div`
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  
   @media (max-width: 768px) {
    width: 100%;
  }
`;