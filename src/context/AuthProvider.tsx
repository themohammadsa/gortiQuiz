import { useState } from "react";
import { useContext, createContext } from "react"
import { UserType } from "./types/auth.type"

const AuthContext = createContext<UserType>({} as UserType)

export const AuthProvider: React.FC = ({ children }) => {

    const [token, setToken] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <>
            <AuthContext.Provider value={{
                token,
                name,
                email,
                setToken,
                setName,
                setEmail
            }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}