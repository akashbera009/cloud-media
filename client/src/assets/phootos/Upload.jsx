// Upload.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './upload.css';
import Loading from '../otherComponents/Loading';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [owner, setOwner] = useState(localStorage.getItem('user') || '');
    const [message, setMessage] = useState('');
    const [fileName, setFileName] = useState("");
    const [loading , setloading] = useState(false);

    setTimeout(() => {
        if(message){
            setMessage('')
            // setloading(false)
        }
    }, 4000);
    useEffect(() => {
        setOwner(localStorage.getItem('user'));
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile); // Get the selected file
        setFileName(selectedFile ? selectedFile.name : ""); // Set file name directly from the selected file
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setloading(true)
        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // Append the file to the form data
        formData.append('owner', owner); // Append the owner

        const token =localStorage.getItem('token')
        // const token ='ab'
        try {
            const response = await axios.post(`/user/upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                    Authorization: `Bearer ${token}`
                },
            });
             setMessage("File uploaded successfully."); 
             setloading(false)
             setFileName('')
        } catch (error) {
            setMessage('An error occurred while uploading the file.');
            console.error(error);
        }
        setTimeout(() => {
              window.location.href= '/display'
        }, 2000);
      
    };
    const handleClosePopup = () => {
        setMessage(""); // Setting message to an empty string or setting another state to false
    };
    return (
        <div>
            <form onSubmit={handleUpload} className="upload-container">
                <label htmlFor="file-upload" className="custom-file-upload">
                    {/* <FaUpload className="upload-icon" />  */}
                    <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="20px"
                    height="35px"
                    viewBox="0 0 122.875 122.648"
                    enableBackground="new 0 0 122.875 122.648"
                    xmlSpace="preserve"
                    >
                    <g>
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill='white'
                        d="M108.993,47.079c7.683-0.059,13.898,6.12,13.882,13.805c-0.018,7.683-6.26,13.959-13.942,14.019L75.24,75.138l-0.235,33.73c-0.063,7.619-6.338,13.789-14.014,13.78c-7.678-0.01-13.848-6.197-13.785-13.818l0.233-33.497l-33.558,0.235C6.2,75.628-0.016,69.448,0,61.764c0.018-7.683,6.261-13.959,13.943-14.018l33.692-0.236l0.236-33.73C47.935,6.161,54.209-0.009,61.885,0c7.678,0.009,13.848,6.197,13.784,13.818l-0.233,33.497L108.993,47.079L108.993,47.079z"
                        />
                </g>
                </svg>
                </label>  
                <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    required
                    className="file-upload"  
                />
                 {fileName}
                <button type="submit" className="upload-btn">Upload</button>
              
            
            </form>
            {/* {message && <p className='message'>{message}</p>} */}

            {message &&<div class="overlay" >
                <div class="overlay-content">
                    {/* <h2>Notification</h2> */}
                    <p className='message'>{message}
                        <button class="close-btn-popup"  onClick={handleClosePopup} >Ok</button>
                    </p>
                    
                </div>
            </div>
            }
            
            {loading &&<div class="overlay" >
                <div class="overlay-content">
                    <p  className ='message'>
                      <Loading/>
                    </p>
                </div>
            </div>
            }
            
        </div>
    );
};

export default Upload;
