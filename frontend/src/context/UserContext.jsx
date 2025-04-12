import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext(null);

const UserContextProvider = (props) => {

    const url = "http://localhost:5000"
    const [token, setToken] = useState(localStorage.getItem("token") || "");



    const contextValue = {
        token,
        url,
        setToken,
    }

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;