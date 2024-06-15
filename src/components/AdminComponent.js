import React, { useState } from 'react';
import { Form, Input, Button, TimePicker, message, Layout, Row, Col, Typography, Modal } from 'antd';
import ticketAPI from '../http/ticketAPI';

const { Header, Content } = Layout;
const { Title } = Typography;

const AdminComponent = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [workingHours, setWorkingHours] = useState([]);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);

  const onFinish = async () => {
    try {
      const [start, end] = workingHours;
      const workingHoursString = `${start.format('HH.mm')}-${end.format('HH.mm')}`;

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

  const handleReport = async () => {
    try {
      // Здесь вы можете добавить логику для получения данных для отчёта
      // Например, вы можете сделать запрос к API для получения данных о продажах билетов
      const reportData = await ticketAPI.getReportData(); // Замените на ваш API-запрос

      // Выводим отчёт в консоль (замените на генерацию файла)
      console.log('Отчёт:', reportData); 

      setIsReportModalVisible(false);
    } catch (error) {
      message.error('Ошибка при генерации отчёта');
      console.error('Ошибка при генерации отчёта:', error);
    }
  };

  const showReportModal = () => {
    setIsReportModalVisible(true);
  };

  const handleCancel = () => {
    setIsReportModalVisible(false);
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: '#fff' }}>
        <Title level={3}>Админ-панель</Title>
      </Header>
      <Content style={{ padding: 20 }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item label="Название аттракциона" name="name" rules={[{ required: true, message: 'Пожалуйста, введите название аттракциона!' }]}>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
              <Form.Item label="Цена" name="price" rules={[{ required: true, message: 'Пожалуйста, введите цену!' }]}>
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </Form.Item>
              <Form.Item label="Время работы" name="workingHours" rules={[{ required: true, message: 'Пожалуйста, выберите время работы!' }]}>
                <TimePicker.RangePicker
                  value={workingHours}
                  onChange={(dates) => setWorkingHours(dates)}
                  format="HH:mm"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Добавить
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AdminComponent;