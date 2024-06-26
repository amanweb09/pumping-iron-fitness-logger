import { Check, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Exercise } from '../types'
import { getExercises, updateExercises } from '../api'
import { toast } from 'react-toastify'
import Loading from './loading'
import { useNavigate } from 'react-router-dom'

interface PropTypes {
    setOpenAddExercise: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    routineId: string
}

const AddExercises: React.FC<PropTypes> = ({
    setOpenAddExercise,
    title,
    routineId
}) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [inputValue, setInputValue] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const res = await getExercises(routineId)
                setExercises(res?.exercises)

            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    function addExercise() {
        // [{exercise: "bench press"}]
        setExercises([...exercises, { exercise: inputValue.trim() }])
        setInputValue("")
    }

    function removeExercise(ex:string) {
        const filteredExercises = exercises.filter((exc) => exc.exercise != ex)
        setExercises(filteredExercises)
    }

    async function handleFinalPush() {
        setLoading(true)
        try {
            const res = await updateExercises(routineId, exercises)
            if (res) {
                // console.log(res);
                toast.success("Your " + title + " routine is updated!")
                return navigate("/")
            }
        } catch (error) {
            console.log(error);
            toast.error("Your routine could not be updated")
        }

        return setOpenAddExercise(false)
    }

    function closeModal() {

        if (!exercises.length) {
            return setOpenAddExercise(false)
        }

        const confirmation = confirm("Are you sure you want to exit? All your progress will be lost")
        if (confirmation) {
            setOpenAddExercise(false)
        }
    }

    if (loading) return <Loading />

    return (
        <div className='px-2 w-full h-screen bg-black absolute inset-0'>
            <div className="w-full py-4 flex-center">
                <button
                    onClick={closeModal}
                    className='bg-red-500 text-red flex-center text-gray-100 px-6 rounded-md hover:bg-red-600'>
                    <span className='text-3xl mr-1'>&times;</span>
                    <span>Done</span>
                </button>
            </div>

            <div className='mt-8'>
                <h1 className='text-xl font-bold text-gray-100'>
                    Add exercises for your <span className="text-lime-300 capitalize">{title}</span> workout
                </h1>

                {/* exercise list */}
                <div className="w-full p-4 rounded-md bg-neutral-900 mt-6">
                    <h2 className='text-neutral-600'>Added exercises</h2>

                    <div className='mt-6 capitalize'>
                        {
                            exercises.length > 0
                            &&
                            exercises.map((ex, i) => <div
                                key={i}
                                className='flex items-center justify-between mb-2'>
                                <div>
                                    <span className="text-lime-300">{i + 1}.</span>
                                    <span className='text-gray-100 ml-2'>{ex.exercise}</span>
                                </div>
                                <button onClick={() => removeExercise(ex.exercise)}>
                                    <Trash2 className='w-4 hover:text-red-500 text-gray-400' />
                                    </button>
                            </div>)
                        }
                    </div>
                </div>

                <div className='mt-8'>
                    <input
                        name='exercise'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder='Eg. bench press'
                        className='w-80 p-2 bg-neutral-900 rounded-md text-gray-200'
                        type="text" />
                    <button
                        onClick={addExercise}
                        className='bg-green-500 px-4 py-1 rounded-md text-gray-100 ml-4 hover:bg-green-600'>Add</button>
                </div>
            </div>

            <div className="w-full flex-center mt-10">
                <button
                    onClick={handleFinalPush}
                    className="bg-lime-300 rounded-md px-6 py-2 w-64 flex-center hover:bg-lime-500">
                    <Check className='w-6' />
                    <span>Done</span>
                </button>
            </div>
        </div>
    )
}

export default AddExercises