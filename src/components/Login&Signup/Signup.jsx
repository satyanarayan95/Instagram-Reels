import {
    Button,
    FilledInput,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
    Typography,
  } from "@material-ui/core";
  import { IconButton } from "@material-ui/core";
  import { FormControl, TextField } from "@material-ui/core";
  import { Visibility, VisibilityOff } from "@material-ui/icons";
  import React, { useState } from "react";
  import CloudUploadIcon from '@material-ui/icons/CloudUpload';
  import "../Styles/Signup.css";
  import wordLogo from "../images/word_logo.png";
import { Link, useHistory } from "react-router-dom";
import auth, { storage,database } from "../../firebase";

// import { storage } from "firebase";



  const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    resize: {
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: "700",
        color: "#4e4a4a"
    },
    uploadBtn: {
        width: 290,
        color: '#6e666e',
    },
    btn: {
        background: "#EC4899",
        width: '100%',
        height: 50,
        borderRadius: '32px',
        boxShadow: '0px 10px 14px -7px #ab75d9',
        // backgroundColor: '#a06ded',
        // color: '#ffffff'
    }
}));


function Signup() {

    const classes = useStyles();
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        showPassword: false
    });
    const history =useHistory();
    function handleProfilePicSubmit(e){
        let file =e.target.files[0]
        if(file){
            setProfilePic(file);
        }
    }
     async function handleSignUp(e){
       e.preventDefault();
       setLoading(true);
       try{
       auth.createUserWithEmailAndPassword(email, password).then((authUser)=>{
           console.log(authUser);
           let uid=authUser.uid
           console.log(uid);
           const uploadTaskListener=storage.ref(`/users/${uid}/profile picture`).put(profilePic);
           uploadTaskListener.on("state_changed",fn1,fn2,fn3);
           function fn1(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is "+progress+"% done");
           }
           function fn2(error){
               setError(error);
               setTimeout(()=>{setError("")},3000);
               setLoading(false);
           }
         async  function fn3(){
                let downloadUrl=await uploadTaskListener.snapshot.ref.getDownloadURL();

                await database.users.doc(uid).set({
                    Username:userName,
                    Full_Name:fullName,
                    Uid:uid,
                    Email:email,
                    ProfileUrl:downloadUrl,
                    Posts:[],
                    Bio:"Add Bio",
                    Created_At:database.getCurrentTimeStamp()
                })
                setLoading(false);
                history.push("/login")
           }

       })

       }
       catch(e){
           setError(e.message);
           setTimeout(()=>{setError("")},3000);
           setLoading(false);
       }

    }
    const handleClickShowPassword= ()=>{
        setValues({...values,showPassword:!values.showPassword});
  
   }
 
    function handleRouting(){
     history.push("/login")

    }
    return (
        <div className="body">
            <div className="glass">
                <div className="main_card">
                     <div className="card_4">
                     <div className='reelify_logo'>
                            <img src={wordLogo} alt='Logo'></img>
                            <div className="signupLogo">
                                {/* <img src={logo} alt='Logo' ></img> */}
                            </div>

                        </div>
                        <form onSubmit={handleSignUp} className='user_data'>
                        <Typography variant="h3" color="Primary"  >Signup</Typography>
                            <div className='inputfield'>
                                <TextField
                                    id="filled-basic"
                                    label="Full Name"
                                    variant="filled"
                                    fullWidth
                                    color='primary'
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className='inputfield'>
                                <TextField
                                    id="filled-basic"
                                    label="Username"
                                    variant="filled"
                                    fullWidth
                                    color='primary'
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className='inputfield'>
                                <TextField
                                    id="filled-basic"
                                    label="Email"
                                    variant="filled"
                                    fullWidth
                                    color='primary'
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='inputfield'>
                            <FormControl variant="filled" fullWidth color='primary'>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <FilledInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                </FormControl>
                            </div>

                            <div className='buttons'>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleProfilePicSubmit}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        className={classes.uploadBtn}
                                        variant="outlined"
                                        component="span"
                                        startIcon={<CloudUploadIcon />}
                                        size='large'
                                    >
                                        Profile Picture
                                    </Button>
                                </label>
                            </div>
                            <div className='buttons'>
                                <Button

                                    className={`${classes.btn} logBtn`}
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    type='submit'
                                >
                                    Sign Up
                                </Button>
                            </div>
                            {error ? <h4 className='loginError'>{error}</h4> : <></>}
                         
                            <div className='card_3' style={{ justifyContent: 'flex-start' }}>
                              
                                <h5 onClick={handleRouting} className='routing'>Already a Member?  Login</h5>
                                
                            </div>
                           
                        </form>

                     </div>

                </div>

            </div>
            
        </div>
    )
}

export default Signup
