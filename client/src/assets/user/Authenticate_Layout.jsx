import React from 'react'
import { Outlet ,Link} from 'react-router-dom'

function Authenticate_Layout() {
  return (<>
  <div className="login-container">
    <div className="form-container">
     <Outlet />
    </div>
  </div>

  </>
   
  )
}

export default Authenticate_Layout