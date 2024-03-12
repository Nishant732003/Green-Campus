import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart2 = ({ graphData }) => {
  const [totalWaterEmissions, setTotalWaterEmissions] = useState(0);
  const [totalnaturalGasEmissions, setTotalnaturalGasEmissions] =
    useState(0);
  const [totalelectricityEmissions, setTotalelectricityEmissions] =
    useState(0);
  const [totalfuelOilEmissionsEmissions, setTotalfuelOilEmissionsEmissions] = useState(0);

  useEffect(() => {
    let waterSum = 0;
    let naturalSum= 0;
    let electricitytSum = 0;
    let fuelSum = 0;
    graphData.forEach((data) => {
      waterSum += data.waterEmissions;
      electricitytSum += data.electricityEmissions;
      naturalSum += data.naturalGasEmissions;
    fuelSum += data.fuelOilEmissions;
    });
    // Update state with aggregated values
    setTotalWaterEmissions(waterSum);
    setTotalnaturalGasEmissions(electricitytSum);
    setTotalelectricityEmissions(naturalSum);
    setTotalfuelOilEmissionsEmissions(fuelSum);
  }, [graphData]);

  // Chart data setup
  const chartData = {
    series: [
      {
        name: ' Emissions Due To  Water',
        data: [totalWaterEmissions],
      },
      {
        name: 'Natural gas emissions',
        data: [totalnaturalGasEmissions],
      },
      {
        name: 'Electricity emissions',
        data: [totalelectricityEmissions],
      },
      {
        name: 'Fuel oil Emissions',
        data: [totalfuelOilEmissionsEmissions],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        background: 'gray',
        foreColor: 'white',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Total'],
        labels: {
          style: {
            colors: 'white',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Energy Data',
          style: {
            color: 'white',
          },
        },
        labels: {
          style: {
            colors: 'white',
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
      },
      legend: {
        labels: {
          colors: 'white',
        },
      },
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default ApexChart2;