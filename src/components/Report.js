import React, { useState, useEffect, useContext } from 'react';
import { Card, Statistic, Select, Row, Col } from 'antd';
import { Context } from "../index";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const Report = () => {
  const { ticket } = useContext(Context);
  const [overallAttendance, setOverallAttendance] = useState(null);
  const [weeklyAttendanceByDay, setWeeklyAttendanceByDay] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [pieChartData, setPieChartData] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 

      try {
        const overallAttendanceData = await ticket.fetchOverallAttendance();
        setOverallAttendance(overallAttendanceData.overallAttendance); 
        setPieChartData(overallAttendanceData.pieChartData); // Изменено на pieChartData

        const weeklyAttendanceByDayData = await ticket.fetchWeeklyAttendanceByDay();
        setWeeklyAttendanceByDay(weeklyAttendanceByDayData);
      } catch (error) {
        console.error('Ошибка получения данных:', error);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  }, [ticket]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
    <Card title="Отчет о посещаемости">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Общая посещаемость">
            {isLoading ? ( 
              <div>Загрузка...</div>
            ) : (
              <>
                <Statistic
                  title="Количество"
                  value={overallAttendance?.toString() || 'Нет данных'} 
                  valueStyle={{ fontSize: '24px', fontWeight: 'bold', color: '#3f51b5' }}
                />
                {pieChartData || pieChartData !== null ? (
                  <PieChart width={300} height={300} data={pieChartData}> {/* Добавлено data={pieChartData} */}
                    <Pie
                      data={pieChartData} 
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {pieChartData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                ) : (
                  <div>Загрузка данных для диаграммы...</div> 
                )}
              </>
            )}
          </Card>
        </Col>
          <Col span={12}>
            <Card title="Еженедельная посещаемость по дням">
              {isLoading ? ( 
                <div>Загрузка...</div>
              ) : (
                <BarChart width={500} height={300} data={weeklyAttendanceByDay}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Tooltip
                    formatter={(value, name, props) => {
                      return `${name}: ${value} посещений`; 
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8"
                    label={({ value }) => value}
                    labelFormatter={(value) => `Количество: ${value}`} 
                  />
                </BarChart>
              )}
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Report;