import { useEffect, useState } from "react";
import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken ]= useState(localStorage.getItem('userToken'));
const [userName,setUserName]=useState(null);
const getUserDate=()=>{
  if(userToken!=null){
    console.log(userToken);
    const decoded = jwtDecode(userToken);
    console.log(decoded);
    setUserName(decoded.userName);

  }
}
  useEffect(() => {
    getUserDate();
  }, [userToken]);
  return (
    <UserContext.Provider  value={{setUserToken,userName,setUserName}}>
        {children}
        </UserContext.Provider>
  );
};
export default UserContextProvider;
