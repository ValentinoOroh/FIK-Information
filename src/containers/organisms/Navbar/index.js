import React from 'react'
import { Link } from 'react-router-dom'
const navbar = () => {
  return (
      <div>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to='/' className="navbar-brand">FIK Information</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to='/news' className="nav-link">News</Link>
            </li>
            <li>
            <Link to='announcement' className="nav-link">Announcement</Link>
            </li>
           
           
            
          </ul>
        </div>
        
              
            
      </nav>
      <font size="5">
        <marquee bgcolor="yellow" scrollamount="15" direction="right" behavior="alternate">
            <font color="Blue">FAKULTAS ILMU KOMPUTER</font>
        </marquee>
    </font>

    
    </div> 
    </div>
  );
}



export default navbar;
