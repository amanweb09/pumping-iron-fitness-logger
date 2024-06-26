import React from 'react'
import { Link } from 'react-router-dom'

interface PropTypes {
    code: string,
    message: string,
    redirectHref: string
}

const Error:React.FC<PropTypes> = ({
    code="404",
    message,
    redirectHref="/"
}) => {
    return (
        <div className='w-full h-screen bg-black flex-center flex-col text-gray-100'>
            <span className="text-3xl text-lime-300">{code}</span>
            <span>{message}</span>
            <Link
                to={redirectHref}
                className='rounded-md mt-6 text-lime-100 font-bold'>
                <span>Back Home</span>
            </Link>
        </div>
    )
}

export default Error