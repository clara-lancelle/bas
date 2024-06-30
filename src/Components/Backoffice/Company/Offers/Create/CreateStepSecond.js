import React, { useState } from "react";
import { EditorState, convertToRaw, CompositeDecorator, ContentState } from 'draft-js';
import RichTextEditor from '../../../../Fields/RichTextEditor';
import MissionsAdder from "../../../../Fields/Backoffice/Missions";
import ProfilesAdder from "../../../../Fields/Backoffice/RequiredProfiles";

export default function CreateStepSecond({ setStep, step, formData, setFormData, notify }) {
    const { REACT_APP_API_URL } = process.env
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [errors, setErrors] = useState({});

    const missions = formData.missions || [];
    const profiles = formData.profiles || [];

    const validateFormData = (textContent) => {
        const newErrors = {};
        if (!textContent || textContent.length < 300) {
            newErrors.description = "La description doit faire au minimum 300 caractères.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const textContent = rawContentState.blocks[0].text;
        setFormData({
            ...formData,
            description: textContent
        })
        if (validateFormData(textContent)) {
            setStep((prevStep) => prevStep + 1);
        } else {
            notify('Vérifiez vos entrées.', 'error')
        }
    }

    const handlePreviousStep = (e) => {
        e.preventDefault()
        setStep((prevStep) => prevStep - 1);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">A propos</p>
                        <span className="text-grey-placeholder">Texte d'introduction qui résume l'offre</span>
                    </div>
                    <div className='flex flex-col gap-y-4 w-2/3'>
                        <RichTextEditor name="description"
                            editorState={editorState}
                            setEditorState={setEditorState}
                            placeholder="300 caractères minimum"
                        ></RichTextEditor>
                        {errors.description && <p className="text-red-500">{errors.description}</p>}
                    </div>
                </div>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">Mission</p>
                        <span className="text-grey-placeholder">Décrivez les tâches, missions et responsabilités qui seront confiées au candidat</span>
                    </div>
                    <MissionsAdder
                        missions={formData.missions}
                        setMissions={(missions) => setFormData((prevFormData) => ({ ...prevFormData, missions: missions }))}
                    />
                </div>
                <div className="flex items-start py-6 border-b">
                    <div className="w-[250px] me-28">
                        <p className="font-semibold text-grey-dark">Profil recherché</p>
                        <span className="text-grey-placeholder">Décrivez les qualités du candidat idéal en termes de savoir-faire et de savoir-être.</span>
                    </div>
                    <ProfilesAdder
                        profiles={formData.required_profiles}
                        setProfiles={(profiles) => setFormData((prevFormData) => ({ ...prevFormData, required_profiles: profiles }))}
                    />
                </div>
                <div className="flex justify-between w-full pt-6 pb-8">
                    <button className="btn-blue-dark" onClick={handlePreviousStep}>Etape précédente</button>
                    <button type="submit" className="btn-blue-dark">Etape suivante</button>
                </div>
            </form>
        </>
    )
}