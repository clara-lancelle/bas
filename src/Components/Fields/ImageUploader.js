import React, { useState, useEffect } from 'react';
import cross from '../../Images/Icons/cross-white.svg';

const ImageUploader = ({name, onUpload, userImage, apiUrl}) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageIndicatorText, setImageIndicatorText] = useState(true)

  useEffect(() => {
    if (userImage && userImage.length > 0) {
      setImagePreview(`${apiUrl}/assets/images/users/${userImage}`);
      setImageIndicatorText(false)
    }
  }, [userImage]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      if (onUpload) {
        onUpload(file);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    setImageIndicatorText(true)
    document.getElementById('fileInput').value = null;
  };

  return (
    <div className="image-uploader flex items-center justify-start">
      <div
        className="image-bubble mr-4 w-3/12"
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '100%',
          overflow: 'hidden',
          border: '1px solid #9b59b6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" style={{ width: '100%', objectFit: 'cover' }} />
        ) : (
          <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="Empty" style={{ width: '100%', objectFit: 'cover' }} />
        )}
      </div>

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        id="fileInput"
        name={name}
        hidden
      />
      <div className='relative w-7/12'>
        <div
          className="h-[72px] flex items-center justify-center text-center px-3 py-2 rounded-lg"
          style={{
            border: '2px dashed #9b59b6',
            cursor: 'pointer',
            flex: '1'
          }}
          onClick={() => document.getElementById('fileInput').click()}
        >
          {imageIndicatorText && (
            <p className='text-sm text-blue-dark'>Importer (500x500 pixels max) <br /> <span className='text-grey-placeholder'>JPG or PNG (5 Mo max)</span></p>
          )}
          {!imageIndicatorText && (
            <p className='text-sm text-blue-dark'>{userImage}</p>
          )}
        </div>
        {imagePreview && (
          <div
            className="absolute rounded-sm bg-slate-300 w-5 h-5 flex justify-center items-center top-1/2 -translate-y-1/2 w-2/12"
            onClick={handleRemoveImage}
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

export default ImageUploader;
