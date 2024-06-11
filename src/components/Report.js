import React, { useState, useEffect, useContext } from 'react';
import { Card, Statistic, Select, Row, Col } from 'antd';
import { Context } from "../index";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const Report = () => {
  const {  ticket } = useContext(Context);
  const [overallAttendance, setOverallAttendance] = useState(null);
  const [weeklyAttendanceByDay, setWeeklyAttendanceByDay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const overallAttendanceData = await ticket.fetchOverallAttendance();
      setOverallAttendance(overallAttendanceData);
      console.log(overallAttendanceData)

      const weeklyAttendanceByDayData = await ticket.fetchWeeklyAttendanceByDay();
      setWeeklyAttendanceByDay(weeklyAttendanceByDayData);
      console.log(weeklyAttendanceByDayData)
    };
    fetchData();
  }, [ticket]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const data = [
    { name: 'Продано', value: overallAttendance || 0 },
    { name: 'Не продано', value: 0 }
  ]; // Define the data array here

  return (
    <div>
      <Card title="Отчет о посещаемости">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="Общая посещаемость">
              <Statistic
                title="Количество"
                value={overallAttendance || 'Нет данных'}
                valueStyle={{ fontSize: '24px', fontWeight: 'bold', color: '#3f51b5' }}
              />
              <PieChart width={300} height={300}>
                <Pie
                  data={data} // Pass the data array as a prop
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {
                    data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
              </PieChart>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Еженедельная посещаемость по дням">
              <BarChart width={500} height={300} data={weeklyAttendanceByDay}>
                <XAxis dataKey="day" />
                <YAxis />
                <CartesianGrid stroke="#f5f5f5" />
                <Tooltip
                  formatter={(value, name, props) => {
                    return `${name}: ${value} посещений`; // Форматируем подсказку
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="#8884d8"
                  label={({ value }) => value}
                  labelFormatter={(value) => `Количество: ${value}`} // Изменяем текст метки
                />
              </BarChart>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Report;