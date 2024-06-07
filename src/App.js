import React, {} from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";


const App = observer(() => {


  // useEffect(() => {
  //   if (!user.isAuth) {
  //     check()
  //       .then((data) => {
  //         // Update the user state using the setUser method
  //         user.setUser(data); 
  //         user.setIsAuth(true); // Update isAuth state
  //       })
  //       .catch((error) => {
  //         if (error.response && error.response.status === 401) {  //Исправить ошибку после нажатия logout происходит
  //                                                                 автоматический вход в аккаунт с помощью функции check;
  //           user.setUser({}); // Clear user data
  //           user.setIsAuth(false); // Set isAuth to false
  //         } else {
  //           console.error(error);
  //         }
  //       });
  //   }
  // }, [user, user.isAuth]); 

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
