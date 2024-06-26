import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../lib/firebase/firebase.config";
import { useDispatch } from "react-redux";
import { setAuth } from "../lib/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const Authenticate = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    function handleSignin() {
        signInWithPopup(auth, provider)
            .then((result): void => {

                const user = result.user
                console.log(user);

                dispatch(setAuth({
                    isAuth: true,
                    user: {
                        uid: user.uid,
                        name: user.displayName || "",
                        email: user.email || "",
                        avatar: user.photoURL || ""
                    }
                }))

                toast("Wuhoooo! Signin Successful", {
                    type: "success"
                })
                navigate("/")

            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="w-full h-screen bg-black flex-center flex-col">
            <div className="flex-center flex-col">
                <img
                    className="w-16 mb-2"
                    src="/images/logo.png"
                    alt="Pumping Iron logo" />
                <h1 className="text-white text-xl font-bold">Pumping Iron</h1>
                <h4 className="text-gray-400">Your personal workout logger</h4>
            </div>
            <button
                onClick={handleSignin}
                className="text-white p-2 rounded-md flex-center mt-8 bg-gray-900">
                <img
                    src="/images/google.png"
                    alt="google"
                    className="w-6 mr-2" />
                <span>Continue with Google</span>
            </button>
        </div>
    )
}

export default Authenticate