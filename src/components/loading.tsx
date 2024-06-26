import React from 'react'

const Loading: React.FC = () => {
    return (
        <div className='w-full h-screen bg-black flex-center flex-col'>
            {/* spinner */}
            <div className="w-10 h-10 rounded-full border-4 border-solid border-neutral-600 border-t-lime-300 spin"></div>

            {/* text */}
            <span className='text-neutral-300 mt-2 text-sm'>Just a moment...</span>
        </div>
    )
}

export default Loading