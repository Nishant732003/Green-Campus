import { useState, useContext, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import AlertContext from "../Context/Alert/AlertContext";
import LoaderContext from "../Context/LoaderContext";

export default function SignUp() {
  const navigate = useNavigate();
  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate("/");
    }
  });
  const context = useContext(AlertContext);
  const { setnotificationMsg } = context;
  const context1 = useContext(LoaderContext);
  const { setisLoading } = context1;
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error }] = useMutation(ADD_USER);
  console.log(error);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setisLoading(true);
    // use try/catch instead of promises to handle errors
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      setnotificationMsg("Sign Up Successfull");
      navigate("/calculator");
    } catch (e) {
      setnotificationMsg(e.message);
      console.error(e.message);
    }
    setisLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-[#d1d1d1]">
        <div>
          <h3 className="text-4xl font-bold text-purple-600">Sign Up</h3>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-[#efefef] shadow-md sm:max-w-lg sm:rounded-lg">
          <form className="p-3">
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-700 undefined"
              >
                Name of the College
              </label>
              <div className="flex flex-col items-start">
                <input
                  required={true}
                  type="text"
                  name="username"
                  value={formState.username}
                  onChange={handleChange}
                  className="p-2 bg-[#f9f9f9] block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  required={true}
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="p-2 bg-[#f9f9f9] block w-full mt-1 border-gray-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  required={true}
                  type="password"
                  onChange={handleChange}
                  value={formState.password}
                  name="password"
                  className="p-2 block w-full bg-[#f9f9f9] mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <button
                onClick={handleFormSubmit}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <Link className="text-purple-600 hover:underline" to="/login">
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
