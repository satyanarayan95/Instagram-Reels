import { IconButton, makeStyles, MenuItem } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create';
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import "../Styles/Feed.css"
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import LoadingIcon from "../images/loading1.gif"
import auth, { database } from '../../firebase';
import NaviBar from './NaviBar';
import { useHistory } from 'react-router-dom';
import UploadVideoFile from '../Post/UploadVideoFile';
import Profile from '../Profile/Profile';
import Post from '../Post/Post';
import firebase from 'firebase';
import { collection, getDocs } from "firebase/firestore"; 


const useStyles = makeStyles((theme) => ({
    editIcon: {
        fontSize: '15px',
        margin: '0 5px'
    }
}))

function Feed() {
    const classes = useStyles();
    const [userData, setUserData] = useState(null);
    // const [currentUser,setcurrentUser]=useState("");
    // const [CurrentUserUID,setCurrentUserUID]=useState("")
    const [CurrentUserObj,setCurrentUserObj]=useState("");
    const [profile, setProfile] = useState(false);
    const [edit, setEdit] = useState(false);
    // const { currentUser } = useContext(AuthContext);
    const [editBio, setEditBio] = useState('');
    const [editUsername, setEditUsername] = useState("");
    // const { logout, deleteAccount } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const boxopen = Boolean(anchorEl);
   const history=useHistory();
    // useEffect(() => {
      
    //  }, []);
  
 

    
// console.log(CurrentUserObj);
useEffect(()=>{
    auth.onAuthStateChanged(async (user)=>{
        console.log("hello");
         if (user){
         
        await database.users.doc(user.uid).get().then((doc)=>{
             // console.log(doc.data());
           let  AuthCurrentUserObject =doc.data();
          console.log(AuthCurrentUserObject);
      
          setCurrentUserObj(AuthCurrentUserObject);
    
           
         })
            
         }
         else{
             console.log("none");
         }
     })


},[])
    console.log(CurrentUserObj);
 
     useEffect(async() => {
         await database.users.onSnapshot(async (Snapshot)=>{
             setUserData(Snapshot.docs.map((doc)=>doc.data()));
             
           
         })

        // console.log(userData);
         
    }, [])


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handleDeleteAcnt(){


    }

    
  
    const handleCloseBox = () => {
        setAnchorEl(null);
    };
    async function signOut(e) {
        e.preventDefault();
        localStorage.removeItem("isSignin");
        history.push("/login");
        return await auth.signOut();
      }
  
//     console.log(userData); 
//  console.log(CurrentUserUID)

 
    return (
        <>
        <div className='feedBody'>
            <div className='bodyArea'>
                {
                    userData == null
                        ? <div className='feedLoading'>
                            <img src={LoadingIcon} />
                           
                        </div>
                        : <>
                            <div className='naviBar' >
                                <NaviBar userData={userData} />
                            </div>

                            <div className='feed'>
                                <div className='feedLeftCompo'>
                                    <div className='pboxOption'>
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={boxopen}
                                            onClose={handleCloseBox}
                                        >
                                            <MenuItem onClick={signOut}>Logout</MenuItem>
                                            {/* <MenuItem onClick={handleDeleteAcnt}>Delete Account</MenuItem> */}
                                        </Menu>
                                    </div>

                                    {profile
                                        ? <>
                                            <div className='pbox1'>
                                                <div className='pPageimgbox'>
                                                    <img  className='pPageimg'></img>
                                                </div>
                                            </div>

                                            <div className='pbox2'>
                                                <div className='pbox21' contentEditable={edit} suppressContentEditableWarning={true}
                                                    onBlur={(e) => { setEditUsername(e.target.innerText) }}
                                                >
                                                    {edit
                                                        ? <CreateIcon className={classes.editIcon} />
                                                        : <></>
                                                    }
                                                    <h5 className='pbox211' >{userData.Username}</h5>
                                                </div>
                                                <div className='pbox22'>
                                                    <div className='editBtn' onClick={() => setEdit(!edit)}>Edit</div>
                                                </div>
                                                <div className='pbox23'>
                                                    <h5 className='pbox231'>{userData.Posts.length} Posts</h5>
                                                </div>
                                            </div>

                                            <div className='pbox3'>
                                                <div className='pbox31'>
                                                    <h5 className='pbox311' >{userData.Full_Name}</h5>
                                                </div>
                                                <div style={{ display: 'flex', height: '80%' }}>
                                                    {edit
                                                        ? <CreateIcon className={classes.editIcon} />
                                                        : <></>
                                                    }
                                                    <div className='pbox32' contentEditable={edit} suppressContentEditableWarning={true}
                                                        onBlur={(e) => { setEditBio(e.target.innerText) }}
                                                    >

                                                        {userData.Bio}
                                                    </div>
                                                </div>
                                            </div>

                                            {edit
                                                ?
                                                <div className='pbox4'>
                                                    {/* <div className='editBtn' onClick={(e) => { handleSave(e); setEdit(!edit) }}>Save</div> */}
                                                </div>
                                                :
                                                <></>
                                            }
                                        </>
                                        : <>
                                            <div className='leftFeedPic'>
                                                                        
                                            <img
                                                 key={CurrentUserObj.Uid}
                                                 className="leftFeedimg"
                                                  src={CurrentUserObj.ProfileUrl}
                                                  alt="profile pic"
                                                 />
                                            </div>
                                            <h3 className='leftFeedUserName' onClick={() => { setProfile(true) }}>{CurrentUserObj.Full_Name}</h3>
                                        </>
                                    }
                                    <div className="uploadBtns">
                                        {/* <UploadImageFile userData={userData} /> */}
                                        <UploadVideoFile userData={userData} />
                                    </div>

                                </div>

                                <div className='feedsArea'>
                                    <div className='backBtn'>
                                        {profile == true ? <ArrowBackRoundedIcon onClick={() => { setProfile(false) }} className='backArrow' /> : <></>}
                                    </div>

                                    {profile == true ? <Profile userData={userData} /> : <Post userData={userData} />}
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    </>
    )
}

export default Feed
