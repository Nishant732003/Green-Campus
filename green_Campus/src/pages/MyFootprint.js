import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
 import Pledges from '../components/Pledges';
import { Graph } from '../components/Graph';
import { addCommas } from '../utils/helpers.js';
// eslint-disable-next-line
import '../assets/css/footprint.css';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import ApexChart1 from '../components/usage/comp.js';
import ApexChart2 from '../components/usage/comp2.js';
import ApexChart3 from '../components/usage/comp3.js';
import LoaderContext from '../Context/LoaderContext'
const MyFootprint = () => {
  const context=useContext(LoaderContext)
  const {setisLoading}=context
  const { data, loading } = useQuery(QUERY_ME);

  const { username, homeData, travelData,wasteData } = data?.me || [];

  if (loading) {
    setisLoading(true)
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="footprint">
            <div className="spacing1"></div>

      {Auth.loggedIn() ? (
        <div>
          <section className="my-footprint">
            <h1 className='flex justify-center text-[60px] mt-5'>My FootPrint</h1>
            <div>
              {homeData?.length || travelData?.length || wasteData?.length ? (
                <div className="footprint-data">
                  <div className=" hoverbox">
                    <h3>{username}'s Carbon Footprint</h3>
                    <p>
                      Water emissions: <span className={`${homeData[homeData.length-1].waterEmissions>5000 ? 'red':'green'}`}>{addCommas(homeData[homeData.length-1].waterEmissions)}{' '}</span>
                      kg CO2
                    </p>
                    <p>
                      Electricity emissions:{' '}
                      <span className={`${homeData[homeData.length-1].electricityEmissions>5000 ? 'red':'green'}`}>{addCommas(homeData[homeData.length-1].electricityEmissions)}</span> kg CO2
                    </p>
                    <p>
                      Natural GAS emissions: <span className={`${homeData[homeData.length-1].naturalGasEmissions>5000 ? 'red':'green'}`}>{addCommas(homeData[homeData.length-1].naturalGasEmissions)}</span> kg
                      CO2
                    </p>
                    <p>
                      Fuel Oil emissions: <span className={`${homeData[homeData.length-1].fuelOilEmissions>5000 ? 'red':'green'}`}>{addCommas(homeData[homeData.length-1].fuelOilEmissions)}</span> kg
                      CO2
                    </p>
                    <p>
                      Four Wheeler emissions:{' '}
                      <span className={`${travelData[travelData.length-1].fourVheelersEmissions>5000 ? 'red':'green'}`}>{addCommas(travelData[travelData.length-1].fourVheelersEmissions)}</span> kg CO2
                    </p>
                    <p>
                      Public Transit emissions:{' '}
                      <span className={`${travelData[travelData.length-1].publicTransitEmissions>5000 ? 'red':'green'}`}>{addCommas(travelData[travelData.length-1].publicTransitEmissions)}</span> kg CO2
                    </p>
                    <p>
                      Two Wheelers emissions: <span className={`${travelData[travelData.length-1].twoVheelersEmissions>5000 ? 'red':'green'}`}>{addCommas(travelData[travelData.length-1].twoVheelersEmissions)}</span>{' '}
                      kg CO2
                    </p>
                    <p>
                      College Bus emissions: <span className={`${travelData[travelData.length-1].collegeBusEmissions>5000 ? 'red':'green'}`}>{addCommas(travelData[travelData.length-1].collegeBusEmissions)}</span>{' '}
                      kg CO2
                    </p>
                    <p>
                      Mess Food Waste: <span className={`${wasteData[wasteData.length-1].messFoodEmissions>5000 ? 'red':'green'}`}>{addCommas(wasteData[wasteData.length-1].messFoodEmissions)}</span>{' '}
                      kg CO2
                    </p>
                    <p>
                      Plastic Waste: <span className={`${wasteData[wasteData.length-1].plasticWasteEmissions>5000 ? 'red':'green'}`}>{addCommas(wasteData[wasteData.length-1].plasticWasteEmissions)}</span>{' '}
                      kg CO2
                    </p>
                    <p>
                      Paper Waste: <span className={`${wasteData[wasteData.length-1].paperWasteEmissions>5000 ? 'red':'green'}`}>{addCommas(wasteData[wasteData.length-1].paperWasteEmissions)}</span>{' '}
                      kg CO2
                    </p>
                    <p>
                      Metal Waste: <span className={`${wasteData[wasteData.length-1].metalWasteEmissions>5000 ? 'red':'green'}`}>{addCommas(wasteData[wasteData.length-1].metalWasteEmissions)}</span>{' '}
                      kg CO2
                    </p>
                    <p className="total">
                      Your total Carbon Footprint:{' '}
                      {addCommas(
                        homeData[homeData.length-1].naturalGasEmissions +homeData[homeData.length-1].fuelOilEmissions +
                          homeData[homeData.length-1].electricityEmissions +
                          homeData[homeData.length-1].waterEmissions +
                          travelData[travelData.length-1].fourVheelersEmissions +travelData[travelData.length-1].twoVheelersEmissions +
                          travelData[travelData.length-1].publicTransitEmissions +travelData[travelData.length-1].collegeBusEmissions +
                          wasteData[wasteData.length-1].messFoodEmissions+wasteData[wasteData.length-1].plasticWasteEmissions+wasteData[wasteData.length-1].paperWasteEmissions+wasteData[wasteData.length-1].metalWasteEmissions
                      )}{' '}
                      kg CO2
                    </p>
                    <a href="/dashboard">Go to DashBoard</a>
                  </div>

                  <div className="graph">
                    <Graph graphData={{ homeData, travelData ,wasteData}} />
                  </div>
                  {/* <div className="graph1">
                    <ApexChart graphData={travelData} />
                  </div> */}
                  <div className="graph1">
                    <ApexChart1 graphData={[travelData[travelData.length-1]]} />
                  </div>
                  <div className="graph1">
                    <ApexChart2 graphData={[homeData[homeData.length-1]]} />
                  </div>
                  <div className="graph1">
                    <ApexChart3 graphData={[wasteData[wasteData.length-1]]} />
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="no-info-title">
                    You haven't calculated your carbon footprint yet!
                  </h2>
                  <div className="add-btn">
                    <Link to="/calculator">
                      <button>Go to Calculator</button>
                    </Link>
                  </div>
                  <Pledges />
                </div>
              )}
            </div>
          </section>
          <section>
            {homeData.length || travelData.length ? <Pledges /> : ''}
          </section>
        </div>
      ) : (
        <div className="not-logged-in">
          <h2 className="no-info-title">
            Log in to see your carbon footprint!
          </h2>
          <Link to="/login">
            <button type="submit">Log In</button>
          </Link>
        </div>
      )}
      {setisLoading(false)}
    </div>
  );
};

export default MyFootprint;