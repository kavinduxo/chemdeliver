import { createContext, useState, useContext } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
    const signout = () => {
        setIsUserLoggedIn(false);
        setProfile(null);
    };

    const login = async (user) => {
        console.log(user);
    }
  
    return (
        <AuthContext.Provider value={{ profile, isUserLoggedIn, signout, login }}>
          {children}
        </AuthContext.Provider>
    );
  };
  const useAuth = () => {
    const { profile, isUserLoggedIn, signout, login } = useContext(AuthContext);
    return { profile, isUserLoggedIn, signout, login };
  };
  
  export { AuthProvider, useAuth };