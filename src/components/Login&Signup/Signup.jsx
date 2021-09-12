import React, {useState} from 'react'
import auth, {storage, database} from '../../firebase';
import { Link ,useHistory} from 'react-router-dom'
export default function Signup() {

    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');

    const history=useHistory()


    function handlFileSubmit(e) {
        let file = e?.target?.files[0];
        if (file != null) {
            // console.log(e.target.files[0])
            setProfilePic(e.target.files[0]);
        }
    }

    
    async function handleSignup(e){
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
             //   console.log(response);
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

    return (
        <>
            <div className=" min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div class="bg-white px-6 py-8 rounded shadow-lg text-black w-full">
                <form onSubmit={handleSignup}>
                <div className="flex items-center justify-centerg">
          <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
          className="object-contain h-12 w-48"
          alt=""
          />
          </div>
                    <div className="flex flex-col">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Fullname
                      </label>
                      <input
                      name="username"
                     type="text"
                     placeholder="Enter your fullname"
                     value={fullName}
                     onChange={(e)=>setFullName(e.target.value)}
                     className="block border-b-2 border-grey-light w-full p-3 rounded mb-4 focus:outline-none"
                     />
                    </div>
                    <div className="flex flex-col">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                      name="username"
                     type="text"
                     placeholder="Enter your username"
                     value={userName}
                     onChange={(e)=>setUserName(e.target.value)}
                     className="block border-b-2 border-grey-light w-full p-3 rounded mb-4 focus:outline-none"
                     />
                    </div>
                    <div className="flex flex-col">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                      name="email"
                     type="text"
                     placeholder="Enter your email id"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     className="block border-b-2 border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:border-rose-500"
                     />
                    </div>
                    <div className="flex flex-col">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 focus:outline-none">
                        Password
                      </label>
                      <input
                      name="password"
                     type="text"
                     placeholder="Enter your password"
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     className="block border-b-2 border-grey-light w-full p-3 rounded mb-4 focus:outline-none"
                     />
                    </div>

                    
                     
                            <input type="file" id="actual-btn" 
                             onChange={(e) => { handlFileSubmit(e) }}
                            hidden/>
                            <label for="actual-btn"
                            className=" text-center inline-block w-full h-13 bg-blue-500 text-white font-bold  p-2 mb-2 border rounded-md drop-shadow-md hover:scale-y-150 hover:bg-white hover:text-blue-500 border-gray-200"
                            >Upload Profile Image</label>
                    <button
                        disabled={loading}
                        type="submit"
                        class="w-full text-center py-3 rounded bg-pink-500 text-white  focus:outline-none my-1 hover:bg-white hover:text-pink-500 border border-gray-200"
                    >Create Account</button>

                    {error ? <h4 className=' text-red-500'>{error}</h4> : <></>}

                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <Link class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </Link> and 
                        <Link class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </Link>
                    </div>
                    
                </form>
                </div>
                <div class="text-grey-dark mt-6">
                    Already have an account? 
                    <Link class="no-underline border-b border-blue-600 text-blue-600" to="/login">
                        Log in
                    </Link>.
                </div>
                </div>
                
            </div>
        </>
    )
}
