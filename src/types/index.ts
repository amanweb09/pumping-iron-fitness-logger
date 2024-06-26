export interface User {
    uid: string,
    name: string,
    email: string,
    avatar: string
}

export interface AuthState {
    isAuth: boolean,
    user: User | null
}

export interface LoggingState {
    // sessionId, exercise, set (weight and reps)
    // {
    //     sessionId,
    //     logs: [
    //         {
    //             exercise: "db press",
    //             logs: [
    //                 {weight: 25, reps: 8, notes: ""},
    //                 {weight: 25, reps: 8, notes: ""},
    //             ]
    //         },
    //         {
    //             exercise: "lateral raises",
    //             logs: [
    //                 {set: 1, weight: 5, reps: 8},
    //                 {set: 2, weight: 7.5, reps: 8},
    //             ]
    //         },
    //     ]
    // }
    sessionId: string | null,
    logs?: [
        {
            exercise: string,
            logs: [
                {
                    weight: string,
                    reps: string,
                    notes: string
                }
            ]
        }
    ] | any[]
}

export interface ApiLogs {
    exercise: string,
    logs: [
        {
            weight: string,
            reps: string,
            notes: string
        }
    ]
}

export interface Exercise {
    exercise: string
}

export interface Routine {
    userId: string,
    title: string,
    icon: string,
    exercises: Exercise[] | [],
    workoutSessions: string[] | null
}

export interface SanityRoutine extends Routine {
    _id: string,
    _createdAt: string,
    _updatedAt: string,
    _type: string
}

export interface Session {
    userId: string,
    routineId: string | SanityRoutine,
    startTime: number,
    endTime?: number,
    logs?: Log[]
}

export interface SanitySession extends Session {
    _id: string,
    _createdAt: string,
    _updatedAt: string,
    _type: string
}

export interface PopulatedSession extends SanitySession {
    userId: string,
    startTime: number,
    endTime?: number,
    logs?: Log[]
    routineId: SanityRoutine
}


export interface Log {
    exercise: string,
    logs: ExLog[]
}

export interface ExLog {
    notes: string,
    weight: string,
    reps: string
}