import React, { useState } from 'react';
import { Form, Input, Button, TimePicker, message } from 'antd';
import ticketAPI from '../http/ticketAPI';

const AdminComponent = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [workingHours, setWorkingHours] = useState([]);

  const onFinish = async () => {
    try {
      const [start, end] = workingHours;
      const workingHoursString = `${start.format('HH:mm')}-${end.format('HH:mm')}`;
      console.log(workingHoursString);   

      await ticketAPI.addTicket(name, price, workingHoursString);
      message.success('Аттракцион успешно добавлен');
      setName('');
      setPrice(0);
      setWorkingHours([]);
    } catch (error) {
      message.error('Ошибка при добавлении аттракциона');
      console.error('Ошибка при добавлении аттракциона:', error);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Название аттракциона"
        name="name"
        rules={[{ required: true, message: 'Пожалуйста, введите название аттракциона' }]}
      >
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Цена"
        name="price"
        rules={[{ required: true, message: 'Пожалуйста, введите цену аттракциона' }]}
      >
        <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Рабочие часы"
        name="workingHours"
        rules={[{ required: true, message: 'Пожалуйста, введите рабочие часы аттракциона' }]}
      >
        <TimePicker.RangePicker
          format="HH:mm"
          value={workingHours.length > 0 ? workingHours : null}
          onChange={(times) => setWorkingHours(times)}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить аттракцион
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminComponent;