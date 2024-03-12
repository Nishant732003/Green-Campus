import AlertContext from "./AlertContext";
import React, { useState ,useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";

const LoginState = (props) => {
  const [notificationMsg, setnotificationMsg] = useState("");
  const notify = () => toast(notificationMsg);

  // const startAlert=(message)=>{
  //   setnotificationMsg(message,()=>{
      
  //   })
    
  // }
  useEffect(() => {
    if(notificationMsg!==""){
      notify();
      setnotificationMsg("")
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationMsg])
  
  return (
    <AlertContext.Provider value={{ notificationMsg, setnotificationMsg }}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      {props.children}
    </AlertContext.Provider>
  );
};

export default LoginState;
