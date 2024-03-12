import React from 'react'
import "./DashBoardcard.css";
const DashboardCard = () => {
  return (
    <div className="ag-format-container">
      <div className="ag-courses_box">
        <div className="ag-courses_item">
          <a href="/dashboard" className="ag-courses-item_link">
            <div className="ag-courses-item_bg"></div>

            <div className="ag-courses-item_title">
              Step Up, Step Down Your Carbon Footprint
            </div>

            
          </a>
        </div>

        <div className="ag-courses_item">
          <a href="/dashboard" className="ag-courses-item_link">
            <div className="ag-courses-item_bg"></div>

            <div className="ag-courses-item_title">
              Walk Far, Leave No Carbon Footprint Behind
            </div>

           
          </a>
        </div>

        <div className="ag-courses_item">
          <a href="/dashboard" className="ag-courses-item_link">
            <div className="ag-courses-item_bg"></div>
            <div className="ag-courses-item_title">
              Turning Small Changes Into Big Carbon Savings
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard