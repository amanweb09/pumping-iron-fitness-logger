import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { Pencil } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
// import workouts from "../constants/workouts.json"
// import { SanityRoutine } from '../types'
import Error from '../components/error'
import { createSession, getRoutineById, getSessionsByRoutine } from '../api'
import { toast } from 'react-toastify'
import Loading from '../components/loading'
import { SanityDocument } from '@sanity/client'
import { Exercise, SanitySession, Session } from '../types'
import AddExercises from '../components/add-exercises'
import { authSelector } from '../lib/store/auth-slice'
import moment from 'moment'

const Routine: React.FC = () => {

    const { routineId } = useParams()
    const { user } = authSelector()

    const [loading, setLoading] = useState<boolean>(true)
    const [routine, setRoutine] = useState<SanityDocument<Record<string, any>> | undefined | null>(null)
    const [sessions, setSessions] = useState([])
    const [openAddExercise, setOpenAddExercise] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        // fetch workout by routineId

        (async () => {
            if (!routineId) {
                toast.error("Invalid URL")
                return setLoading(false)
            }

            try {
                const res = await getRoutineById(routineId)
                if (res) {
                    const ses = await getSessionsByRoutine({ routineId: res._id })
                    setSessions(ses)
                    setRoutine(res)
                }
                return setLoading(false)

            } catch (error) {
                console.log(error);
                toast.error("Couldn't get the routine!")
                return navigate("/")
            }

        })()


    }, [])

    async function navigateToLogger() {
        // create a workout session in db
        if (!routine?.exercises.length) {
            return toast.error("Add at least one exercise to begin")
        }

        // create a session
        if (!user) {
            toast.error("Please login to continue!")
            return navigate("/auth")
        }

        const session: Session = {
            userId: user.uid,
            routineId: routineId || "",
            startTime: Date.now(),
            logs: []
        }

        try {
            const { _id } = await createSession(session)
            return navigate("/logger?sid=" + _id + "&rid=" + routineId)

        } catch (error) {
            console.log(error);
            toast.error("Please try again")

        }
    }

    if (loading) return <Loading />

    if (!routine) {
        return (
            <Error code='404' redirectHref='/' message='Routine not found!' />
        )
    }

    if (openAddExercise) return <AddExercises
        routineId={routineId || ""}
        setOpenAddExercise={setOpenAddExercise}
        title={routine.title} />

    return (
        <div className='w-full min-h-screen bg-black p-2'>
            <Navbar />

            {/* routine info */}
            <div className='w-full mt-10 flex-center flex-col bg-neutral-900 py-4 px-2 rounded-md'>
                <div className='flex-center flex-col'>
                    <div className='p-1 rounded-full w-16 h-16 bg-lime-100 flex-center'>
                        <img
                            src={"/images/workouts/" + routine?.icon}
                            alt="workout"
                        />
                    </div>
                    <span className='text-gray-100 text-xl mt-2 capitalize'>{routine?.title}</span>
                </div>

                <div className='w-full mt-6'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-gray-100 font-bold text-xl'>Your Exercises</h1>
                        <div
                            className='flex-center w-max h-max cursor-pointer'
                            onClick={() => setOpenAddExercise(true)}>
                            <Pencil className='w-4 mr-1 text-lime-300' />
                            <span className='text-lime-300'>add/edit</span>
                        </div>
                    </div>

                    {/* exercises */}
                    <div className='mt-4'>
                        {
                            routine.exercises.length > 0 && routine.exercises.map((exer: Exercise, i: number) => {
                                return (
                                    <div key={i} className='mb-2'>
                                        <span className='text-lime-300 mr-2'>{i + 1}.</span>
                                        <span className='text-gray-100 capitalize'>{exer.exercise}</span>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <button
                        onClick={navigateToLogger}
                        className='w-full rounded-md text-lime-300 hover:text-black hover:bg-lime-300 transition-all border-2 border-solid border-lime-300 mt-4 py-2'>
                        Start Logging
                    </button>
                </div>
            </div>

            {/* your exercises */}
            <div className='mt-10'>
                <h1 className="text-gray-100 font-bold text-xl">Recent Sessions</h1>
                {
                    sessions.length > 0
                    &&
                    sessions.map((s:SanitySession) => {
                        return (
                            <div key={s._id} className='bg-neutral-900 rounded-md py-4 px-2 mt-4'>
                                <div className="flex items-center justify-end">
                                    <span className='text-lime-300'>{moment(s.startTime).format("Do MMMM YYYY")}</span>
                                </div>

                                <div className='mt-4 grid grid-cols-4 text-gray-100'>
                                    <div className="pr-2 text-gray-300">Exercise</div>
                                    <div className="text-gray-300">Weight (kg)</div>
                                    <div className="text-gray-300">Reps</div>
                                    <div className="text-gray-300">Notes</div>
                                </div>
                                <div>
                                    {
                                        s.logs &&
                                        s.logs.length > 0
                                        &&
                                        s.logs.map((l) => {
                                            return l.logs.map((lo, i) => {
                                                return <div key={i} className='mt-4 grid grid-cols-4 text-gray-100 mb-2'>
                                                    <div className="pr-2 capitalize">{l.exercise}</div>
                                                    <div className="">{lo.weight}</div>
                                                    <div className="">{lo.reps}</div>
                                                    <div className="text-sm">{lo.notes}</div>
                                                </div>
                                            })
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Routine