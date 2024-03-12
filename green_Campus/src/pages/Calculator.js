import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/css/calculator.css";

//import Select from '@mui/material/Select';
import { Slider } from "@mui/material";
import LoaderContext from '../Context/LoaderContext'
import { useMutation } from "@apollo/client";
import { ADD_TRAVEL, ADD_HOME, ADD_WASTE } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import { Box } from "@mui/system";
import Auth from "../utils/auth";

const Calculator = () => {
  const context=useContext(LoaderContext)
  const {setisLoading}=context
  // set state of user form
  const [formState, setFormState] = useState({
    TwoWheeler: 0,
    publicTransportationMiles: 0,
    carMiles: 1000,
    busMiles: 0,
    trainMiles: 0,

    naturalGas: 0,
    LPG: 0,
    fuelOil: 0,
    electricity: 10,
    water: 0,
    metalwaste: 100,
    foodwaste: 1000,
    plasticwaste: 150,
    postConsumer: 600,
  });
  let {
    TwoWheeler,
    publicTransportationMiles,
    carMiles,
    busMiles,
    trainMiles,

    naturalGas,
    LPG,
    fuelOil,
    electricity,
    water,

    metalwaste,
    foodwaste,
    plasticwaste,
    postConsumer,
    //
  } = formState;

  // navigate to new page
  const navigate = useNavigate();

  // set useMutation to populate meQuery for both ADD_TRAVEL and ADD_HOME
  const [addTravel] = useMutation(ADD_TRAVEL, {
    update(cache) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        const previousTravelData = me.travelData;

        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, travelData: [...me.travelData, addTravel] } },
        });

        console.log(previousTravelData);
      } catch (e) {
        console.warn(e);
      }
    },
  });
  const [addHome] = useMutation(ADD_HOME, {
    update(cache) {
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, homeData: [...me.homeData] } },
        });
      } catch (e) {
        console.warn(e);
      }
    },
  });

  const [addWaste] = useMutation(ADD_WASTE, {
    update(cache) {
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, homeData: [...me.homeData] } },
        });
      } catch (e) {
        console.warn(e);
      }
    },
  }
  
  );

  // function to calculate home and travel data
  const calculateFootprint = async (
    TwoWheeler,
    publicTransportationMiles,
    carMiles,
    busMiles,

    naturalGas,
    LPG,
    fuelOil,
    electricity,
    water,

    metalwaste,
    foodwaste,
    plasticwaste,
    postConsumer
  ) => {
    setisLoading(true)
    const fourVheelersEmissions = Math.round(4.2887 * carMiles);
    const publicTransitEmissions = Math.round(
      1.832934 * trainMiles + 3.952283 * publicTransportationMiles
    );
    const twoVheelersEmissions = Math.round(5 * TwoWheeler);
    const collegeBusEmissions = Math.round(1.7 * busMiles);

    const waterEmissions = Math.round(water * 12);

    const electricityEmissions = Math.round(8 * electricity);
    const naturalGasEmissions = Math.round(9 * naturalGas + 0.8 * LPG);
    const fuelOilEmissions = Math.round(6 * fuelOil);
    const metalWasteEmissions = Math.round(7 * metalwaste);

    const plasticWasteEmissions = Math.round(9 * plasticwaste);
    const paperWasteEmissions = Math.round(78 * postConsumer);

    const messFoodEmissions = Math.round(foodwaste * 6.7);
    try {
      await addTravel({
        variables: {
          fourVheelersEmissions,
          publicTransitEmissions,
          twoVheelersEmissions,
          collegeBusEmissions,
        },
      });
      await addHome({
        variables: {
          waterEmissions,
          electricityEmissions,
          naturalGasEmissions,
          fuelOilEmissions,
        },
      });

      await addWaste({
        variables: {
          plasticWasteEmissions,
          metalWasteEmissions,
          paperWasteEmissions,
          messFoodEmissions,
        },
      });
      navigate("/myfootprint");
    } catch (err) {
      console.log(err);
    }
    setisLoading(false)
  };

  // function to handle the change of state for the form
  function handleChange(event) {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: Number(value) });
  }
  function handleChange1(event) {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: Number(value) });
  }

  // form handler to submit to calculation functions
  function handleSubmit(event) {
    event.preventDefault();
    calculateFootprint(
      TwoWheeler,
      publicTransportationMiles,
      carMiles,
      busMiles,
      trainMiles,

      naturalGas,
      LPG,
      fuelOil,
      electricity,
      water,

      metalwaste,
      foodwaste,
      plasticwaste,
      postConsumer
    );
  }

  return (
    <div>
      <div className="spacing1"></div>
      {Auth.loggedIn() ? (
        <main className="calculator-main">
          <h1>Carbon Footprint Calculator</h1>
          <div className="text">
            <div className="description">
              <div className="calc-h3">
                Fill out your individual travel and home information and click
                Find My Footprint.
              </div>
              <p>
                Default values are the averages for an adult in the United
                States. Enter values for your personal carbon footprint, not
                your entire household.
              </p>
              <p>
                This is a simplified carbon footprint calculator using the most
                common, significant factors. There are many factors that
                contribute to your total carbon footprint, like diet and
                shopping habits, that are not taken into consideration.
              </p>
            </div>
          </div>
          <section className="slider-sections">
            <form onSubmit={handleSubmit}>
              <div className="calculator">
                <div className="grid">
                  <div>
                    <h2>Transportation</h2>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">
                        Two wheeler MotorBike Kms/Month
                      </label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="TwoWheeler"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">Car Kms Per Month</label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="carMiles"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">Bus Kms Per Month</label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="busMiles"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">Train Kms Per Month</label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="trainMiles"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">
                        Public Transportation kms/Month
                      </label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="publicTransportationMiles"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                  </div>
                  <div>
                    <h2>Energy Emission</h2>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">Natural gas kgs/Month</label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="naturalGas"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">LPG kgs/Month</label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="LPG"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">
                        Water Used in Liters Per day
                      </label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="water"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">
                        Fuel oil (Except Transportation) kgs/Month
                      </label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="fuelOil"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">
                        electricity Usage in Units(KWH)
                      </label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange1}
                        valueLabelDisplay="on"
                        name="electricity"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                  </div>

                  <div>
                    <h2>Waste Generated</h2>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">
                        Food Wastage in Kgs/Month
                      </label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="foodwaste"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">
                        Post consumer waste(paper,Magzines) kgs/Month
                      </label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="postConsumer,"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">Metal Waste in kgs/Month</label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="metalwaste"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                    <Box sx={{ m: 1, width: 300 }}>
                      <label className="slider">
                        Plastic Waste in kgs/Month
                      </label>
                      <Slider
                        sx={{
                          color: "green",
                          margin: "40px 0 15px 0",
                          "& .MuiSlider-valueLabel": {
                            borderRadius: "15px",
                            backgroundColor: "green",
                          },
                          "& .MuiSlider-rail": {
                            padding: "5px",
                          },
                        }}
                        aria-label="Car Miles"
                        defaultValue={1000}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        name="plasticwaste"
                        step={500}
                        marks
                        min={0}
                        max={3000}
                      ></Slider>
                    </Box>
                  </div>
                </div>
              </div>
              <div className="calculator-btn">
                <button type="submit">Find My Footprint</button>
              </div>
            </form>
          </section>
        </main>
      ) : (
        <div className="not-logged-in">
          <h2 className="no-info-title">
            Log in to use our carbon footprint calculator!
          </h2>
          <Link to="/login">
            <button type="submit">Log In</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Calculator;
