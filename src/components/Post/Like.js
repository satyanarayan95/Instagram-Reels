import React, { useState, useEffect } from 'react'
import { database } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "../Styles/Like.css"
import FavoriteIcon from '@material-ui/icons/Favorite';
const useStyles = makeStyles({
  
    likeBubble: {
        color: '#3f3f41',
        cursor: 'pointer',
        fontSize: '32px',
    },
    icon: {
        // backgroundColor: "red"
        // position: "absolute",
        // bottom: "-5vh",
        // fontSize: "2rem",
        color: '#3f3f41',
        cursor: 'pointer',
        fontSize: '32px',
    },
    heart: {
        left: "25vw",
    },
    notSelected: {
        color: "lightgray"
    }
    ,
    selected: {
        color: "red"
    }
})

function Like({ userData , postData , currentUserObj }) {
    // console.log(userData);
    // console.log(postData);
    console.log(currentUserObj);
    const classes = useStyles();
    const [isLiked, setLiked] = useState(false);
    const [CurrentUserObj,setCurrentUserObj]=useState("");

  
   const handleLike =async (postid)=>{
       console.log(postid);
       let postRef=await database.posts.doc(postid).get();
       let post=postRef.data();
       console.log(post);
       let likes=post.Likes;
       console.log(likes);
 
       if(isLiked==false){
           database.posts.doc(postid).update({
               "likes":[...likes,currentUserObj.Uid]
           })
       }
       else{
           let likes=post.likes.filter(lkuid=>{
               return lkuid !=currentUserObj.Uid;
           })
           database.posts.doc(postid).update({
               "likes":likes
           })
       }
       setLiked(!isLiked);

   }
    // useEffect(() => {
    //     let check = postData?.Likes.includes(userData?.Uid) ? true : false;
    //     setLiked(check);
    // }, [])

    return (
        <div className='like' style={{ display:'flex', justifyContent:'flex-start'}}>
            {/* {
                like != null
                    ? <>{like == false
                        ? <><FavoriteBorderIcon className={classes.unlike} onClick={handleLike} /> </>
                        : <><FavoriteIcon className={classes.like} onClick={handleLike} /></>
                    }</>
                    : <></>
            } */}
             {/* <FavoriteBorderIcon className={[classes.icon, classes.heart, isLiked == false ? classes.notSelected : classes.selected]}
                                onClick={() => { handleLike(postData.PostId) }}
                            ></FavoriteBorderIcon> */}
          <FavoriteIcon
          className={[classes.icon,classes.heart  ,isLiked==false? classes.notSelected  : classes.selected ]}
          onClick={()=>{handleLike(postData.PostId)}}
          />

        </div>
    )
}

export default React.memo(Like)
