import React, { useState, useRef } from 'react';
import fileAttachement from "../../Images/Icons/file-attachement.svg";
import cross from "../../Images/Icons/cross-white.svg";

const DocumentUploader = ({ label, accept, name, onUpload }) => {
    const [document, setDocument] = useState(null);
    const fileInputRef = useRef(null);

    const handleDocumentChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setDocument(file);
            if (onUpload) {
                onUpload(file);
            }
        }
    };

    const handleRemoveDocument = () => {
        setDocument(null);
        if (onUpload) {
            onUpload(null)
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    return (
        <div className="">
            <input
                type="file"
                name={name}
                accept={accept}
                onChange={handleDocumentChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <div className='relative w-fit'>
                <div
                    className="w-fit border-dashed border-2 border-blue-600 p-4 rounded cursor-pointer flex items-center justify-center relative"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                    {document ? (
                        <span className="text-blue-600 flex items-center">
                            <img src={fileAttachement} className='mr-4' />
                            {document.name}
                        </span>
                    ) : (
                        <span className="text-blue-600 flex items-center">
                            <img src={fileAttachement} className='mr-4' />
                            {label}
                        </span>
                    )}
                </div>
                {document && (
                    <div
                        className="absolute rounded-sm bg-slate-300 w-5 h-5 flex justify-center items-center top-1/2 -translate-y-1/2"
                        onClick={handleRemoveDocument}
                        style={{
                            right: '-32px',
                            cursor: 'pointer',
                            display: 'flex',
                        }}
                    >
                        <img src={cross} width={'12px'} height={'12px'} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentUploader;
