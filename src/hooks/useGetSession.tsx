import { SanityDocument } from '@sanity/client'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getRoutineById, getSession } from '../api'

interface PropTypes {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const useGetSession = async ({ setLoading }: PropTypes) => {
    const [session, setSession] = useState<SanityDocument<Record<string, any>> | null>(null)
    const [searchParams] = useSearchParams()

    const navigate = useNavigate()
    const rid = searchParams.get("rid")
    const sid = searchParams.get("sid")

    useEffect(() => {

        (async () => {

            if (!sid || !rid) {
                toast.error("Invalid routine info")
                return navigate("/")
            }

            const session = await getSession(sid)
            if (!session) {
                toast.error("Invalid URL")
                return navigate("/")
            }

            const routine = await getRoutineById(rid)

            if (!routine) {
                toast.error("Invalid URL")
                return navigate("/")
            }

            const populatedSession = { ...session, routineId: routine }

            setSession(populatedSession)
            setLoading(false)

        })()

        return () => {
            // 1. confirm from user is he wants to end before unmounting
            // 2. send the end time of the workout
        }
    }, [])

    return { session }
}

export default useGetSession