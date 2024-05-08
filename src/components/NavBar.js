import React, { useContext } from "react";
import { Context } from "../index";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Admin_Route, AddAttraction_route, MainMenu_Route, login_route, Registration_Route, Attractions_route } from "../utils/consts";

const NavBar = () => {
  const { user } = useContext(Context);

  return (
    <nav className="nav-bar-container">
      <NavLink to={MainMenu_Route} className="nav-brand-link">
        Запредельное веселье
      </NavLink>
      <ul className="nav-menu">
        <li className="nav-menu-item">
          <NavLink to={Attractions_route} className="nav-menu-link">
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
            <li className="nav-menu-item">
              <NavLink to={Registration_Route} className="nav-menu-link">
                Регистрация
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
