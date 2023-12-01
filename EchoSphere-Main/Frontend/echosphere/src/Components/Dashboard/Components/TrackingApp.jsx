import React from 'react';
import '../public/BubbleTracker.css';
import FlipkartBubbleTracker from './BubbleTracker';
const initialBubbles = [
  { id: 1, x: 20, y: 75 },
  { id: 2, x: 40, y: 75 },
  { id: 3, x: 60, y: 75 },
  { id: 4, x: 80, y: 75 },
  { id: 5, x: 100, y: 75 },
];

function Tracking_App(props) {
  var variableValue = props.data.stage; 
  const date = props.data.date;
  const dept = props.data.dept;
  const gid = props.data.gid;
  const summary = props.data.summary;
  if (variableValue === 5) {
    variableValue = 6;
  }
  return (
    <div className="App mt-5">
      <FlipkartBubbleTracker bubbles={initialBubbles} variableValue={variableValue} date={date} gid={gid} dept={dept} summary={summary} />
    </div>
  );
}

export default Tracking_App;
