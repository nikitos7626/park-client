import React, { useContext } from "react";
import { Context } from "../index";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Admin_Route, AddAttraction_route, MainMenu_Route, login_route, Attractions_route ,Profile_route} from "../utils/consts";
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import ticketStore from "../store/ticketStore";

const NavBar = observer(() => {
  const { user,ticket } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    ticket.logout()
    user.setIsAuth(false);
    user.setUser({});
  };
  
  const handleAttractionsClick = () => {
    ticket.fetchAttractions(); 
    navigate(Attractions_route); // Перейдите на страницу аттракционов
  };

  return (
    <nav className="nav-bar-container">
      <NavLink to={MainMenu_Route} className="nav-brand-link">
        Запредельное веселье
      </NavLink>
      <ul className="nav-menu">
        <li className="nav-menu-item">
          <NavLink to={Attractions_route} className="nav-menu-link"  onClick={handleAttractionsClick}>
            Аттракционы
          </NavLink>
        </li>
        {!user.isAuth && (
          <>
            <li className="nav-menu-item">
              <NavLink to={login_route} className="nav-menu-link">
                Логин
              </NavLink>
            </li>
          </>
        )}
        {user.isAuth && (
          <>
            <li className="nav-menu-item">
              <NavLink to={Admin_Route} className="nav-menu-link">
                Админ-панель
              </NavLink>
            </li>
            <li className="nav-menu-item">
              <NavLink to={AddAttraction_route} className="nav-menu-link">
                Добавить аттракцион
              </NavLink>
            </li>
            <li className="nav-menu-item">
              <NavLink to="/profile" className="nav-menu-link">
                Профиль
              </NavLink>
            </li>
            <li className="nav-menu-item">
              <NavLink to={login_route} className="nav-menu-link" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
});

export default NavBar;