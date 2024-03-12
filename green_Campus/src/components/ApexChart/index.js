import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ graphData }) => {
    console.log(graphData)
  // Extracting vehicle, public transit, and plane emissions from the graph data
   const vehicleEmissions = graphData.map((data) => data.traveldata);
  const EnergyEmissions = graphData.map((data) => data.homedata);
     const WasteEmissions = graphData.map((data) => data.wastedata);
//   // Function to check if a value is in the danger zone
//    const isDanger = (value, threshold) => {
//     return value > threshold;
//   };

  const seriesData = [
    {
      name: 'Vehicle Emissions',
      data: vehicleEmissions,
    },
    {
      name: 'Energy Emissions',
      data: EnergyEmissions,
    },
    {
      name: 'Waste Emissions',
      data: WasteEmissions,
    },
  ];

  console.log(seriesData)
  const [chartData, setChartData] = useState({
    series: seriesData,
    options: {
      chart: {
        height: 350,
        type: 'line',
        id: 'areachart-2',
      },
      annotations: {
        yaxis: [
          {
            y: 820,
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                color: '#fff',
                background: '#00E396',
              },
            },
          },
          {
            y: 180000,
            y2: 300000,
            borderColor: '#000',
            fillColor: '#FEB019',
            opacity: 0.2,
            label: {
              borderColor: '#333',
              style: {
                fontSize: '10px',
                color: '#333',
                background: '#FEB019',
              },
              text: 'Hazardous Range',
            },
          },
          {
            y: 0,
            y2: 60000,
            borderColor: '#000',
            fillColor: 'green',
            opacity: 0.2,
            label: {
              borderColor: '#333',
              style: {
                fontSize: '15px',
                color: 'black',
                background: 'yellow',
              },
              text: 'Need Some work',
            },
          },
          {
            y: 60000,
            y2: 180000,
            borderColor: '#000',
            fillColor: 'yellow',
            opacity: 0.2,
            label: {
              borderColor: '#333',
              style: {
                fontSize: '15px',
                color: 'white',
                background: 'red',
              },
              text: 'Above this Dangerous',
            },
          },
        ],
      },
      points: [
        {
          x: new Date('01 Dec 2017').getTime(),
          y: 8000.55,
          marker: {
            size: 8,
            fillColor: '#fff',
            strokeColor: 'red',
            radius: 2,
            cssClass: 'apexcharts-custom-class',
          },
          label: {
            borderColor: '#FF4560',
            offsetY: 0,
            style: {
              color: '#fff',
              background: '#FF4560',
            },

            text: 'Point Annotation',
          },
        },
        {
          x: new Date('28 Feb 2017').getTime(),
          y: 18245,
          marker: {
            size: 0,
          },
        },
      ],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      grid: {
        padding: {
          right: 30,
          left: 20,
        },
      },
      title: {
        text: 'Co2 Emissions',
        align: 'left',
      },
      labels: seriesData[0].data.map((_, index) => `Data ${index + 1}`),
xaxis: {
  xaxis: {
    type: 'category', // Use 'category' type for non-date labels
    categories: seriesData[0].data.map((_, index) => `Data ${index + 1}`),
  },
},

      tooltip: {
        // Customize tooltip if needed
      },
    },
  });
  console.log(setChartData)

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart