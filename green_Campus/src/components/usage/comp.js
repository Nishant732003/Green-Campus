import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart1 = ({ graphData }) => {
 
  const [totaltwoVheelersEmissions, setTotaltwoVheelersEmissions] = useState(0);
  const [totalPublicTransitEmissions, setTotalPublicTransitEmissions] =
    useState(0);
  const [totalfourVheelersEmissions, setTotalfourVheelersEmissions] = useState(0);
  const [totalcollegeBusEmissions, setTotalcollegeBusEmissions] = useState(0);
  
  useEffect(() => {
    
    let twoVheelerSum = 0;
    let publicTransitSum = 0;
    let fourVheelerSum = 0;
    let collegeBusSum = 0;
    graphData.forEach((data) => {
      twoVheelerSum += data.twoVheelersEmissions;
      publicTransitSum += data.publicTransitEmissions;
      fourVheelerSum += data.fourVheelersEmissions;
      collegeBusSum += data.collegeBusEmissions;
    });
    // Update state with aggregated values
    setTotaltwoVheelersEmissions(twoVheelerSum);
    setTotalPublicTransitEmissions(publicTransitSum);
    setTotalfourVheelersEmissions(fourVheelerSum);
        setTotalcollegeBusEmissions(collegeBusSum);
  }, [graphData]);

  // Chart data setup
  const chartData = {
    series: [
      {
        name: 'Two Wheeler Emissions',
        data: [totaltwoVheelersEmissions],
      },
      {
        name: 'Public Transit Emissions',
        data: [totalPublicTransitEmissions],
      },
      {
        name: 'Four Wheeler Emissions',
        data: [totalfourVheelersEmissions],
      },
      {
        name: 'college Bus Emissions',
        data: [totalcollegeBusEmissions],
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
          text: 'Transportation Data',
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

export default ApexChart1;