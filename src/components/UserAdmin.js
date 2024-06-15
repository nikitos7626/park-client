import React, { useState, useContext, useEffect } from 'react';
import { Table, Button, message, Spin, Modal } from 'antd';
import { Context } from '../index';

const UsersAdmin = () => {
  const { user } = useContext(Context);
  const [users, setUsers] = useState(null);
  const [blockMessage, setBlockMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const fetchedUsers = await user.fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        message.error('Ошибка при получении пользователей');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [blockTargetEmail, setBlockTargetEmail] = useState(null);

  const handleBlockUser = async (email) => {
    setBlockTargetEmail(email);
    setIsBlockModalVisible(true);
  };

  const handleConfirmBlock = async () => {
    try {
      await user.banUser(blockTargetEmail); // Используем banUser вместо blockUser
      const updatedUsers = users.map((user) =>
        user.email === blockTargetEmail ? { ...user, role: 'Banned' } : user
      );
      setUsers(updatedUsers);
      setBlockMessage(`Пользователь ${blockTargetEmail} заблокирован!`);
      setTimeout(() => setBlockMessage(null), 3000);
      setIsBlockModalVisible(false);
    } catch (error) {
      console.error('Error blocking user:', error);
      message.error('Ошибка при блокировке пользователя');
    }
  };

  const handleCancelBlock = () => {
    setIsBlockModalVisible(false);
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center', // Центрирование содержимого столбца
    },
    {
      title: 'Баланс',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center',
      render: (balance) => (balance !== null ? balance : 'Не указан'),
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
    },
    {
      title: 'Действия',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <span>
          {record.role === 'Banned' ? (
            <div style={{ color: 'red' }}>Пользователь заблокирован</div>
          ) : (
            <Button type="primary" danger onClick={() => handleBlockUser(record.email)}>
              Заблокировать
            </Button>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Управление пользователями</h1> {/* Центрирование заголовка */}
      {isLoading && <Spin />}
      {blockMessage && <p style={{ color: 'green' }}>{blockMessage}</p>}
      <Table
        dataSource={users}
        columns={columns}
        pagination={false}
        style={{ textAlign: 'center' }}
        title={() => (
          <h2 style={{ color: 'blue' }}>Список пользователей</h2>
        )}
      />

      <Modal
        title="Подтверждение блокировки"
        visible={isBlockModalVisible}
        onOk={handleConfirmBlock}
        onCancel={handleCancelBlock}
      >
        <p>Вы действительно хотите заблокировать пользователя {blockTargetEmail}?</p>
      </Modal>
    </div>
  );
};

export default UsersAdmin;