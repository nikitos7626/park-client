import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from ".";
import { check } from "./http/userAPI";

const App = observer(() => {
  const { user,ticket} = useContext(Context);

  useEffect(() => {
    check().then(data => {
      user.setUser(data); 
      user.setIsAuth(true);
    });
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;