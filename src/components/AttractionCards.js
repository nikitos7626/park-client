import React from 'react';
import { Card, Button, Form, Input } from 'antd';
import { Row, Col } from 'antd'; // Импортируем Row и Col для компоновки

const AttractionCard = ({ attraction }) => {
  // ... (ваш код для обработки времени работы) ...

  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={4}> {/* Используем Col для создания колонок */}
      <Card
        hoverable
        style={{
          width: '100%', // Занимаем всю ширину колонки
          marginBottom: 16, // Добавляем отступ снизу
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
        <Form layout="vertical" style={{ width: '100%' }}> {/* Форма внутри карточки */}
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Купить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
};


export default AttractionCard;