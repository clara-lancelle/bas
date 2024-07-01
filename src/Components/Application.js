import React, { useState, useEffect } from 'react';
import useToken from './useToken';

const Application = (id) => {
    const { REACT_APP_API_URL } = process.env;
    const [skills, setSkills] = useState([])
    const [profileImage, setProfileImage] = useState(null);
    const userId = sessionStorage.getItem('userType') == 'Student' && sessionStorage.getItem('userId') || ''
    
    useEffect(() => {
        fetch(`${REACT_APP_API_URL}/api/skills`)
            .then(response => response.json())
            .then(response => (
                setSkills(response['hydra:member'].filter((item, index) => index < 3).map(item => `/api/skills/${item.id.toString()}`)) 
            ))
    }, [REACT_APP_API_URL])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        //  console.log(file)
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

     const handleSubmit = () => {
        const user = {    
            'firstname': 'john',
            'name' : 'doe',
            'gender' : 'Homme',
            'birthdate': '14/12/1999',
            'cellphone': '0616161616',
            'email': 'john.doe@hotmail.com',
            'address' : '9 rue du sapin',
            'zip_code': '77777',
            'city': 'paris',
            'personnal_website': 'http://john.com',
            'driver_license': true,
            'prepared_degree': 'CAP, BEP',
            'study_years': 'Bac +0',    
            'school_name': 'UTC',
            'visitor_status': true,
            'profile_image': profileImage
        }
         fetch(`${REACT_APP_API_URL}/api/applications/persistingApplication`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify({
                "student_array": user,
                "offer": `/api/offers/${id.id.id}`,
                "motivations": "string",
                "cover_letter": "string",
                "school_name": "string",
                "skills": skills,
                "experiences_array": [
                    {
                        "company": "string",
                        "type": "Stage",
                        "year": "2023"
                    }
                ],
            })
        })
            .then(response => response.json())
            .then(response => (console.log('response :', response)));
    };

    return (
        <div className='bg-light-grey text-blue-dark'>
            Application
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Application;