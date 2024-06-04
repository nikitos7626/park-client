import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const UsersAdmin = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState([]); // Массив для хранения пользователей

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    // Здесь будет логика добавления нового пользователя (без бэкэнда)
    message.success('Пользователь добавлен!');
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => {
            // Здесь будет логика редактирования пользователя (без бэкэнда)
            message.success('Пользователь изменен!');
          }}>Изменить</Button>
          <Button type="danger" onClick={() => {
            // Здесь будет логика удаления пользователя (без бэкэнда)
            message.success('Пользователь удален!');
          }}>Удалить</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1>Управление пользователями</h1>
      <Button type="primary" onClick={showModal}>
        Добавить пользователя
      </Button>
      <Table dataSource={users} columns={columns} pagination={false} />
      <Modal title="Добавить пользователя" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical">
          <Form.Item label="Имя" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Роль" name="role">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersAdmin;