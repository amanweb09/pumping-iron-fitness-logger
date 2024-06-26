import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
// import { createLog } from '../api'
// import { Log as LogType } from '../types'
import { useDispatch } from 'react-redux'
import { setLog } from '../lib/store/logging-slice'

interface PropTypes {
    sid: string,
    exercise: string
}

const Log: React.FC<PropTypes> = ({ exercise }) => {

    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState({ weight: "", reps: "", notes: "" })

    async function handleLog() {
        if (!inputValue.weight || !inputValue.reps) {
            return toast.error("Please enter weight/reps")
        }

        const myLog = {
            exercise,
            logs: [inputValue]
        }
        dispatch(setLog({ log: myLog }))
        setInputValue({ weight: "", reps: "", notes: "" })
    }

    return (
        <div className='pl-6 flex flex-col'>
            <div>
                <div className="flex items-center mt-4">
                    <div>
                        <input
                            onChange={(e) => setInputValue({ ...inputValue, weight: e.target.value })}
                            value={inputValue.weight}
                            type="number"
                            className="bg-neutral-900 text-white rounded-md w-20 px-4 py-1" />
                        <span className='text-gray-100 ml-2'>kg</span>
                    </div>

                    <span className='text-white text-3xl mx-10'>&times;</span>

                    <input
                        onChange={(e) => setInputValue({ ...inputValue, reps: e.target.value })}
                        value={inputValue.reps}
                        type="number"
                        className="bg-neutral-900 text-white rounded-md w-20 px-4 py-1" />
                    <span className='text-gray-100 ml-2'>reps</span>
                </div>

                <textarea
                    onChange={(e) => setInputValue({ ...inputValue, notes: e.target.value })}
                    value={inputValue.notes}
                    className='bg-neutral-900 text-gray-100 rounded-md mt-2 w-80 p-1'
                    placeholder='Notes...'
                    name="notes"
                    id="notes">
                </textarea>
                <button
                    onClick={handleLog}
                    className='bg-green-500 hover:bg-green-600 text-white rounded-md px-2 py-1 mb-2 flex items-center mt-2'>
                    <Plus className='text-white w-4 mr-2' />
                    Log set
                </button>

            </div>
        </div>
    )
}

export default Log