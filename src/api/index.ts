import { Exercise, Log, Routine, Session } from '../types'
import { client } from './sanity.config'

export const getAllRoutines = async ({ userId }: { userId: string }) => await client.fetch(`*[_type=="routine"&&userId=="${userId}"]|order(_createdAt desc)`)
export const getRoutinesWithFilter = async (q: string) => await client.fetch(`*[_type=="routine"&&${q}]`)
export const getRoutineById = async (_id: string) => await client.getDocument(_id)
export const createRoutine = async (routine: Routine) => await client.create({ _type: "routine", ...routine })

export const updateExercises = async (_id: string, exercises: Exercise[]) => await client.patch(_id).set({ exercises }).commit()
export const getExercises = async (routineId: string) => await client.getDocument(routineId)

export const createSession = async (session: Session) => await client.create({ _type: "session", ...session })
export const getSession = async (_id: string) => await client.getDocument(_id)
export const getFirstNSessions = async ({ n, userId }: { n: number, userId: string }) => await client.fetch(`*[_type=="session"&&userId=="${userId}"]|order(_createdAt desc)[0...${n}]`)
export const getSessionsByRoutine = async ({ routineId }: { routineId: string }) => await client.fetch(`*[_type=="session"&&routineId=="${routineId}"]`)

export const createLog = async (sid: string, log: Log) => await client.patch(sid).insert("after", "logs[-1]", [log]).commit()
export const endWorkout = async (sid: string, logs: any, endTime: number) => await client.patch(sid).set({ logs, endTime }).commit()
