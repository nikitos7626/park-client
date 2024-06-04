import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";

const App = observer(() => {
  const { user, setUser, setIsAuth } = useContext(Context);

  useEffect(() => {
    if (!user.isAuth) {
      check()
        .then((data) => {
          setUser(data);
          setIsAuth(true);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            // Токен недействителен, выходим из аккаунта
            setUser({ isAuth: false, user: {} });
            setIsAuth(false);
          } else {
            console.error(error);
          }
        });
    }
  }, [user, user.isAuth, setUser, setIsAuth]);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
