import React, { useState, useEffect } from 'react';
const JobProfiles = ({ profile }) => {

    return (
        <div className='relative h-fit'>
            <p key={profile.name} className="px-[10px] py-[6px]" style={{ color: profile.color }}>{profile.name}</p>
            <div className='absolute w-full h-full opacity-10 top-0 left-0 rounded-full' style={{backgroundColor: profile.color}}></div>
        </div>
    )
}

export default JobProfiles