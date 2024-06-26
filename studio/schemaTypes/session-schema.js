import { defineType, defineField, defineArrayMember } from "sanity"

const sessionSchema = defineType({
    title: "session",
    name: "session",
    type: "document",
    fields: [
        defineField({
            title: "userId",
            name: "userId",
            type: "string"
        }),
        defineField({
            title: "routineId",
            name: "routineId",
            type: "reference",
            to: [{
                type: "routine"
            }]
        }),
        defineField({
            title: "startTime",
            name: "startTime",
            type: "string"
        }),
        defineField({
            title: "endTime",
            name: "endTime",
            type: "string"
        }),
        defineField({
            // logs: [{exercise: "flat bp", logs: {set: 1, weight: 25, reps: 10}, {set: 2, weight: 25, reps: 10}}]
            title: "logs",
            name: "logs",
            type: "array",
            of: [

                defineArrayMember({
                    type: "object",
                    fields: [
                        {
                            name: "exercise",
                            title: "exercise",
                            type: "string"
                        },
                        defineArrayMember({
                            name: "logs",
                            title: "logs",
                            type: "object",
                            fields: [
                                {
                                    name: "weight",
                                    title: "weight",
                                    type: "string",
                                },
                                {
                                    name: "reps",
                                    title: "reps",
                                    type: "string",
                                },
                                {
                                    name: "notes",
                                    title: "notes",
                                    type: "string",
                                }
                            ]
                        })
                    ]
                })

            ]
        })
    ]
})

export default sessionSchema