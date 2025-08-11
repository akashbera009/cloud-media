import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './assets/user/Login';
import Register from './assets/user/Register';
import Upload from './assets/phootos/Upload';
import DisplayMedia from './assets/phootos/DisplayMedia';
import Authenticate_Layout from './assets/user/Authenticate_Layout'
import DisplayVideos from './assets/phootos/DisplayVideos';
import DisplayImages from './assets/phootos/DisplayImages';
import DisplayMusic from './assets/phootos/DisplayMusic';
import Landing from './assets/Landing';
// import NavAndBack from './assets/otherComponents/NavAndBack';

function App() {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [isDiaplay , setIsDisplay] = useState(false)
  const [profileDisplay , setProfileDIsplay] = useState(false)
  let owner = user
    useEffect(()=>{
      setUser(localStorage.getItem('user'))
    }, [])

    // useEffect(() => {
    //   axios.get('/jokes') // Change the URL to match your server
    //     .then(response => {
    //       setData(response.data);  
    //       console.log('Data:', response.data); 
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data:', error);  
    //     });
    // }, []);


    const handleDisplayImage =()=>{
        setIsDisplay(true)
    }
    // console.log(localStorage.getItem('user'),localStorage.getItem('token') )
    const handleProfileClick=(e)=>{
      if(profileDisplay){
        setProfileDIsplay(false)
      }else{  setProfileDIsplay(true)}
    
    }
    const signOut =()=>{
      localStorage.setItem('user', "")
      localStorage.setItem('token', null)
      window.location.href = '/auth/login'
    }
  return (
    <>
    <h1>Photos and videos </h1>
      <Router>
      <nav>
              <img src="https://i.ibb.co/gZhRFvN/cloud-media-logo.png" alt="cloud-media-logo" height={'50px'} border="0"/>
              <div className="profile-container">

              {owner == "" ? (
                <button className='profile-name'onClick={() => window.location.href = '/auth/login'}>
                  { 'Sign-in'}
                </button>
              ) : (
                <button className='profile-name' onClick={handleProfileClick}>
                  {owner}
                </button>
              )}

                 
          
              {profileDisplay  && (
                  <div className="profile-popup">
                    <p className="profile-name">{owner || 'Sign-in'}</p>
                    <button className="signout-button" onClick={signOut}>
                      Sign Out
                    </button>
                  </div>
                )}
                </div>
            </nav>
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* Main application layout that wraps login and register */}
            <Route path="/auth" element={<Authenticate_Layout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/upload" element={<Upload />} />
            <Route path="/display" element={<DisplayMedia />} />
            <Route path="/display/videos" element={<DisplayVideos />} />
            <Route path="/display/images" element={<DisplayImages />} />
            <Route path="/display/music" element={<DisplayMusic />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
