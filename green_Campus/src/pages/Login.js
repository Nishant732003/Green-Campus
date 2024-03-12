import { useState, useContext, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import AlertContext from "../Context/Alert/AlertContext";
import bgSignIn from "../assets/images/bg-home.jpg";
import LoaderContext from "../Context/LoaderContext";

export default function SignIn() {
  
  const navigate = useNavigate();
  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate("/");
    }
  });
  useEffect(() => {
    setisLoading(true);
  
    // eslint-disable-next-line
  }, [])
  
  const contextAlert = useContext(AlertContext);
  const { setnotificationMsg } = contextAlert;
  const context = useContext(LoaderContext);
  const { setisLoading } = context;

  const [formState, setFormState] = useState({ email: "", password: "" });
  // eslint-disable-next-line
  const [login, { error }] = useMutation(LOGIN);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setisLoading(true);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);

      setnotificationMsg("Login Successfull");
      navigate("/calculator");
    } catch (e) {
      setnotificationMsg(e.message);

      console.error(e.message);
    }
    setisLoading(false);
    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
  return (
    <div className="loginContainer">
      <img src={bgSignIn} alt="" className="bgLoginImg" onLoad={()=>{setisLoading(false)}} />
      <div className="formLogin absolute flex flex-col justify-center  overflow-hidden ">
        <div className=" formLoginInside  w-full p-[20px] m-auto  rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 ">
            Sign in
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-md font-semibold text-black"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-md font-semibold text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <a
              href="/login"
              className="text-xs text-purple-600 hover:underline"
            >
              Forget Password?
            </a>
            <div className="mt-6">
              <button
                onClick={handleFormSubmit}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-white">
            {" "}
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-purple-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
