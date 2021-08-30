import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import Alert from '@material-ui/lab/Alert';
import { v4 as uuidv4 } from 'uuid'
import auth, { database, storage } from '../../firebase';


const useStyles = makeStyles((theme) => ({
    videoBtn: {
        height: '100%',
        width: '100%',
        fontFamily: `'Nunito', sans-serif`,
        fontWeight: 100,
    },
    progress: {
        position: 'absolute',
        bottom: '60px'
    },
    alertBox:{
        position:'absolute',
        bottom: '60px',
    }

}));

function UploadVideoFile(props) {

    console.log(props);
   

  

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [CurrentUserObj,setCurrentUserObj]=useState("");
    const type = ['video/mp4', 'video/webm', 'video/ogg']

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

    const handleVideoFile=(e)=>{
       const file=e?.target?.files[0];
       if(!file){
           setError("please select a file");
           setTimeout(()=>{
               setError(null)

           },2000)
           return
       }

       if (type.indexOf(file.type) == -1) {
        setError("Please select a video file.");
        setTimeout(() => {
            setError(null)
        }, 2000)
        return
    }

    if (file.size / (1024 * 1024) > 100) {
        setError("The file size is too big to upload");
        setTimeout(() => {
            setError(null);
        }, 2000)
        return
    }
    try{
        setLoading(true);
        const id=uuidv4();
        let userUid= props.userData;
        console.log(userUid);
        const uploadVideoTask=storage.ref(`/posts/${CurrentUserObj.Uid}/videos/${file.name}`).put(file);
        uploadVideoTask.on("state_changed",fn1,fn2,fn3);
        function fn1(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');  // tell us the percent of work completed
        }
        function fn2(error) {
            setError(error);
            setTimeout(() => {
                setError(null)
            }, 2000);
            setLoading(false)
        }
        async function fn3() {
            const videoURL = await uploadVideoTask.snapshot.ref.getDownloadURL();
         await database.posts.add({    
                PostId: id,
                PostUrl: videoURL,
                Type: "video",
                UserId: `${CurrentUserObj.Uid}`,
                UserName:`${CurrentUserObj.Full_Name}`,
                UserProfile: `${CurrentUserObj.ProfileUrl}`,
                Comment: [],
                Likes: [],
                CreatedAt: database.getCurrentTimeStamp()
            })
            // const res = await database.users.doc(finalUserUid).update({
            //     Posts: [...props.userData.Posts, docRef.id]
            // })


            setLoading(false);
        }

    }
    catch(e){
        setError(e);
        setTimeout(() => {
            setError(null);
        }, 2000);
        setLoading(false);
    }
    }

    return (
        <>
        {loading ? <CircularProgress className={classes.progress} /> : <></>}
        <div className='upload' style={{width:'50%'}}>
            {error != null ? <Alert severity="error" className={classes.alertBox}>{error}</Alert> : <>
                <input
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    onChange={handleVideoFile}
                />
                <label htmlFor="icon-button-file" style={{width:'100%'}}>
                    <Button
                        className={classes.videoBtn}
                        component="span"
                        size='medium'
                        disabled={loading}
                        startIcon={<VideocamRoundedIcon style={{ fontSize: 35, color: 'whitesmoke' }} />}
                    >
                    </Button>
                </label>
            </>
            }
        </div>
    </>
    )
}

export default UploadVideoFile
