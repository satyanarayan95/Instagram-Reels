import { Avatar, CardContent, CardHeader, Dialog, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "../Styles/Post.css"
import Video from './Video';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Like from './Like';
import AddComments from './AddComments';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import LoadingIcon from '../images/loading1.gif'
import { database } from '../../firebase';
import Comments from './Comments';


const useStyles = makeStyles((theme) => ({
    chatBubble: {
        color: '#3f3f41',
        cursor: 'pointer',
        fontSize: '32px',
    },
    typo: {
        marginLeft: '2%',
        marginTop: "0",
        display: 'flex'
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        margin: '8px',
        boxShadow: '0 3px 9px rgba(65, 64, 64, 0.2), 0 8px 15px rgba(0,0,0,.2)'
    },
    postDialogBox: {
        background: "rgba(222, 215, 240, 0.486)",
    },
    dialogHeader: {
        height: "11%",
    },
    dialogComments: {
        height: "67%",
        fontFamily: "'Nunito', sans-serif",
        overflow:'auto'
    },


}))

function Post({userData,currentUserObj}) {
    // console.log(currentUserObj);
    // console.log(props);
    const [posts, setPost] = useState(null);
    const classes = useStyles();
    const [openId, setOpenId] = useState(null);
    

    const handleClickOpen = (id) => {
        setOpenId(id);
    };

    const handleClose = () => {
        setOpenId(null);
    };
    const callbacks = enteries => {
        enteries.forEach(element => {
            let el = element.target.childNodes[0];
            console.log(el);
            el.play().then(() => {
                if (!el.paused && !element.isIntersecting) {
                    el.pause();
                }
            })
        })
    }

    const observer = new IntersectionObserver(callbacks, { threshold: 0.8 }); 
    useEffect(() => {
        let postArr = [];
        let unsbs = database.posts.orderBy('CreatedAt', 'desc').onSnapshot(allPostSnap => {
            console.log(allPostSnap);
            postArr = [];
            allPostSnap.forEach(doc => {
                let obj = { ...doc.data(), PostId: doc.id };
                postArr.push(obj);
            })
            setPost(postArr);
        })
        return unsbs;
    }, [])
    useEffect(() => {
        let videos = document.querySelectorAll(".video .postMedia");
        videos.forEach(el => {
            console.log(el);
            observer.observe(el);
        })
        return () => {
            observer.disconnect();
        }
    }, [posts]);
    console.log(posts);
    return (
        <>
        {
            posts == null ?
                <div className='feedLoading'>
                    <img src={LoadingIcon} />
                </div> :
                < div className=' w-full flex flex-col justify-center items-center rounded-2xl' >
                    {posts.map((post, index) => (
                        <React.Fragment key={index}>
                            <div className={`post ${post.Type}`}>
                                <div className=' h-14 w-full flex mb-2 border-b-2 border-gray-100 pl-3'>
                                    <Avatar className={classes.large} alt="profile image" src={post.UserProfile} ></Avatar>
                                    <h3 className='h-full mx-2 mb-3 font-bold text-gray-500 flex items-center justify-center'>{post.UserName} </h3>
                                </div>

                                <div className='postMedia' >
                                     <Video source={post.PostUrl} />
                                </div>

                                <div className=' h-28 w-full flex flex-col rounded-xl p-2'>
                                    <div className=' h-1/3 flex items-center p-0'>
                                        <Like userData={userData} currentUserObj={currentUserObj} postData={post} className={`${classes.postLike} iconStyling`} />
                                        <ChatBubbleOutlineIcon className={`${classes.chatBubble} iconStyling`} onClick={() => handleClickOpen(post.PostId)} />
                                    </div>
                                    <div className=' h-1/4 w-full border-t-2 border-gray-100 flex items-center justify-center mt-3'>
                                        <AddComments userData={userData} postData={post} currentUserObj={currentUserObj} />
                                    </div>
                                    <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId == post.PostId}>
                                        <MuiDialogTitle className={classes.postDialogBox} elevation={0}>
                                            <div className='dialogContainer'>
                                                <div className='media-part'>
                                                    {post.Type == 'image'
                                                        ? <>
                                                            <img src={post.PostUrl} loading='eager' className='dialogVideo'></img>
                                                        </>
                                                        : <>
                                                            <video autoPlay={true} className='dialogVideo' controls id={post.PostId} muted="muted" type="video/mp4" loop >
                                                                <source src={post.PostUrl} type="video/webm" />
                                                            </video>
                                                        </>
                                                    }
                                                </div>
                                                <div className='info-part'>
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar src={post?.UserProfile} aria-label="recipe" className={classes.avatar}>
                                                            </Avatar>
                                                        }
                                                        title={post?.UserName}
                                                        className={classes.dialogHeader}
                                                    />

                                                    <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                                    <CardContent className={classes.dialogComments}>
                                                        <Comments userData={userData} postData={post} currentUserObj={currentUserObj}/>
                                                    </CardContent>

                                                    <div className='extra'>
                                                        <div className='likes'>
                                                            <Like userData={userData} postData={post} currentUserObj={currentUserObj} />
                                                            <Typography className={classes.typo} variant='body2'>{post.Likes.length} Likes</Typography>
                                                        </div>
                                                        <div className='profileCommentBox'>
                                                            <AddComments userData={userData} postData={post} currentUserObj={currentUserObj}  />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </MuiDialogTitle>
                                    </Dialog>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div >
        }
    </>
    )
}

export default Post


