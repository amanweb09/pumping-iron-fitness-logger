import { defineType, defineField, defineArrayMember } from "sanity"

// eg. chest and abs

const routineSchema = defineType({
    title: "routine",
    name: "routine",
    type: "document",
    fields: [
        defineField({
            title: "userId",
            name: "userId",
            type: "string"
        }),
        defineField({
            title: "title",
            name: "title",
            type: "string"
        }),
        defineField({
            title: "icon",
            name: "icon",
            type: "string"
        }),
        defineField({
            title: "exercises",
            name: "exercises",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        {
                            name: "exercise",
                            title: "exercise",
                            type: "string"
                        }
                    ]
                })
            ]
        }),
        defineField({
            title: "workoutSessions",
            name: "workoutSessions",
            type: "array",
            of: [
                defineArrayMember({
                    type: "reference",
                    to: [{ type: "session" }]
                })
            ]
        })
    ]
})

export default routineSchema