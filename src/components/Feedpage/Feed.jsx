
import React, { useEffect, useState } from "react";
import "../Styles/Feed.css";
import LoadingIcon from "../images/loading1.gif";
import auth, { database } from "../../firebase";
import NavBar from "../Navbar";
import { useHistory } from "react-router-dom";
import UploadVideoFile from "../Post/UploadVideoFile";
import Post from "../Post/Post";



function Feed() {
  
  const [userData, setUserData] = useState(null);
  const [currentUser, setcurrentUser] = useState("");
  const [CurrentUserObj, setCurrentUserObj] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const boxopen = Boolean(anchorEl);
  const history = useHistory();

  // console.log(CurrentUserObj);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setcurrentUser(user);
      if (user) {
        await database.users
          .doc(user.uid)
          .get()
          .then((doc) => {
            // console.log(doc.data());
            let AuthCurrentUserObject = doc.data();
            console.log(AuthCurrentUserObject);

            setCurrentUserObj(AuthCurrentUserObject);
          });
      } else {
        console.log("none");
      }
    });
  }, []);
  console.log(CurrentUserObj);

  useEffect(async () => {
    await database.users.onSnapshot(async (Snapshot) => {
      setUserData(Snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseBox = () => {
    setAnchorEl(null);
  };
  async function signOut(e) {
    e.preventDefault();
    localStorage.removeItem("isSignin");
    history.push("/login");
    return await auth.signOut();
  }

  return (
    <>
      <NavBar
        key={CurrentUserObj.Uid}
        src={CurrentUserObj.ProfileUrl}
        userName={CurrentUserObj.Full_Name}
      />
        <div className="bodyArea">
          {userData == null ? (
            <div className="flex flex-col items-center justify-center h-full w-full">
              <img src={LoadingIcon} />
            </div>
          ) : (
            <div className="flex ">
              <div
                className=" w-1/3 p-3 flex sm:flex-col items-center justify-center sticky left-0 top-0 border-r-2 border-gray-300"
                style={{ height: "calc(100vh - 64px)" }}
              >
                <div className="h-12 w-4/5 flex  justify-center m-6 absolute bg-red-400 shadow-md rounded-2xl">
                  <UploadVideoFile userData={userData} />
                </div>
              </div>
              <Post userData={userData} currentUserObj={CurrentUserObj} />
            </div>
          )}
        </div>
    </>
  );
}

export default Feed;
