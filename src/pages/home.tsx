import RoutineCard from "../components/routine-card"
import { authSelector } from "../lib/store/auth-slice"
// import workouts from "../constants/workouts.json"
import { Plus } from 'lucide-react'
import { useEffect, useState } from "react"
import WorkoutStatsCard from "../components/workout-stats-card"
import Navbar from "../components/navbar"
import { getAllRoutines, getFirstNSessions } from "../api"
import { toast } from "react-toastify"
import Loading from "../components/loading"
import { SanityRoutine, SanitySession } from "../types"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const [loading, setLoading] = useState(true)
  const [routines, setRoutines] = useState([])
  const [sessions, setSessions] = useState([])

  const { user } = authSelector()

  const navigate = useNavigate()

  useEffect(() => {

    (
      async () => {
        if (!user) return

        try {
          const res = await getAllRoutines({ userId: user.uid })
          const ses = await getFirstNSessions({ userId: user.uid, n:2 })
          setSessions(ses)
          setRoutines(res)

        } catch (error) {
          console.log(error);
          toast.error("Internal server error")
        } finally {
          setLoading(false)
        }
      }
    )()

  }, [])

  if (loading) return <Loading />

  return (
    <div className="bg-black w-full min-h-screen p-2">

      {/* navigation */}
      <Navbar />

      {/* workouts */}
      <div className="mt-10">
        <h1 className="text-white mb-1 font-bold text-lg">
          Hi
          <span className="text-lime-200"> {user?.name.split(" ")[0]}</span>,
        </h1>
        <h4 className="text-gray-200">What are we doing today??</h4>

        <div className="whitespace-nowrap w-full overflow-x-auto mt-4">
          <div
            onClick={() => navigate("/create-routine")}
            className="w-max text-white inline-block p-2 mr-2 rounded-full border border-solid border-gray-400 hover:bg-lime-200 hover:text-black ease-in cursor-pointer text-white-200">
            <div className="flex-center">
              <Plus color="#fff" className="inline-block" />
              <span>Create routine</span>
            </div>
          </div>
          {
            routines.length && routines.reverse().map((r: SanityRoutine) => {
              return <RoutineCard
                key={r._id}
                routine={r} />
            })
          }

        </div>
      </div>

      {/* last workout */}
      <div className="mt-12">
        <h1 className="text-xl font-bold text-gray-100">Your Recent Workouts</h1>
        <div className="mt-4">
          <div className="grid grid-cols-2 space-x-2">
            {
              sessions.length > 0
              &&
              sessions.map((s: SanitySession) => {
                const rs: any = routines.find((r: SanityRoutine) => r._id == s.routineId)
                
                return <WorkoutStatsCard
                  key={s._id}
                  rid={rs._id}
                  icon={rs?.icon || ""}
                  title={rs?.title || ""}
                  startTime={s.startTime}
                  endTime={s.endTime || 0} />
              })
            }
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 right-0 bg-black w-full py-2 flex-center text-gray-500 font-semibold">
        <span className="mr-1">Made proudly in</span>
        <img src="/images/india.png" alt="india" className="w-6" />
        <span className="mx-2">|</span>
        <span className=""> &copy; all rights reserved</span>
      </footer>

    </div>
  )
}

export default Home