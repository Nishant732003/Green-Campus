import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Graph(graphData) {
  let electricityEmissions =
    graphData.graphData.homeData[graphData.graphData.homeData.length-1].electricityEmissions;
  
  let vehicleEmissions = graphData.graphData.travelData[graphData.graphData.travelData.length-1].collegeBusEmissions;
  let TwoWheelersEmissions = graphData.graphData.travelData[graphData.graphData.travelData.length-1].twoVheelersEmissions;
  let FourWheelersEmissions = graphData.graphData.travelData[graphData.graphData.travelData.length-1].fourVheelersEmissions;
  let waterEmissions = graphData.graphData.homeData[graphData.graphData.homeData.length-1].waterEmissions;
  let heatEmissions = graphData.graphData.homeData[graphData.graphData.homeData.length-1].fuelOilEmissions+graphData.graphData.homeData[graphData.graphData.homeData.length-1].naturalGasEmissions;
  let publicTransitEmissions =
    graphData.graphData.travelData[graphData.graphData.travelData.length-1].publicTransitEmissions;
    let otherEmission = graphData.graphData.wasteData[graphData.graphData.wasteData.length-1].plasticWasteEmissions+graphData.graphData.wasteData[graphData.graphData.wasteData.length-1].paperWasteEmissions+graphData.graphData.wasteData[graphData.graphData.wasteData.length-1].metalWasteEmissions;
  const data = {
    labels: [
      'Electricity Emissions',
      'College Bus Emissions',
      'Two Wheelers Emissions',
      'Water Emissions',
      'Heat Emissions',
      'Public Transit Emissions',
      'Four Wheelers Emissions',
      'Other Waste',
    ],
    datasets: [
      {
        label: '# of Votes',
        data: [
          electricityEmissions,
          vehicleEmissions,
          TwoWheelersEmissions,
          waterEmissions,
          heatEmissions,
          publicTransitEmissions,
          FourWheelersEmissions,
          otherEmission,
        ],
        backgroundColor: [
          'rgba(162, 213, 159, 1)',
          'rgba(98, 187, 160, 1)',
          'rgba(72, 139, 118, 1)',
          'rgba(27, 80, 109, 1)',
          'rgba(44, 130, 179, 1)',
          'rgba(155, 209, 229, 1)',
          'rgba(239, 222, 154, 1)',
          'rgba(233, 110, 97, 1)',
        ],
        borderColor: [
          'rgba(36, 59, 74, 1)',
          'rgba(36, 59, 74, 1)',
          'rgba(36, 59, 74, 1)',
          'rgba(36, 59, 74, 1)',
          'rgba(36, 59, 74, 1)',
          'rgba(36, 59, 74, 1)',
          'rgba(36, 59, 74, 1)',
          'rgba(36, 59, 74, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '59vh',
        width: '47vw',
      }}
    >
      <Doughnut
        data={data}
        height={'400px'}
        options={{
          maintainAspectRatio: false,
          resizeDelay: 0,
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: 'white', // Set the font color of legend labels to white
              },
            },
          },
        }}
      ></Doughnut>
    </div>
  );
}