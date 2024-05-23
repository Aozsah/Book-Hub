import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function ProfilePhotoPopup({ onClose, currentPhoto }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(currentPhoto);

  function handlePhotoChange(info) {
    const file = info.file;
    if (file) {
      setSelectedPhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
    } else {
      message.error('Error selecting file');
    }
  }

  function handleSaveClick() {
    const id = localStorage.getItem('id');
    const formData = new FormData();
    formData.append('profilePicture', selectedPhoto);

    axios.put(`http://localhost:3001/users/${id}/profilePicture`, formData)
      .then(response => {
        message.success('Profile picture updated successfully');
        onClose();
        window.location.reload();
      })
      .catch(error => {
        message.error('Error updating profile picture:', error);
      });
  }

  function handleCancelClick() {
    onClose();
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {previewPhoto ? (
        <img src={previewPhoto} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: '20px' }} />
      ) : (
        <img src={require('../../../assets/images/defaultProfilePhoto.jpeg')} alt="Profile" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: '20px' }} />
      )}
      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handlePhotoChange}
      >
        <Button icon={<UploadOutlined />}>Change Photo</Button>
      </Upload>
      <div style={{ marginTop: '20px' }}>
        <Button key="cancel" onClick={handleCancelClick} style={{ marginRight: '10px' }}>
          Cancel
        </Button>
        <Button key="save" type="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default ProfilePhotoPopup;
