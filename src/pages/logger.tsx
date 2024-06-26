import React, { useEffect, useState } from 'react'
import Loading from '../components/loading'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Countdown from '../components/countdown'
import { Clock } from 'lucide-react'
import Log from '../components/log'
import { getRoutineById, getSession, endWorkout as endWorkoutApi } from '../api'
import { PopulatedSession } from '../types'
import { useDispatch } from 'react-redux'
import { clearLogs, initializeSession, logSelector } from '../lib/store/logging-slice'
import LogTable from '../components/log-table'


const Logger: React.FC = () => {

    const dispatch = useDispatch()

    const { logs } = logSelector()

    const [loading, setLoading] = useState<boolean>(true)
    const [countdown, setCountdown] = useState<number>(3)

    const navigate = useNavigate()
    const [session, setSession] = useState<PopulatedSession | null>(null)
    const [searchParams] = useSearchParams()
    const [workoutDuration, setWorkoutDuration] = useState({ hours: 0, mins: 0, sec: 0 })

    useEffect(() => {

        (async () => {
            const rid = searchParams.get("rid")
            const sid = searchParams.get("sid")

            if (!sid || !rid) {
                toast.error("Invalid routine info")
                return navigate("/")
            }

            const session = await getSession(sid)
            if (!session) {
                toast.error("Invalid URL")
                return navigate("/")
            }

            if (session.endTime) {
                toast.error("The workout has already ended")
                return navigate("/")
            }

            const routine: any = await getRoutineById(rid)

            if (!routine) {
                toast.error("Invalid URL")
                return navigate("/")
            }

            const populatedSession: PopulatedSession | any = { ...session, routineId: routine }
            setSession(populatedSession)
            dispatch(initializeSession({ sessionId: sid }))
            setLoading(false)
        })()

        return () => {
            // 1. confirm from user is he wants to end before unmounting
            // 2. send the end time of the workout
        }
    }, [])

    useEffect(() => {
        if (session) {
            const updateTimer: NodeJS.Timeout = setInterval(() => {
                const hours = Math.floor((Date.now() - session.startTime) / (1000 * 60 * 60))
                const mins = Math.floor(((Date.now() - session.startTime) % (1000 * 60 * 60)) / (1000 * 60))
                const sec = Math.floor(((Date.now() - session.startTime) % (1000 * 60)) / (1000))

                setWorkoutDuration({ hours, mins, sec })
            }, 1000)

            return () => clearInterval(updateTimer)
        }

    }, [session])


    async function endWorkout() {
        // 1. confirm from user is he wants to end before unmounting
        // 2. send the end time of the workout

        const confirm = window.confirm("Do you want to end this workout?")
        if (!confirm) return

        if (!logs) return

        try {
            await endWorkoutApi(searchParams.get("sid") || "", logs, Date.now())
            dispatch(clearLogs())
            toast.success("That was a superb workout!")
            return navigate("/", { replace: true })

        } catch (error) {
            console.log(error);
            return toast.error("Your workout could not be saved :(")
        }

    }

    if (loading) return <Loading />

    if (countdown != 0) return <Countdown countdown={countdown} setCountdown={setCountdown} />

    if (!session) return <Loading />

    return (
        <div className='w-full min-h-screen bg-black py-4 px-2'>
            <div className="flex-center flex-col">
                <div className="w-10 h-10 p-1 flex-center bg-lime-200 rounded-full">
                    <img
                        className='w-full h-full'
                        src={"/images/workouts/" + session?.routineId.icon}
                        alt="icon" />
                </div>
                <span className='capitalize text-gray-100 mt-2'>{session?.routineId.title}</span>
            </div>

            <div className='flex-center mt-12'>
                <Clock className='text-lime-100 w-12' />
                <span className="text-5xl text-lime-300">{String(Math.floor(workoutDuration.hours)).padStart(2, "0")}</span>
                <span className="text-5xl text-lime-300">:</span>
                <span className="text-5xl text-lime-300">{String(Math.floor(workoutDuration.mins)).padStart(2, "0")}</span>
                <span className="text-5xl text-lime-300">:</span>
                <span className="text-5xl text-lime-300">{String(Math.floor(workoutDuration.sec)).padStart(2, "0")}</span>
            </div>

            <button
                onClick={endWorkout}
                className='bg-red-500 hover:bg-red-600 text-white w-64 py-2 block mx-auto mt-4 rounded-md'>End workout</button>

            <div className="mt-12">
                {
                    session.routineId.exercises.map((ex, i) => {
                        return (
                            <div key={i} className='mb-4'>
                                <h1 className='capitlize text-gray-100 capitalize'>
                                    <span className="text-lime-300 mr-2">{i + 1}.</span>
                                    {ex.exercise}
                                </h1>

                                {/* log table */}
                                <div className='my-2'>
                                    <LogTable exercise={ex.exercise} />
                                </div>

                                <Log
                                    sid={searchParams.get("sid") || ""}
                                    exercise={ex.exercise} />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Logger