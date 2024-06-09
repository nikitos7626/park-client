import React, { useContext } from 'react';
import { Card, Button, Form, message } from 'antd';
import { Col } from 'antd';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const AttractionCard = observer(({ attraction }) => {
  const {ticket,user } = useContext(Context); 

  const handleBuyClick = async () => {
    try {
      const response = await ticket.buyTicket(attraction.name);

      if (response.status === 200) {
        message.success('Билет успешно куплен!');
        ticket.fetchAttractions(); 
      } else {
        message.error(response.data.message); // Используем сообщение из ответа
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Ошибка при покупке билета');
      }
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
        {user.isAuth && ( // Отображаем кнопку "Купить" только если пользователь авторизован
          <Form layout="vertical" style={{ width: '100%' }}>
            <Form.Item>
              <Button type="primary" block onClick={handleBuyClick}>
                Купить
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </Col>
  );
});

export default AttractionCard;