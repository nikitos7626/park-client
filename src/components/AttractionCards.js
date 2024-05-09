import React from 'react';
import { Avatar, Card } from 'antd';
import laserTagImage from '../Images/laser-tag.jpeg';
import rollerCoasterImage from '../Images/Fast&furios.jpeg';
import ferrisWheelImage from '../Images/laser-tag.jpeg';
import bumperCarsImage from '../Images/Fast&furios.jpeg';

const { Meta } = Card;

const AttractionCard = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    <Card
      style={{ width: 300, margin: '16px' }}
      cover={<img alt="Лазертаг" src={laserTagImage} />}
    >
      <Meta
        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
        title="Лазертаг"
        description="Цена: 500 руб. | Режим работы: 10:00 - 22:00"
      />
    </Card>
    <Card
      style={{ width: 300, margin: '16px' }}
      cover={<img alt="Американские горки" src={rollerCoasterImage} />}
    >
      <Meta
        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=9" />}
        title="Американские горки"
        description="Цена: 700 руб. | Режим работы: 11:00 - 21:00"
      />
    </Card>
    <Card
      style={{ width: 300, margin: '16px' }}
      cover={<img alt="Колесо обозрения" src={ferrisWheelImage} />}
    >
      <Meta
        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=10" />}
        title="Колесо обозрения"
        description="Цена: 400 руб. | Режим работы: 12:00 - 20:00"
      />
    </Card>
    <Card
      style={{ width: 300, margin: '16px' }}
      cover={<img alt="Автомобильчики" src={bumperCarsImage} />}
    >
      <Meta
        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=11" />}
        title="Автомобильчики"
        description="Цена: 300 руб. | Режим работы: 10:00 - 19:00"
      />
    </Card>
  </div>
);

export default AttractionCard;
