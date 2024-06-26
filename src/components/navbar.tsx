import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../lib/firebase/firebase.config'
import { useDispatch } from 'react-redux'
import { authSelector, setAuth } from '../lib/store/auth-slice'
import { toast } from 'react-toastify'
import { Dumbbell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navbar: React.FC = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { user } = authSelector()

    function signoutUser() {
        signOut(auth)
            .then(() => {
                dispatch(setAuth({
                    isAuth: false,
                    user: null
                }))
                toast.success("You've been signed out!")
            }).catch(() => {
                toast.error("Couldn't signout :(")
            })
    }


    return (
        <div className="w-full flex-center flex-col text-gray-100 text-sm bg-black">
            <div className="w-full flex items-center justify-between pt-4">
                <div
                    onClick={() => navigate("/")}
                    className="flex-center flex-col w-max cursor-pointer">
                    <Dumbbell />
                    <h1>Pumping Iron</h1>
                </div>
                <img
                    title="Sign Out"
                    onClick={signoutUser}
                    className="w-8 cursor-pointer rounded-full mr-2"
                    src={user?.avatar}
                    alt="avatar" />

            </div>
        </div>
    )
}

export default Navbar