import React, { useState, useEffect, useContext } from 'react';
import { Card, Statistic, Row, Col } from 'antd';
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
        setPieChartData(overallAttendanceData.pieChartData); 

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

  const COLORS = ['#ff0000', '#00C49F', '#00bfff', '#FF8042']; // ACTIVE, USED, CANCELED

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
                
                {pieChartData.length > 0 ? (
                  <PieChart width={300} height={300} data={pieChartData}>
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
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend>
                      <span style={{ color: COLORS[0] }}>Активные</span>
                      <span style={{ color: COLORS[1] }}>Использованные</span>
                      <span style={{ color: COLORS[2] }}>Отмененные</span>
                    </Legend>
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
