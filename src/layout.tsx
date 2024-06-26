import { onAuthStateChanged } from "firebase/auth"
import React, { useEffect, useState } from "react"
import { auth } from "./lib/firebase/firebase.config"
import { useDispatch } from "react-redux"
import { setAuth } from "./lib/store/auth-slice"
import SplashScreen from "./pages/splash-screen"

interface PropTypes {
    children: React.ReactNode
}

const Layout: React.FC<PropTypes> = ({ children }) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            if (!u) return setLoading(false)

            dispatch(setAuth({
                isAuth: true,
                user: {
                    uid: u.uid,
                    name: u.displayName || "",
                    email: u.email || "",
                    avatar: u.photoURL || ""
                }
            }))
            return setLoading(false)

        })
    })

    if (loading) return <SplashScreen />

    // check if it's a phone or not


    return (
        <ScreenSizeChecker>
            {children}
        </ScreenSizeChecker>
    )
}

const ScreenSizeChecker: React.FC<PropTypes> = ({ children }) => {
    if (window.innerWidth < 768) return children

    return <div className="w-full h-screen flex-center bg-black text-gray-100">
        <span>The app works only in portrait orientation</span>
    </div>
}

export default Layout