import React from 'react'

const TextLine = ({ text }) => {
    return (
        <>
            <div className="h-1 bg-black dark:bg-gray-200 rounded overflow-hidden mx-20 mt-6">
                <div className="w-16 md:w-36 h-full bg-white dark:bg-red-500"></div>
            </div>
            <h3 className="text-2xl md:text-3xl mt-4 font-bold text-center md:text-left md:ml-20 mx-4 text-black dark:text-white mb-8">{text}</h3>
        </>
    )
}

export default TextLine