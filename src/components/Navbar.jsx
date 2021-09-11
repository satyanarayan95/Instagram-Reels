import React from 'react'
import { NavLink,useHistory } from 'react-router-dom'
import auth from '../firebase';
import Avatar from '@material-ui/core/Avatar';
import UploadVideoFile from '../components/Post/UploadVideoFile';
export default function Navbar(props) {
  
  const loggedIn = localStorage.getItem("isSignin");
  const history=useHistory();
  async function signOut(e) {
    e.preventDefault();
    localStorage.removeItem("isSignin");
    history.push("/login");
    return await auth.signOut();
  }
  async function profile(e) {
    e.preventDefault();
    history.push("/profile");
  }
  async function feed(e) {
    e.preventDefault();
    history.push("/");
  }
  

    return (
      <header className="flex justify-between h-16 px-10  items-center border-b border-gray-200 shadow-lg drop-shadow-md ">
        <div className="flex items-center space-x-8">
          <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
          className="object-contain h-12 w-48"
          alt=""
          />
        </div>
      <div className="flex  h-full items-center space-x-3">
      {window.location.pathname =="/" ?
      <button className=" bg-white px-4 py-2 rounded-lg  font-bold font-sans text-gray-500  hover:text-gray-800  text-sm" onClick={e=>profile(e)}>Profile</button>
      : <button className=" bg-white px-4 py-2 rounded-lg  font-bold font-sans text-gray-500  hover:text-gray-800 border text-sm" onClick={e=>feed(e)}>Feed</button>
    }
      
      <button className=" bg-white px-4 py-2 rounded-lg  font-bold font-sans text-gray-500  hover:text-gray-800 text-sm" onClick={e=>signOut(e)}>SignOut</button>
      </div>
      <div className="flex  h-full items-center space-x-2">
      <div className="truncate ... max-w-40  text-gray-600 font-bold font-sans">{props.userName}</div>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" key={props.key} src={props.src} />
      </div>
      </header>
    )
}
