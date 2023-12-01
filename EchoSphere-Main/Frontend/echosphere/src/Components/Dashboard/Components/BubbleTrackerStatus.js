import React, { useState } from "react";
import "../public/BubbleTracker.css";

const BubbleTrackerStatus = ({ bubbles, variableValue,gid,dept,date,summary}) => {
  const spacing = 100 / (bubbles.length + 1);

  // State to track the visibility of the dropdown paragraph
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Function to toggle the visibility of the dropdown paragraph
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const renderBubbles = () => {
    return bubbles.map((bubble, index) => {
      const isCompleted = variableValue >= index + 1;

      return (
        <>
          <div
            key={bubble.id}
            className={`mt-2 flipkart-bubble${isCompleted ? " completed" : ""}`}
            style={{
              left: `${spacing * (index + 1)}%`,
              top: `${bubble.y}px`,
            }}
          >
            {isCompleted && <div className="tick-mark">&#10004;</div>}
            <p className="flipkart-labels">
              {(() => {
                switch (bubble.id) {
                  case 1:
                    return "Lodged";
                  case 2:
                    return "Reviewed";
                  case 3:
                    return "Assigned";
                  case 4:
                    return "Task Done";
                  case 5:
                    return "Verified";
                  default:
                    return "none";
                }
              })()}
            </p>
          </div>
        </>
      );
    });
  };
  return (
    <div className="flipkart-bubble-container">
      <div className="flipkart-bubble-box" onClick={toggleDropdown}>
        <div className='d-flex justify-content-between w-100 p-3 h6'>
          <span>GID:{gid} / Dept: {dept}</span>
          <span>Date: {date}</span>
        </div>
        <div className="flipkart-bubble-line mt-2" style={{ width: `${spacing * variableValue}%` }}></div>
        {renderBubbles()}
      </div>
      {isDropdownVisible && (
        <div className="bubble-dropdown text-left p-2 px-3">
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};



export default BubbleTrackerStatus;
