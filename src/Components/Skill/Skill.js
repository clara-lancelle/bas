import React, { useState, useEffect } from 'react';
const Skill = ({ skill }) => {

    return (
        <div className='bg-light-grey text-blue-dark'>
            <p key={skill.id} className="px-4 py-1">{skill.name}</p>
        </div>
    )
}

export default Skill