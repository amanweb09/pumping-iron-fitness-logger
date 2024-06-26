import React from "react"
import { Navigate } from "react-router-dom"
import { authSelector } from "../lib/store/auth-slice"

interface PropTypes {
    children: React.ReactNode 
}

export const ProtectedRoute: React.FC<PropTypes> = ({ children }) => {
    const { isAuth } = authSelector()

    if (isAuth) {
        return <>{children}</>
    }
    return <Navigate to={"/auth"} />
}

export const UnprotectedRoute: React.FC<PropTypes> = ({ children }) => {
    const { isAuth } = authSelector()

    if (!isAuth) {
        return <>{children}</>
    }
    return <Navigate to={"/"} />
}

