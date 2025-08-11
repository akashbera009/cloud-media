import React, { useState, useEffect  } from 'react';

const [user, setUser] = useState(localStorage.getItem('user'));
const [profileDisplay , setProfileDIsplay] = useState(false);
let owner = user
useEffect(()=>{
  setUser(localStorage.getItem('user'))
}, [])

const handleProfileClick=(e)=>{
  if(profileDisplay){
    setProfileDIsplay(false)
  }else{  setProfileDIsplay(true)}

}
const signOut =()=>{
  localStorage.setItem('user', null)
  localStorage.setItem('token', null)
  window.location.href = '/auth/login'
}
function NavAndBack() {
  return (
    <div className='nav-and-back'>
    <button className="left-arrow-button" onClick={() => (window.location.href = "/")}>
          ←
        </button>


        <nav>
              {/* <Link to="/auth/login" >Login</Link> */}
              {/* <Link to="/display">Display</Link> */}
              <img src="https://i.ibb.co/gZhRFvN/cloud-media-logo.png" alt="cloud-media-logo" height={'50px'} border="0"/>
              <div className="profile-container">
              <button className='profile-name' onClick={handleProfileClick}>{owner || 'Sign-in'}
              </button>
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
    </div>
  )
}

export default NavAndBack 