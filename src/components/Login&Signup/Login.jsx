import {
  Button,
  FilledInput,
  InputAdornment,
  InputLabel,
  makeStyles,

  Typography,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { FormControl, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

import wordLogo from "../images/word_logo.png";

import "../Styles/Signup.css";
import { Link, useHistory } from "react-router-dom";
import auth from "../../firebase";
// import { auth } from "firebase";

console.log(auth)

const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    textField: {
        borderColor: 'grey'
    },
    resize: {
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: "700",
        color: "#4e4a4a"
    },
    uploadBtn: {
        width: 290,
        borderRadius: '32px',
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

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  const history=useHistory();
    const [values, setValues] = React.useState({
        showPassword: false
    });

    const classes = useStyles();

 const handleLogin= (e)=>{
    e.preventDefault();
 
     try{
 
    setLoading(true);
    auth.signInWithEmailAndPassword(email,password).then((authUser)=>{
          localStorage.setItem("isSignin",true);
          history.push("/")
          console.log(authUser);
      
    })
      setLoading(false);
      history.push("/");


     }
     catch(e){
        //  setError(e.message);
        //  setTimeout(()=>setError(""),2000)
        //  setLoading(false)
        setError(true);
        setLoading(false);
        setEmail("");
        setPassword("")

     }

 }


 const handleClickShowPassword= ()=>{
      setValues({...values,showPassword:!values.showPassword});

 }
    return (
        <div className='body'>
            <div className="glass">
                <div className='main_card'>
                    <div className='card_1'>
                        {/* <img src={mainImage} alt='' className='logImage'></img> */}
                    </div>

                    <div className='card_2'>
                        <div className='reelify_logo'>
                            <img src={wordLogo} alt='Logo'></img>
                            <div className="signupLogo">
                                {/* <img src={logo} alt='Logo' ></img> */}
                            </div>

                        </div>
                       
                        <form  onSubmit={handleLogin} className='user_data'>
                            {/* <h4 className='subHeaderLogin'>Login</h4> */}
                            <Typography variant="h3" color="Primary"  >Login</Typography>
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
                                <Button
                                    className={classes.btn}
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    type='submit'
                                   >
                                
                                    Login
                                </Button>
                            </div>
                            {error ? <h4 className='loginError'>{error}</h4> : <></>}
                            <div className='card_3' >
                                <Link to="/signup" >
                                <h5  className='routing' >New User ? SignUp</h5>
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Login
