import React, {  useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Calculator from "./pages/Calculator";
import MyFootprint from "./pages/MyFootprint";
import MyPledges from "./pages/MyPledges";
import NoMatch from "./pages/NoMatch";
//import Donation from './pages/Donation';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import AlertState from "./Context/Alert/AlertState";
// import Alert from './components/Alert'
import Dashboard from "./pages/Dashboard";
import Energy from "./components/Energy";
import Waste from "./components/Waste";
import BookComponent from "./components/BookComponent";
// import ApexChart from './components/ApexChart';
// import { ToastContainer } from "react-toastify";
import Loader from "./components/LoadingSpinner";
import LoaderContext from './Context/LoaderContext'
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [isLoading, setisLoading] = useState(false);
  return (
    <ApolloProvider client={client}>
      <LoaderContext.Provider value={{setisLoading}}>
        <Router>
          <AlertState>
            <Navbar />
            {isLoading ? <Loader /> : <></>}
            {/* <div className="spacing1"></div> */}

            {/* <Alert open1={true}/> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/energy" element={<Energy />} />
              <Route path="/waste" element={<Waste />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/slogan" element={<BookComponent />} />
              <Route path="/myfootprint" element={<MyFootprint />} />
              <Route path="/mypledges" element={<MyPledges />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </AlertState>
        </Router>
      </LoaderContext.Provider>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
