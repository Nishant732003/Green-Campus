import React, { useState, useEffect, useContext } from "react";
import "../assets/css/footprint.css";
import { addCommas } from "../utils/helpers";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import ApexChart from "../components/ApexChart";
import DashboardCard from "../components/DashboardCard";
import LoaderContext from '../Context/LoaderContext'
const Dashboard = () => {
  const { data, loading } = useQuery(QUERY_ME);
  const [newdata, setNewData] = useState([]);
  const context=useContext(LoaderContext)
  const {setisLoading}=context
  const { homeData, travelData, wasteData,username } = data?.me || [];
  useEffect(() => {
    if (homeData?.length && travelData?.length && wasteData?.length) {
      const alldata = homeData.map((home, i) => ({
        homedata:
          home.waterEmissions +
          home.electricityEmissions +
          home.naturalGasEmissions +
          home.fuelOilEmissions,
        traveldata:
          travelData[i].fourVheelersEmissions +
          travelData[i].publicTransitEmissions +
          travelData[i].twoVheelersEmissions +
          travelData[i].collegeBusEmissions,
        wastedata:
          wasteData[i].plasticWasteEmissions +
          wasteData[i].metalWasteEmissions +
          wasteData[i].paperWasteEmissions +
          wasteData[i].messFoodEmissions,
      }));
      setNewData(alldata);
    }
    
  }, [homeData, travelData, wasteData]);
  
  if (loading) {
    setisLoading(true)
    return <h2>LOADING...</h2>;
  }
  setisLoading(false)
  return (
    <>
      <div className="spacing1"></div>

      <div className="footprint mt-3 pt-5 min-h-[80vh]">
        <h1 className="dash">My Carbon Footprint Dashboard</h1>
        {Auth.loggedIn() ? (
          <div>
            <h1 className="text-center text-[35px]">Hey {username} ! </h1>
            <section className="my-footprint" style={{ gap: "100px" }}>
              <div>
                {homeData?.length || travelData?.length ? (
                  <div className="footprint-data">
                    {homeData.map((home, i) => (
                      <div
                        className="calculations left"
                        key={home._id}
                      >
                        <div className=" hoverbox">
                          <h1 className="footprint-title">
                            {home.updatedAt.toString().slice(0, 10)}
                          </h1>
                          <p>
                            Water emissions:{" "}
                            <span
                              className={`${
                                home.waterEmissions > 5000 ? "red" : "green"
                              }`}
                            >
                              {addCommas(home.waterEmissions)}{" "}
                            </span>
                            kg CO2
                          </p>
                          <p>
                            Electricity emissions:{" "}
                            <span
                              className={`${
                                home.electricityEmissions > 5000
                                  ? "red"
                                  : "green"
                              }`}
                            >
                              {addCommas(home.electricityEmissions)}
                            </span>{" "}
                            kg CO2
                          </p>
                          <p>
                            NaturalGas emissions:{" "}
                            <span
                              className={`${
                                home.naturalGasEmissions > 5000
                                  ? "red"
                                  : "green"
                              }`}
                            >
                              {addCommas(home.naturalGasEmissions)}
                            </span>{" "}
                            kg CO2
                          </p>
                          <p>
                            FuelOil emissions:{" "}
                            <span
                              className={`${
                                home.fuelOilEmissions > 5000 ? "red" : "green"
                              }`}
                            >
                              {addCommas(home.fuelOilEmissions)}
                            </span>{" "}
                            kg CO2
                          </p>
                          <p>
                            Vehicle emissions:{" "}
                            <span
                              className={`${
                                travelData[i].fourVheelersEmissions > 5000
                                  ? "red"
                                  : "green"
                              }`}
                            >
                              {addCommas(travelData[i].fourVheelersEmissions)}{" "}
                            </span>{" "}
                            kg CO2
                          </p>
                          <p>
                            Public Transit emissions:{" "}
                            <span
                              className={`${
                                travelData[i].publicTransitEmissions > 5000
                                  ? "red"
                                  : "green"
                              }`}
                            >
                              {addCommas(travelData[i].publicTransitEmissions)}{" "}
                            </span>{" "}
                            kg CO2
                          </p>
                          <p>
                            Mess Waste emissions:{" "}
                            <span
                              className={`${
                                wasteData[i].messFoodEmissions > 5000
                                  ? "red"
                                  : "green"
                              }`}
                            >
                              {addCommas(wasteData[i].messFoodEmissions)}{" "}
                            </span>
                            kg CO2
                          </p>
                          <p>
                            Other Waste emissions:{" "}
                            <span
                              className={`${
                                wasteData[i].plasticWasteEmissions > 5000
                                  ? "red"
                                  : "green"
                              }`}
                            >
                              {addCommas(wasteData[i].plasticWasteEmissions)}{" "}
                            </span>
                            kg CO2
                          </p>
                          <p>
                            Your total Carbon Footprint:{" "}
                            {addCommas(
                              home.naturalGasEmissions +
                                home.fuelOilEmissions +
                                home.electricityEmissions +
                                home.waterEmissions +
                                travelData[i].fourVheelersEmissions +
                                travelData[i].publicTransitEmissions +
                                wasteData[i].messFoodEmissions +
                                wasteData[i].plasticWasteEmissions
                            )}{" "}
                            kg CO2
                          </p>
                        </div>
                      </div>
                    ))}
                    {newdata.length > 0 && (
                      <div className="graph1">
                        <ApexChart graphData={newdata} />
                      </div>
                    )}
                    <DashboardCard />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-center text-[20px] mt-4">Please enter some data to show here!!!</h1>
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : (
          <div>Please Log in</div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
