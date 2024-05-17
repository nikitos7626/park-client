import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import TicketStore from '../store/ticketStore';

const Profile = observer(() => {
  const [amount, setAmount] = useState(''); // Состояние для ввода суммы

  const ticketStore = TicketStore;

  useEffect(() => {
    // Получить баланс пользователя при монтировании компонента
    console.log(ticketStore.balance); // Выводим баланс в консоль
  }, [ticketStore.balance]); // Добавляем зависимость

  const handleAddBalance = async () => {
    try {
      await ticketStore.addBalance(amount); // Вызываем метод addBalance
      setAmount(''); // Очищаем поле ввода
    } catch (error) {
      console.error(error);
      // Обработать ошибку (например, вывести сообщение пользователю)
    }
  };

  return (
    <div>
      {/* Отобразить баланс пользователя */}
      <p>Ваш баланс: {ticketStore.balance}</p>

      {/* Форма для пополнения баланса */}
      <div>
        <label htmlFor="amount">Сумма пополнения:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleAddBalance}>Пополнить баланс</button>
      </div>
    </div>
  );
});

export default Profile;