import React from 'react';
import './Mainmenu.css';
import { YMaps, Map, Placemark,FullscreenControl } from '@pbe/react-yandex-maps';

const MainMenucomponent = () => {
  return (
    <div className="main-menu">
      <div className="menu-content">
        <h1 className="animated-title">Добро пожаловать в наш парк!</h1>
        <p className="animated-text">Здесь вы найдете:</p>
        <ul className="animated-list">
          <li>Аттракционы для всех возрастов</li>
          <li>Кафе и рестораны</li>
          <li>Сувенирные магазины</li>
          <li>И многое другое!</li>
        </ul>
      </div>
      <div className="map-container"> 
        <YMaps>
          <Map 
            defaultState={{ center: [48.728722, 44.544828], zoom: 15,controls: [], }} 
            width="100%"   
          >
            <Placemark defaultGeometry={[48.728722, 44.544828]} />
            <FullscreenControl />
          </Map>
        </YMaps>
      </div>
    </div>
  );
};

export default MainMenucomponent;