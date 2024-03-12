import React from 'react';
import './BookComponent.css'; // Import the CSS file for styles

const BookComponent = () => {
  return (
    <div className="container body1">
      <div className="book">
        <div className="gap"></div>
        <div className="pages">
          <div className="page much">Save energy for a brighter future</div>
          <div className="page much">Energy Saved is Energy Generated</div>
          <div className="page much">Energy efficiency for a greener Tomorrow</div>
          <div className="page much">Reduce Your carbon Increase your Life</div>
          <div className="page much">Move towards Efficient Technology</div>
          <div className="page much">live Green Save Green</div>
        </div>
        <div className="flips">
          <div className="flip flip1"></div>
          <div className="flip flip2"></div>
          <div className="flip flip3"></div>
          <div className="flip flip4"></div>
          <div className="flip flip5"></div>
          <div className="flip flip6"></div>
          <div className="flip flip7"></div>
        </div>
      </div>
    </div>
  );
};

export default BookComponent;