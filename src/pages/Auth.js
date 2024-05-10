import React, { useState } from "react";
import Authform from "../components/Auth";
import { registration,login } from "../http/userAPI";
import Password from "antd/es/input/Password";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);


  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  // const click =async() =>{
  //   let data;
  //   if(isLogin)
  //     data= await login(email,password);
  //   }
  //   else
  //   {
  //     data = await registration(email,password)
  //   }
    
  
  // }

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