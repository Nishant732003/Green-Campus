import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart3 = ({ graphData }) => {
  const [totalmessFoodEmissions, setTotalmessFoodEmissions] = useState(0);
  const [totalpaperWasteEmissions, setTotalpaperWasteEmissions] = useState(0);
  const [totalmetalWasteEmissions, setTotalmetalWasteEmissions] = useState(0);
  const [totalplasticWasteEmissions, setTotalplasticWasteEmissions] =
    useState(0);

  useEffect(() => {
    let messFoodSum = 0;
    let paperSum = 0;
    let metalSum = 0;
    let plasticSum = 0;
    graphData.forEach((data) => {
      messFoodSum += data.messFoodEmissions;
      paperSum += data.paperWasteEmissions;
      metalSum += data.metalWasteEmissions;
      plasticSum += data.plasticWasteEmissions;
    });
    // Update state with aggregated values
    setTotalmessFoodEmissions(messFoodSum);
    setTotalpaperWasteEmissions(paperSum);
    setTotalmetalWasteEmissions(metalSum);
    setTotalplasticWasteEmissions(plasticSum);
  }, [graphData]);

  // Chart data setup
  const chartData = {
    series: [
      {
        name: ' Mess Food Emissions',
        data: [totalmessFoodEmissions],
      },
      {
        name: 'Toatal Paper Waste Emissions',
        data: [totalpaperWasteEmissions],
      },
      {
        name: 'Metal Waste emissions',
        data: [totalmetalWasteEmissions],
      },
      {
        name: 'Plastic Waste Emissions',
        data: [totalplasticWasteEmissions],
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
          text: 'Waste Data',
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

export default ApexChart3;