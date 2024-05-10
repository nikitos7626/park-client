import React from 'react';
import './Mainmenu.css'
import MainmenuImage from '../Images/MainMenuImage.jpg'

const MainMenucomponent = () => {
  return (
    <div className="main-menu">
      <img src={MainmenuImage} alt="Главное меню" className="menu-image" />
    </div>
  );
};

export default MainMenucomponent;