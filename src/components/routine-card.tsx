import React from "react"
// import { Workout } from "../types"
import { useNavigate } from "react-router-dom"
import { SanityRoutine } from "../types"

interface PropTypes {
  routine: SanityRoutine
}

const RoutineCard: React.FC<PropTypes> = ({ routine }) => {

  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate("/routine/" + routine._id)}
      className='p-2 capitalize inline-block hover:bg-lime-200 hover:text-black ease-in transition-all rounded-full bg-gray-800 text-gray-200 w-max font-bold mr-2 cursor-pointer'>
      <div className="flex-center">
        {
          routine.icon != ""
          &&
          <div className="w-6 h-6 mr-2 inline-block rounded-full bg-lime-200 p-1">
            <img
              src={"/images/workouts/" + routine.icon}
              alt="icon" />
          </div>
        }
        <span className="inline-block">{routine.title}</span>
      </div>

    </div>
  )
}

export default RoutineCard