import React from 'react'
import { ChevronRight, Clock, Calendar } from 'lucide-react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

interface PropTypes {
    icon: string,
    title: string,
    startTime: number,
    endTime: number,
    rid: string
}

const WorkoutStatsCard: React.FC<PropTypes> = ({
    icon, title, startTime, endTime, rid
}) => {
    const navigate = useNavigate()

    // const hours = Math.floor((endTime - startTime) / (1000 * 60 * 60))
    const mins = Math.floor(((endTime - startTime) % (1000 * 60 * 60)) / (1000 * 60))
    
    
    return (
        <div
        onClick={() => navigate("/routine/"+rid)}
         className='bg-neutral-900 p-1 text-gray-100 rounded-md cursor-pointer hover:scale-105 transition-all'>
            <div className='flex items-center justify-between p-2'>
                <div className='flex-center'>
                    <div className='p-1 mr-2 w-8 h-8 rounded-full bg-lime-200 flex-center'>
                        <img
                            src={"/images/workouts/"+icon}
                            alt="icon"
                            className='w-full h-full' />
                    </div>
                    <span className='capitalize'>{title}</span>
                </div>
                <div>
                    <ChevronRight color='#fff' className='w-6' />
                </div>
            </div>
            <div className='bg-black py-4 px-2'>
                {/* stat */}
                <div className=''>
                    <div className='flex items-center'>
                        <Clock color='rgb(217,249,157)' className='w-4' />
                        <span className="text-gray-500 ml-2">Total Time</span>
                    </div>
                    <div className='ml-6'>
                        <span className="text-xl">{mins} min</span>
                    </div>
                </div>

                <div className='mt-2'>
                    <div className='flex items-center'>
                        <Calendar color='rgb(217,249,157)' className='w-4' />
                        <span className="text-gray-500 ml-2">Date</span>
                    </div>
                    <div className='ml-6'>
                        <span className="text-lg">{moment(startTime).format("Do MMMM YYYY")}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkoutStatsCard