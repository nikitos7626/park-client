import React from 'react';
import { Card, Button, Form, Input } from 'antd';
import { Row, Col } from 'antd'; // Импортируем Row и Col для компоновки
import { observer } from 'mobx-react-lite'; // Импортируем observer
import { useContext } from 'react'; // Импортируем useContext
import { Context } from '../index'; // Импортируем Context

const AttractionCard = observer(({ attraction }) => {
  const { ticket } = useContext(Context); // Получаем ticketStore из Context

  const handleBuyClick = async () => {
    try {
      await ticket.buyTicket(attraction.name); // Вызываем buyTicket с названием из title
      // После успешной покупки можно обновить состояние или выполнить другие действия
    } catch (error) {
      console.error('Ошибка при покупке билета:', error);
      // Обработайте ошибку, например, выведите сообщение пользователю
    }
  };

  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
      <Card
        hoverable
        style={{
          width: '100%',
          marginBottom: 16,
        }}
      >
        <Card.Meta
          title={attraction.name}
          description={
            <>
              <p>Цена: {attraction.price}</p>
              <p>Время работы: {attraction.working_hours}</p>
            </>
          }
        />
        <Form layout="vertical" style={{ width: '100%' }}>
          <Form.Item>
            <Button type="primary" block onClick={handleBuyClick}>
              Купить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
});

export default AttractionCard;