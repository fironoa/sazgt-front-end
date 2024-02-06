import React, { useState } from 'react'
import { MdAddBox } from "react-icons/md";

function ImageUpload() {

    const noOfImages = 5;
    const selectButtonStyle = { 
        display: 'flex', 
        alignContent: 'center', 
        gap: '10px', 
        backgroundColor: '#ddd',
        padding:"10px",
        border: '3px solid black',
        height:'20px',
        width:'150px',
        cursor:'pointer'
    }

    const uploadButtonStyle = { 
        marginTop: '10px', 
        cursor: 'pointer', 
        background: '#28a745', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px',
        border: 'none',
        width:'150px',
        cursor:'pointer'
    }

    const [selectedFiles, setSelectedFiles] = useState([]); // Stores the File objects
    const [imagePreviews, setImagePreviews] = useState([]); // Stores URLs for preview
    //const [productId, setProductId] = useState(-1);

    const handleImageChange = (e) => {
        // Collect the selected files
        const files = Array.from(e.target.files);
        const updatedFiles = selectedFiles.concat(files).slice(0, noOfImages); // Ensure not more than noOfImages
        setSelectedFiles(updatedFiles);

        // Create image URLs for preview
        const newImagePreviews = updatedFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(newImagePreviews);
    };

    const handleRemoveImage = (indexToRemove) => {
        // Remove the selected file and its preview by index
        const newSelectedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
        const newImagePreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
        setSelectedFiles(newSelectedFiles);
        setImagePreviews(newImagePreviews);
    };


    const handleUpload = () => {
        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            formData.append(`image${index}`, file); // You might want to adjust the key/name based on your backend requirements
        });

        // Here you would upload formData to your server
        console.log('Ready to upload:', formData);

        // Reset selections after upload if necessary
        // setSelectedFiles([]);
        // setImagePreviews([]);
    };

    const canUploadMore = imagePreviews.length < noOfImages;

    return (
        <div className='image-upload-controls-wrapper'>
            {canUploadMore && (
                <label style={selectButtonStyle}>
                    <input
                        type="file"
                        style={{ display: 'none' }} // Hide the input but keep it in the document
                        onChange={handleImageChange}
                        accept="image/*" // Accept only image files
                    />
                    <MdAddBox className='icon-properties' />Upload Image
                </label>
            )}

            <div>
                {imagePreviews.map((image, index) => (
                    <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                    <img src={image} alt={`Selected ${index + 1}`} style={{ width: 100, height: 100 }} />
                    <button
                        onClick={() => handleRemoveImage(index)}
                        style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', background: 'red', color: 'white', border: 'none',  padding: '0 4px', margin: '6px 6px' }}>
                        &times;
                    </button>
                </div>
                ))}
            </div>
            {selectedFiles.length > 0 && (
                <button onClick={handleUpload} style={uploadButtonStyle}>
                    Upload Images
                </button>
            )}
        </div>
    );
}

export default ImageUpload