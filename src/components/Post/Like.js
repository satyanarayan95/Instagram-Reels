import React, { useState} from 'react'
import { database } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import "../Styles/Like.css"
import FavoriteIcon from '@material-ui/icons/Favorite';
const useStyles = makeStyles({
  
    likeBubble: {
        color: '#3f3f41',
        cursor: 'pointer',
        fontSize: '32px',
    },
    icon: {
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
    // console.log(currentUserObj);
    const classes = useStyles();
    const [isLiked, setLiked] = useState(false);

  
   const handleLike =async (postid)=>{
       console.log(postid);
       let postRef=await database.posts.doc(postid).get();
       let post=postRef.data();
       console.log(post);
  
           if(isLiked==true){
               let newLikeArr=post.Likes.filter(el=>{
                   return el !=currentUserObj.Uid;
               })
               await database.posts.doc(postid).update({
                   Likes:newLikeArr
               })
           }
           else{
               let newLikeArr=[...post.Likes,currentUserObj.Uid];
               await database.posts.doc(postid).update({
                   Likes:newLikeArr
               })
           }
       setLiked(!isLiked);

   }
  

    return (
        <div className='like' style={{ display:'flex', justifyContent:'flex-start'}}>
          <FavoriteIcon
          className={[classes.icon,classes.heart  ,isLiked==false? classes.notSelected  : classes.selected ]}
          onClick={()=>{handleLike(postData.PostId)}}
          />

        </div>
    )
}

export default React.memo(Like)
