import React, { useState } from "react";
import Authform from "../components/Auth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div>
      {isLogin ? (
        <Authform mode="login" onToggle={toggleForm} />
      ) : (
        <Authform mode="register" onToggle={toggleForm} />
      )}
    </div>
  );
};

export default Auth;
