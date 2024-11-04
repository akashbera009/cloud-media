import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './displayimage.css'; 
import Upload from './Upload';
import Loading from '../otherComponents/Loading'
import Sidebar from '../otherComponents/Sidebar'

const  DisplayMusic = () => {
  const [images, setImages] = useState([]);
  const[loading1, setLoading1] = useState(true)
  const [selectedMedia, setSelectedMedia] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [openUpload, setOpenUpload] = useState(false);
  const [message, setMessage] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  let owner = user

  setTimeout(() => {
    if(message){
        setMessage('')
        // setloading(false)
    }
    }, 4000);
    const handleClosePopup = () => {
        setMessage(""); // Setting message to an empty string or setting another state to false
    };
  useEffect(() => {
      setUser(localStorage.getItem('user'));
  }, []);
  useEffect(() => {

  }, [loading1]);

  useEffect(() => {
    const fetchImages = async () => {
        const token = localStorage.getItem('token')
        // const token = 'B'
      try { 
        const response = await axios.post(`/user/images/ `, {owner} ,{
           headers:{
            Authorization: `Bearer ${token}`
           },
        } ); 
   
        if (Array.isArray(response.data)) {
          setImages(response.data);
          setLoading1(false)
          
        } else {
          console.log("Expected an array of images, but got:", response);
          setImages([]); // Ensure images is an empty array if the response is not as expected
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (owner) {
      fetchImages();
    }
  }, [owner,images ,selectedMedia, isModalOpen,message]);

  const handlePlay = () => {
    document.getElementById('myVideo').play();
    setIsPlaying(true);
  };
  const handleStopPlay = () => {
    document.getElementById('myVideo').pause();
    setIsPlaying(false);
  };

    // Open the modal with selected media
    const openModal = (media) => {
      setSelectedMedia(media);
      setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = (e) => {
      setIsModalOpen(false);
      setSelectedMedia(null);
      setShowDetails(false)
  };
  const toggleDetails = () => {
    setShowDetails(prevState => !prevState);
};
  // Delete selected media
  const handleDelete = async (public_id) => {
    // setLoading1(true)
    setIsModalOpen(true)
    const token = localStorage.getItem('token')
    const owner = localStorage.getItem('owner')
      try {
        
          const response = await  axios.post('/user/images/delete', {user, public_id},{
            headers:{
                Authorization: `Bearer ${token}`
            }
          })
          setMessage(response.data.message)
          closeModal(); // Close the modal after deletion
        
          setTimeout(() => {  
            window.location.href= '/display/music'
            setLoading1(false)
          }, 2000);
        
      } catch (error) {
          console.error("Failed to delete media:", error);
      }
  };


  return (
    <div className="gallery-container">
        <Sidebar/>
        
        {message &&<div class="overlay" >
                <div class="overlay-content">
                    {/* <h2>Notification</h2> */}
                    <p className='message'>{message}</p>
                    <button class="close-btn-popup"  onClick={handleClosePopup} >Ok</button>
                </div>
            </div>}
    {loading1 ? (
        <Loading/>
    ) : (   
        <>
            <button onClick={()=>setOpenUpload(!openUpload)}  className='fixed-uploader-button'>
                
                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 364.92" width="35px" height="35px">
                        <path fill-rule="nonzero" fill='#ffff' d="M359.34 124.66c-13.56 6.7-25.71 15.36-37.41 24.9l-20.13-23.03c14.81-13.74 32.08-24.49 50.64-32.39-37.56-66.54-128.4-83.94-188.3-37.42-21.75 16.84-38.26 42.04-44.61 75.42l-2 10.43-10.4 1.84c-10.19 1.78-19.29 4.24-27.27 7.36-49.8 19.27-63.78 74.7-33.31 116.79 13.04 17.91 29.66 36.17 51.47 39.21h30.49c-.21 3-.32 6.02-.32 9.07 0 7.34.62 14.53 1.82 21.53H97.53l-1.92-.17c-30.53-3.88-55.62-26.61-73.75-51.72C-20.41 228.28.4 149.83 68.93 123.25c7.15-2.79 14.8-5.12 22.86-6.99 9.15-36.34 28.65-64.32 53.72-83.74C222.7-27.29 338.58-1.8 382.79 86.08c6.65-1.05 13.31-1.58 19.92-1.5 98.9.73 138.01 127.2 86.69 195.33-20.57 27.29-52.12 50.51-84.61 58.05l-3.41.41h-19.81a128.362 128.362 0 0 0 1.5-30.6h16.61c24.15-5.81 49.91-25.68 65.23-46.16 36.46-48.56 10.58-146.05-62.41-146.51-14.26-.12-29.11 3.33-43.16 9.56zM234.73 364.92h42.56c9.95 0 18.11-8.16 18.11-18.11v-58.64h31.04c6.54-.28 11.18-2.44 13.87-6.52 7.27-10.91-2.66-21.68-9.55-29.27-19.55-21.46-53.22-53.23-62.87-64.59-7.32-8.08-17.72-8.08-25.04 0-9.97 11.64-44.84 45.77-63.43 66.64-6.45 7.27-14.42 17.17-7.72 27.22 2.76 4.08 7.35 6.24 13.89 6.52h31.04v58.64c0 9.84 8.15 18.11 18.1 18.11z"/>
                    </svg>
                </button>
          
                { openUpload && 
                <div className="overlay">
                    <div className="overlay-content">
                        <button onClick={() => setOpenUpload(!openUpload)} className='close-btn-popup-upload'>X</button>
                        <Upload />
                    </div>
                </div>
                }

           
          
            {/* <h1 className="gallery-title">Images of {owner}</h1> */}
            {images.length > 0 ? (
                <div className="image-gallery">
                    {images.map((media) => (
                        
                        media.filePath.slice(-3) === 'mp4' ? (<>
                            
                            </>) : (
                                media.filePath.slice(-3)=== 'mp3'? ( 
                                    <div
                                    key={media._id}
                                    className="image-item"
                                    onClick={() => openModal(media)}> 
                                    <audio controls className="audio-player">
                                        <source src={media.filePath} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                    </div>
                             ):(
                               <></>
                            )
                               
                           
                        )
                    ))}
                    
                </div>
            ) : (<>
                <p className="no-images">No Files Avalilable</p>
                {/* <Upload />   */}
                </>
            )}
        </>
    )}

    {/* Modal for full-screen preview */}
    {isModalOpen && selectedMedia && (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                {selectedMedia.filePath.slice(-3) === 'mp4' ? (<>      
                    </> ) : (<> 
                       { selectedMedia.filePath.slice(-3)=== 'mp3'? (
                        <>
                         <p className='filename'>{selectedMedia.filename}</p>                        
                            <audio controls>
                                <source src={selectedMedia.filePath} type="audio/mpeg"  />
                                Your browser does not support the audio element.
                            </audio>
                         </>
                        ):( <>
                        </>)     
                    }
                    </>)}



                    <button onClick={toggleDetails} className="info-button">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="25px"
                            height="25px"
                            viewBox="0 0 29.957 122.88"
                            fill='#ffff'
                        >
                            <g>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M14.978,0c8.27,0,14.979,6.708,14.979,14.979c0,8.27-6.709,14.976-14.979,14.976 C6.708,29.954,0,23.249,0,14.979C0,6.708,6.708,0,14.978,0L14.978,0z M14.978,92.926c8.27,0,14.979,6.708,14.979,14.979 s-6.709,14.976-14.979,14.976C6.708,122.88,0,116.175,0,107.904S6.708,92.926,14.978,92.926L14.978,92.926z M14.978,46.463 c8.27,0,14.979,6.708,14.979,14.979s-6.709,14.978-14.979,14.978C6.708,76.419,0,69.712,0,61.441S6.708,46.463,14.978,46.463 L14.978,46.463z"
                            />
                            </g>
                        </svg>
                        </button>
                        {showDetails && (
                                <div className='details'>
                                    <p className='file'>Size: {(selectedMedia.fileSize / 1024).toFixed(2)} kb</p>
                                    <p className='file'>Dimension {selectedMedia.fileDimension[0]} X {selectedMedia.fileDimension[1]}</p>
                                    <p className='file'>Created At: {selectedMedia.createdAt}</p>
                                    <p className='file'>Format: {selectedMedia.fileForamt}</p>
                                    <p className='file'>Public ID: {selectedMedia.public_id}</p>
                                    <button className="delete-btn-image" onClick={()=>handleDelete(selectedMedia.public_id)}>Delete</button>
                                </div>
                            )}
                <button className="close-btn-image" onClick={closeModal}>X</button>
                            {loading1 && 
                            <Loading/>
                            }
                
               
            </div>
        </div>
    )}
</div>
  );
};

export default DisplayMusic;
