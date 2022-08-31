import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice'
import { useNavigate }  from 'react-router-dom'

import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function UstNabvar({search}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var location = document.URL
  var NewLocation = new URL(location)
  var UrlKey = NewLocation.searchParams.get("key")

  var UserInformation = "";
  var data = "";
  data = localStorage.getItem("token");
  if(data){
    UserInformation = JSON.parse(data).user
  }

  function cikis(){
    dispatch(logout())
    navigate("/")
    window.location.reload()
  }

  function keySearch(e) {
    e.preventDefault();
    const serachKey = document.getElementById("search").value;
    console.log(serachKey);
    if(serachKey.length>=3){
      search(serachKey)
    }else if(serachKey.length==0){
      search(serachKey)
    }
  }

  return (
    <>
      <ToastContainer 
      position="top-right" 
      autoClose={2000} 
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick rtl={false} 
      pauseOnFocusLoss 
      draggable 
      pauseOnHover/>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <a className="navbar-brand" href="/">Hepsi Şurada</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {
            UserInformation ? 
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {UserInformation.name}
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {UserInformation.store_id ? <li><NavLink className="dropdown-item" to="/store">Store Management</NavLink></li> : UserInformation.user_level == 0 ? <li><NavLink className="dropdown-item" to="/admin">Admin Panel</NavLink></li> : <li><NavLink className="dropdown-item" to="/sirket_basvuru">Apply For Store</NavLink></li> }
              <li><hr className="dropdown-divider"/></li>
              <li><a onClick={()=>cikis()} className="dropdown-item">Log Out</a></li>
            </ul>
          </li>
          :
          <>
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/register">Register</NavLink>
          </li></>
          } 
        </ul>
        <form className="d-flex" onSubmit={keySearch}>
          <input name="search" id="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" defaultValue={UrlKey != null ? UrlKey : ""}/>
          <button className="btn btn-outline-success SearchButton">Search</button>
        </form>
      </div>
    </div>
  </nav>
    </>
  )
}

export default React.memo(UstNabvar)