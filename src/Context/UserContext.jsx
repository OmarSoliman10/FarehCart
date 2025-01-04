import { createContext, useEffect, useState } from "react";


export let UserContext = createContext(0); 

export function UserContextProvider(props){
const [userLogin, setUserLogin] = useState(null); 
console.log(userLogin);

useEffect(() => {
    let token = localStorage.getItem("userToken");
    if(token !== null){
        setUserLogin(token)
    }

}, [])


    return <UserContext.Provider value={{userLogin, setUserLogin}}>
            {props.children}   {/* = app */}
    </UserContext.Provider>
}


