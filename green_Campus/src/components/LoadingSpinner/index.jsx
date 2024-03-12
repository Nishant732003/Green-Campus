import React from "react";
import "./spinner.css";
import loaderImg from './assets/ZZ5H.gif'
export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      {/* <div className="loading-spinner"></div> */}
      <img src={loaderImg} alt="" className="loading-spinner2 "/>
    </div>
  );
}