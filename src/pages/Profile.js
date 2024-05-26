import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Space, Table, Tag, Row, Col, ConfigProvider, Button } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';

const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const Profile = observer(() => {
  const [amount, setAmount] = useState(''); // Состояние для ввода суммы
  const { ticket } = useContext(Context)

  useEffect(() => {
    // Получить баланс пользователя при монтировании компонента
    console.log(ticket.balance); // Выводим баланс в консоль
    ticket.fetchTickets(); // Загружаем билеты пользователя
  }, [ticket.balance, ticket]); // Добавляем зависимости

  const handleAddBalance = async () => {
    try {
      await ticket.addBalance(amount); // Вызываем метод addBalance
      setAmount(''); // Очищаем поле ввода
    } catch (error) {
      console.error(error);
      // Обработать ошибку (например, вывести сообщение пользователю)
    }
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
      render: (_, record) => (
        <Space size="middle">
          <button>Использовать</button>
          <button>Удалить</button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <Col flex="auto">
          {/* Вывод списка билетов */}
          <h3>Ваши билеты:</h3>
          <Table columns={columns} dataSource={ticket.tickets} />
        </Col>
        <Col flex="200px">
          {/* Отобразить баланс пользователя */}
          <div style={{ textAlign: 'right', marginBottom: '16px' }}>
            <h3>Ваш баланс:</h3>
            <p>{ticket.balance}</p>

            {/* Форма для пополнения баланса */}
            <div>
              <label htmlFor="amount">Сумма пополнения:</label>
              <input
                type="number"
                id="amount"
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
                  Пополнить баланс
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
});

export default Profile;
