import React from 'react';
import { Card, Button, Form } from 'antd';
import {  Col } from 'antd'; 
import { observer } from 'mobx-react-lite'; 
import { useContext } from 'react'; 
import { Context } from '../index'; 


const AttractionCard = observer(({ attraction }) => {
  const { ticket } = useContext(Context); // Получаем ticketStore из Context

  const handleBuyClick = async () => {
    try {
      console.log(localStorage.getItem('token'))
      console.log('AttractionCard: Отправка запроса на покупку билета...');
      console.log('AttractionCard: name_attraction:', attraction.name);
      await ticket.buyTicket(attraction.name);
      console.log('AttractionCard: Билет куплен успешно!');
    } catch (error) {
      console.error('Ошибка при покупке билета:', error);
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