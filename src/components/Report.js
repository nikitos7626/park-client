import React from 'react';
import { Card, Statistic } from 'antd';

const ReportUser = () => {
  return (
    <div>
      <h1>Отчеты</h1>
      <Card title="Продажи">
        {/* Здесь будет отображаться информация о продажах */}
      </Card>
      <Card title="Посещаемость">
        {/* Здесь будет отображаться информация о посещаемости */}
      </Card>
      <Card title="Средняя цена билета">
        {/* Здесь будет отображаться информация о средней цене билета */}
      </Card>
    </div>
  );
};

export default ReportUser;