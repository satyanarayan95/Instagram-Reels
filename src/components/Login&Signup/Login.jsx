import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../../firebase";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const history = useHistory();
  const handleLogin = async (e) => {
    // alert(email + password);
    e.preventDefault();
    try {
      // async
      setLoader(true);
      auth.signInWithEmailAndPassword(email, password).then((authUser) => {
        localStorage.setItem("isSignin", true);
        history.push("/");
        console.log(authUser);
      });
      history.push("/");
    } catch (err) {
      setError(true);
      setEmail("");
      setPassword("");
    }
    setLoader(false);
  };

  return (
    <div className="flex mx-auto max-w-screen-md items-center max-h-screen  mt-10 bg-lightgrey-100 rounded shadow-lg text-black w-full">
      <div className="flex w-3/5">
        <img
          src="https://github.com/karlhadwen/instagram/blob/master/public/images/iphone-with-profile.jpg?raw=true"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="focus:outline-none shadow-inner text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="  focus:outline-none shadow-inner text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
        
            <button
              type="submit"
              className=" bg-pink-500 text-white w-full rounded h-8 font-bold"
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to="/signup" className="font-bold text-blue-600 underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
