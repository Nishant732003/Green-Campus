import React, { useEffect, useState ,useContext} from "react";
import "../assets/css/home.css";
import { Link } from "react-router-dom";
import MeanCountry from "./assets/js/meanCountry";
import MeanIndividual from "./assets/js/meanIndividual";
import MeanCountryAnnual from "./assets/js/meanCountryAnnual";
import MeanHousehold from "./assets/js/meanHousehold";
import Auth from "../utils/auth";
import bgHome1 from "../assets/images/bg-2.jpg";
import bgHome2 from "../assets/images/bg-mobile.jpg";
import "../styles/home.css";
import LoaderContext from '../Context/LoaderContext'
//import ControlledCarousel from './Slider';

const Home = () => {
  const context=useContext(LoaderContext)
  const {setisLoading}=context
  const [width, setwidth] = useState(window.innerWidth);
  useEffect(() => {
    setisLoading(true)
    
    
    // eslint-disable-next-line
  }, [])
  
  useEffect(() => {
    if (window.innerWidth < 600) {
      setwidth(window.innerWidth);
    }
  }, [width]);

  // const tempLocation=useLocation();
  // const location=tempLocation.pathname
  // const navbarId=document.getElementById("navbarID")
  // if(navbarId){

  //   navbarId.style.backgroundColor = "black";
  // }

  return (
    <>
      <main className="home-main">
        {/* <div className=" m-auto pt-0">
          <Carousel slides={slides} />
        </div> */}
        <div className="bgHome">
          <img
            src={width < 600 ? bgHome2 : bgHome1}
            alt=""
            className="bgHomeImg"
            onLoad={()=>{
              setisLoading(false)
            }}
          />
          <div className="imgText">
            <h1>
              Welcome to <br /> <span>Green Campus</span>
            </h1>
            <h2>
              A Mission to lessen the India's college campuses' carbon <span>footprint</span>.
            </h2>

            <div className="getStartedLink">
              {Auth.loggedIn() ? (
                <Link to="/calculator" className="w-auto">
                  <div className="getStartedBtn">Get Started</div>
                </Link>
              ) : (
                <Link to="/login" className="">
                  <div className="getStartedBtn">Get Started</div>
                </Link>
              )}
            </div>
          </div>
          {/* <div className="absolute bottom-14 lg:bottom-[20%] z-10 text-white flex-column justify-center w-[100%]">
            <section className="home-header ">
              <div className="home-title text-center">
                <h1>
                  Carbon <span>Footsteps</span>
                </h1>
              </div>
            </section>
            <div className="home-tagline flex justify-center items-center">
              <h2 className="text-center">
                Find your carbon <span>footprint</span>.
              </h2>
              {Auth.loggedIn() ? (
                <Link to="/calculator" className="getStartedBtn">
                  Get Started
                </Link>
              ) : (
                <Link to="/login" className="getStartedBtn">
                  Get Started
                </Link>
              )}
            </div>
          </div> */}
        </div>
        <div>
          {/* <section className="home-header">
            <div className="home-title">
              <h1>
                Carbon <span>Footsteps</span>
              </h1>
            </div>
          </section>
          <div className="home-tagline">
            <h2>
              Find your carbon <span>footprint</span>.
            </h2>
          </div> */}
          {Auth.loggedIn() ? (
            <section className="login-btn">
              <Link to="/calculator">
                <button type="submit">Calculate Your Footprint!</button>
              </Link>
            </section>
          ) : (
            <section className="login-btn">
              <Link to="/login">
                <button type="submit">Calculate Your Footprint!</button>
              </Link>
            </section>
          )}
          <div className="intro-text">
            <div className="home-p">
              <div className="home-h3">What is a carbon footprint?</div>
              <p>
                Your carbon footprint is a measurement of your contribution to
                carbon emissions and climate change. Our everyday activities
                produce carbon dioxide and methane through direct causes, like
                driving a gas-powered car, or indirect causes, like using
                electricity in your home. Everyone’s carbon emissions add up and
                cause global climate change.
              </p>
              <br />
              <div className="home-h3 what">What can you do about it?</div>
              <p className="what">
                Small changes add up to a huge global impact. Change starts with
                knowing your own carbon footprint and then changing what you can
                to reduce it.
              </p>
              <p className="home-p2">
                <strong>Calculate</strong> your footprint.{" "}
                <strong>Make a pledge</strong> to change. <strong>Do it</strong>
                . Mark your pledge <strong>complete</strong>.
              </p>
              <div className="home-footer what">
                If you want to say thank you for this free service, donate to
                the organizations who are driving real systemic progress in the
                fight against climate change.
              </div>
            </div>
          </div>
        </div>
        <div className="subtitle">
          <h2>Does your carbon footprint beat global averages?</h2>
        </div>
        <section className="chart-data">
          <div className="chart">
            <h2>Annual Carbon Emissions - Metric Tons</h2>
            <br />
            <h4>
              Global annual carbon emissions from 2020: 34,807,259,099 metric
              tons
            </h4>
            <br />
            <a
              href="https://ourworldindata.org/co2/"
              rel="noreferrer"
              target="_blank"
            >
              <MeanCountryAnnual />
            </a>
          </div>

          <div className="chart">
            <h2>Annual Per Capita Carbon Emissions - Metric Tons</h2>
            <br />
            <h4>
              Annual carbon dioxide (CO₂) emissions worldwide from 1940 to 2022
            </h4>
            <br />
            <a
              href="https://www.statista.com/statistics/276629/global-co2-emissions/"
              rel="noreferrer"
              target="_blank"
            >
              <MeanCountry />
            </a>
          </div>

          <div className="chart">
            <h2>
              Per-Household Annual Carbon Emissions in the United States -
              Metric Tons
            </h2>
            <br />
            <a
              href="https://www.indiaspend.com/earthcheck/indias-biggest-spenders-cause-7-times-more-emissions-than-the-poor-715878"
              rel="noreferrer"
              target="_blank"
            >
              <MeanHousehold />
            </a>
          </div>
          <div className="chart">
            <h2>Breakdown of the Average American's Carbon Footprint</h2>
            <br />
            <a
              href="https://suncommon.com/understanding-your-carbon-footprint/"
              rel="noreferrer"
              target="_blank"
            >
              <MeanIndividual />
            </a>
          </div>
        </section>

        <br />
      </main>
    </>
  );
};

export default Home;
