import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, CompositeDecorator, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import RichTextEditor from '../../../Fields/RichTextEditor';

export default function CompanyIdentityForm({ formData, setFormData, toggleEditState, notify }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { REACT_APP_API_URL } = process.env;
    const [newFormData, setNewFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const userToken = sessionStorage.getItem('token')
    const userCompanyId = sessionStorage.getItem('userCompanyId') 

    useEffect(() => {
        if (formData.description) {
            const blocksFromHTML = convertFromHTML(formData.description);
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            setEditorState(EditorState.createWithContent(state));
        }
    }, [formData.description]);

    const updateFormData = async (newData) => {
        const updatedFormData = { ...formData, ...newData };
        await setFormData(updatedFormData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contentState = editorState.getCurrentContent(); 
        const rawContentState = convertToRaw(contentState);
        const textContent = rawContentState.blocks[0].text; 
        await sendDataToAPI({description: textContent});
        await updateFormData({description: textContent})
    notify('La description de l\'entreprise à été mise à jour !', 'success');
    toggleEditState('description');
};

const sendDataToAPI = async (newData) => {
    const response = await fetch(`${REACT_APP_API_URL}/api/security/companies/${userCompanyId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify(newData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur lors de la mise à jour de la description de l\'entreprise', errorData);
        return;
    }

    const data = await response.json();
}

return (
    <form className="w-full flex flex-col gap-y-8 px-4 py-6" onSubmit={handleSubmit}>
        <div className="w-full flex items-start gap-x-16">
            <div className="w-full flex flex-col gap-y-4">
                <RichTextEditor name="description" className="border-white-light border p-4 h-[150px] w-full z-[1]"
                    editorState={editorState}
                    setEditorState={setEditorState}
                    placeholder="Description de votre entreprise, activité..."
                ></RichTextEditor>
            </div>
        </div>
        <div className="w-full flex justify-end">
            <button type="submit" className="btn-blue-dark">Enregistrer</button>
        </div>
    </form >
)
}