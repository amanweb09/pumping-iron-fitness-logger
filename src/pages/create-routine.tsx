import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { authSelector } from '../lib/store/auth-slice'
import { workouts } from '../assets/workouts'
import { toast } from 'react-toastify'
import { Routine } from '../types'
import { createRoutine } from '../api'
import { useNavigate } from 'react-router-dom'

const CreateRoutine: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [workoutIcon, setWorkoutIcon] = useState<string>("")

    const { user } = authSelector()

    const navigate = useNavigate()

    function backHome(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()

        navigate("/")
    }

    async function createWorkout(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()

        if (!user) return

        if (!title || !workoutIcon) {
            return toast.error("Title/icon is mandatory")
        }

        const routine: Routine = {
            userId: user.uid,
            title,
            icon: workoutIcon,
            exercises: [],
            workoutSessions: []
        }

        setLoading(true)

        try {
            await createRoutine(routine)
            toast.success("New workout routine added!")

        } catch (error) {
            console.log(error);
            toast.error("Couldn't create a routine")
        }

        return navigate("/")
    }

    return (
        <div className='w-full h-screen bg-black flex-center absolute top-0 bottom-0 left-0 right-0'>
            <div className="rounded-lg bg-neutral-950 text-gray-100 py-6 px-4 shadow-xl">
                <h1 className="text-center font-bold">Create a Routine</h1>

                <form action="#" className='mt-10'>
                    {/* icon selection */}
                    {
                        workoutIcon != ""
                            ?
                            <div className='w-10 h-10 flex-center rounded-full bg-lime-200 block mx-auto p-1'>
                                <img
                                    src={"/images/workouts/" + workoutIcon}
                                    alt="workout icon"
                                    className='' />
                            </div>
                            :
                            <div
                                className='flex-center cursor-pointer rounded-full mx-auto w-10 h-10 border border-solid border-gray-200'>
                                <Plus className='text-gray-200 w-6' />
                            </div>
                    }
                    <span className='block mt-1 w-max text-gray-200 text-sm mx-auto'>Choose an icon</span>

                    <div className='w-64 h-10 bg-neutral-100 rounded-md block mx-auto mt-2 py-1 px-2 overflow-x-scroll overflow-y-hidden'>
                        {
                            workouts.map((w, index) => {
                                return <div
                                    onClick={() => setWorkoutIcon(w)}
                                    key={index}
                                    className='w-8 h-8 inline-block mr-2 p-1 cursor-pointer hover:bg-lime-100'>
                                    <img className='w-full h-full'
                                        src={"/images/workouts/" + w}
                                        alt="workout image" />
                                </div>
                            })
                        }
                    </div>

                    <div className='mt-4'>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='mt-4 text-center px-2 py-1 w-80 border-b-2 border-b-solid border-white bg-transparent'
                            type="text"
                            placeholder='Something like chest or back...' />
                    </div>

                    {
                        loading ?
                            <button disabled className="w-80 h-10 mt-10 rounded-md bg-lime-800 flex-center">
                                <div className="w-6 h-6 rounded-full border-2 border-solid border-lime-800 border-t-white spin"></div>
                            </button>
                            :
                            <button
                                onClick={createWorkout}
                                className="w-80 bg-white text-black mt-10 h-10 rounded-md hover:bg-lime-200">
                                Create Routine
                            </button>
                    }

                    <button
                        onClick={backHome}
                        className="w-80 text-red-500 block mt-2 h-10 rounded-md">Cancel</button>

                </form>
            </div>
        </div>
    )
}

export default CreateRoutine