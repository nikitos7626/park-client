import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Profile = observer(() => {
  const [amount, setAmount] = useState(''); // Состояние для ввода суммы
  const {ticket} = useContext(Context)
  useEffect(() => {
    // Получить баланс пользователя при монтировании компонента
    console.log(ticket.balance); // Выводим баланс в консоль
  }, [ticket.balance]); // Добавляем зависимость

  const handleAddBalance = async () => {
    try {
      await ticket.addBalance(amount); // Вызываем метод addBalance
      setAmount(''); // Очищаем поле ввода
    } catch (error) {
      console.error(error);
      // Обработать ошибку (например, вывести сообщение пользователю)
    }
  };

  return (
    <div>
      {/* Отобразить баланс пользователя */}
      <p>Ваш баланс: {ticket.balance}</p>

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