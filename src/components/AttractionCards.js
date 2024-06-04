import React, { useContext } from 'react';
import { Card, Button, Form, message } from 'antd';
import { Col } from 'antd';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const AttractionCard = observer(({ attraction }) => {
  const { ticket, user } = useContext(Context); // Получаем ticketStore и userStore из Context

  const handleBuyClick = async () => {
    try {
      if (!user.isAuth) {
        message.error('Авторизуйтесь, чтобы купить билет');
        return; // Прекращаем выполнение функции, если пользователь не авторизован
      }

      console.log('AttractionCard: Отправка запроса на покупку билета...');
      console.log('AttractionCard: name_attraction:', attraction.name);
      await ticket.buyTicket(attraction.name);
      message.success('Билет успешно куплен!'); // Выводим сообщение об успешной покупке
    } catch (error) {
      if (error.response.status === 403) {
        message.error('Недостаточно средств'); // Выводим сообщение о недостаточности средств
      } else {
        message.error('Ошибка при покупке билета'); // Выводим сообщение об ошибке
        console.error('Ошибка при покупке билета:', error);
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