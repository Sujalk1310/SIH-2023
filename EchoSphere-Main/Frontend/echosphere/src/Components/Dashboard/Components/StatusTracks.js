import React,{useState} from 'react';
import '../public/App.css';
import BubbleTrackerStatus from './BubbleTrackerStatus';

const initialBubbles = [
  { id: 1, x: 20, y: 75 },
  { id: 2, x: 40, y: 75 },
  { id: 3, x: 60, y: 75 },
  { id: 4, x: 80, y: 75 },
  { id: 5, x: 100, y: 75 },
];

  function StatusTracks(props) {
    const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  console.log(props.jsonData);
  const filteredData = props.jsonData.filter((item) => {
    console.log(item)
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      (item.dept && item.dept.toLowerCase().includes(lowerCaseQuery)) ||
      (item.date && item.date.includes(searchQuery)) || 
      (item.gid && item.gid.toString().includes(searchQuery)) ||
      (item.summary && item.summary.toString().includes(lowerCaseQuery))
    );
  });
    return (
      <div className="App mt-5">
      <center>
      <input
        id='searchingbar'
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      </center>
      {filteredData.map((item, index) => (
        <BubbleTrackerStatus 
          key={index}
          bubbles={initialBubbles}
          variableValue={item.stage}
          gid={item.gid}
          dept={item.dept}
          date={item.date}
          summary={item.summary}
        />
      ))}
    </div>
    );
  }



export default StatusTracks;
