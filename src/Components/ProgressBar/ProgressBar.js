import React from "react";

const ProgressBar = ((limitDays) => {
    return (
        <div className="flex">
            <span className={`${`h-2 w-20`} ${limitDays <= 5 ? `bg-red-500` : limitDays <= 10 ? `bg-red-500` : `bg-green-400`}`}></span>
            <span className={`${`h-2 w-20`} ${limitDays < 21 ? `bg-slate-300` : `bg-green-400`}`}></span>
            <span className={`${`h-2 w-20`} ${limitDays < 41 ? `bg-slate-300` : `bg-green-400`}`}></span>
            <span className={`${`h-2 w-20`} ${limitDays < 61 ? `bg-slate-300` : `bg-green-400`}`}></span>
            <span className={`${`h-2 w-20`} ${limitDays < 81 ? `bg-slate-300` : `bg-green-400`}`}></span>
        </div>
    )
})

export default ProgressBar