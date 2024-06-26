import React, { useEffect } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'

interface PropTypes {
    countdown: number,
    setCountdown: React.Dispatch<React.SetStateAction<number>>,
}

const Countdown: React.FC<PropTypes> = ({ countdown, setCountdown}) => {

    // const [searchParams] = useSearchParams()
    // const routineId = searchParams.get("rid")

    useEffect(() => {
        
        if (countdown > 0) {
            setTimeout(() => {
                setCountdown(countdown-1)
            }, 1000)
        }
    }, [countdown])

    // const navigate = useNavigate()

    return (
        <div className='w-full h-screen bg-black flex-center'>
            <div className="bg-neutral-900 rounded-md p-4">

                <div className="w-32 h-32 flex-center rounded-full border-4 border-solid border-lime-300">
                    <span className='text-7xl text-lime-300'>{countdown}</span>
                </div>

                {/* <button
                    onClick={() => navigate("/routine/"+routineId)}
                    className="bg-red-500 text-white w-20 py-1 block mx-auto mt-8">Abort</button> */}

            </div>
        </div>
    )
}

export default Countdown