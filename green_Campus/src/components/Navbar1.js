import "./styles/navbar.css";
import { useState, useRef, useEffect } from "react";
import { useLocation ,Link} from "react-router-dom";
import Auth from '../utils/auth';

const Navbar = () => {
  const tempLocation = useLocation();
  const location = tempLocation.pathname;
  const newRef = useRef(null);
  const [sidebarActive, setsidebarActive] = useState(false);
  const [active, setactive] = useState("");
  const [clicked, setclicked] = useState(false);
  const handleClick = () => {
    setclicked(true);
  };
  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setsidebarActive(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });
  return (
    <nav className="navbar ">
      <Link to={"/"} className="left p-2 ">
        <img src="" alt="Logo" className="logo " />
      </Link>

      <div className={`sidebar `} ref={newRef}>
        <div
          className={`${sidebarActive ? "hidden" : ""} cut hover:cursor-pointer`}
          onClick={() => {
            setsidebarActive(!sidebarActive);
          }}
        >
          <img src="" alt="cut" />
        </div>
        <div className={`${sidebarActive ? "" : "hidden"} sidebar1`}>
          <Link to="/"
            className={`${location === "/" ? "active" : ""} side-item`}
            onClick={() => {
              setsidebarActive(!sidebarActive);
            }}
          >
            Home
          </Link>
          <Link to="/about"
            className={`${location === "/about" ? "active" : ""} side-item`}
            onClick={() => {
              setsidebarActive(!sidebarActive);
            }}
          >
            About
          </Link>
          <Link to="/calculate"
            className={`${location === "/calculate" ? "active" : ""} side-item`}
            onClick={() => {
              setsidebarActive(!sidebarActive);
            }}
          >
            Calculate
          </Link>
          <Link to="/volunteer"
            className={`${location === "/volunteer" ? "active" : ""} side-item`}
            onClick={() => {
              setsidebarActive(!sidebarActive);
            }}
          >
            Volunteer
          </Link>
          <Link to="/login"
            className={`${location === "/login" ? "active" : ""} side-item`}
            onClick={() => {
              setsidebarActive(!sidebarActive);
            }}
          >
            Login
          </Link>
        </div>
      </div>
      <div className="right">
        <Link to={"/about"} className={`${location === "/about" ? "active" : ""} nav-item`}>
          About
        </Link>
        <Link to={"/calculate"} className={`${location === "/calculate" ? "active" : ""} nav-item`}>
          Calculate 
        </Link>
        <Link to={"/volunteer"} className={`${location === "/volunteer" ? "active" : ""} nav-item`}>
          Volunteer
        </Link>
        <Link to={"/login"} className={`${location === "/login" ? "active" : ""} nav-item`}>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
