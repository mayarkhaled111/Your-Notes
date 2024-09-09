import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(null);
  useEffect(()=>{
    if(localStorage.getItem('Token'))
        setIsLogin(jwtDecode(localStorage.getItem('Token')))
  },[])
  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
