import React, { useContext, useEffect, useState } from "react";
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import AttractionCard from '../components/AttractionCards';
import { Row, Col } from 'antd'; // Импортируем Row и Col для компоновки

const Attractions = observer(() => {
  const { attractions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await attractions.fetchAttractions();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Список аттракционов</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <div>
          {attractions.Attractions && attractions.Attractions.length > 0 ? (
            <Row gutter={[16, 16]}> {/* Используем Row для создания ряда */}
              {attractions.Attractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))}
            </Row>
          ) : (
            <p>Аттракционы не найдены</p>
          )}
        </div>
      )}
    </div>
  );
});

export default Attractions;