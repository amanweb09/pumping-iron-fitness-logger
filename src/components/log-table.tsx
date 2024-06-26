import React from 'react'
import { logSelector } from '../lib/store/logging-slice'
import { ExLog } from '../types'

interface PropTypes {
    exercise: string
}

const LogTable: React.FC<PropTypes> = ({ exercise }) => {

    const {logs} = logSelector()
    const myLog = logs?.filter((l) => l.exercise == exercise)

    if (!myLog || !myLog.length || !myLog[0]) return <></>

    return (
        <table className="min-w-full divide-y divide-gray-200 bg-neutral-900">
            <thead className="bg-lime-300">
                <tr>
                    <th scope="col" className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Set Number
                    </th>
                    <th scope="col" className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Weight
                    </th>
                    <th scope="col" className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reps
                    </th>
                    <th scope="col" className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                    </th>
                    {/* <th scope="col" className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                    </th> */}
                </tr>
            </thead>
            <tbody className="bg-neutral-900 divide-y divide-neutral-500">
                {myLog[0].logs.map((data:ExLog, i:number) => (
                <tr key={i} className='bg-neutral-900 text-gray-100'>
                    <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{i+1}.</td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-100">{data.weight}</td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-100">{data.reps}</td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-100">{data.notes}</td>
                    {/* <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium"> */}
                        {/* <button className="text-indigo-600 hover:text-indigo-900">{row.action}</button> */}
                    {/* </td> */}
                </tr>
                 ))} 
            </tbody>
        </table>
    )
}

export default LogTable