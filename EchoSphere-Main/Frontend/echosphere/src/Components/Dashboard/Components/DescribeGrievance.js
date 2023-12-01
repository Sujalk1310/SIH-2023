import React, { useState } from 'react';
import Detection from './Detection';
import '../public/Lodge.css';
import Blob from '../../media/images/Blob.png';
import Signal from '../../media/images/Signal.png';
import { postDataToAPI } from '../../apiService';
import TextToSpeech from './TextToSpeech'; 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function preprocess() {
  return new Promise(async (resolve) => {
    var loader = document.getElementById("loader");
    var text = document.getElementById("summary");
    var fake = document.getElementById("fake");
    loader.style.display = "flex";
    var select = document.querySelector(".goog-te-combo");
    var lang = select.value; 
    fake.innerHTML = text.value;
    select.value = "en";
    select.dispatchEvent(new Event("change"));

    try {
      const response = await postDataToAPI('nlp', { summary: text.value });
      console.log('Response from axios:', response.message);

      setTimeout(() => {
        var select = document.querySelector(".goog-te-combo");
        if (!fake.querySelector("font")) {
          var ch_tx = fake.innerHTML;
        } else {
          var ch_tx = fake.firstChild.firstChild.innerHTML;
        }
        console.log(ch_tx);
        select.dispatchEvent(new Event("change"));
        select.value = lang;
        select.dispatchEvent(new Event("change"));
        loader.style.display = "none";
        resolve(response.message); // Resolve with the response message
      }, 500);
    } catch (error) {
      console.error('Error in axios request:', error);
      loader.style.display = "none";
      resolve();
    }
  });
}

const DescribeGrievance = () => {
    const [showCard, setShowCard] = useState(false);
    const [grievanceText, setGrievanceText] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    
    const{
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } =useSpeechRecognition();
    
      if(!browserSupportsSpeechRecognition){
        return <span>Browser Doesn't Support Speech Recognition</span>
      }
    
    const handleGrievanceChange = (event) => {
      const newText = event.target.value;
      setGrievanceText(newText);
      // Mirror the content to summary2
      document.getElementById("summary2").textContent = newText;
    };
  
    const handleLodgeClick = async (event) => {
      event.preventDefault();
      if (grievanceText.trim() !== '') {
        const message = await preprocess();
        setResponseMessage(message);
        setShowCard(true);
      } 
    };
  
    const handleCloseCard = () => {
      setShowCard(false);
    };
  
    return (
      <>
      <TextToSpeech content={grievanceText} />
        <div id="loader">
          <img src={Blob} alt="blob" className="blob"></img>
          <img src={Signal} alt="signal" className="signal"></img>
        </div>
        <p id="fake" hidden></p>
        <form onSubmit={handleLodgeClick}>
          <div className="container-fluid mt-5 position-relative">
            <div className={`row ${showCard ? 'blur' : ''}`}>
              <div className="col-md-6 offset-md-3">
                <h2 className="mb-4">Describe Your Grievance</h2>
                <div className="input-group mb-3">
                  <textarea
                    id="summary"
                    className="form-control border-2 border-dark"
                    rows="5"
                    placeholder="Enter your grievance here..."
                    value={grievanceText}
                    onChange={handleGrievanceChange}
                    required
                  ></textarea>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <button
                    type="submit"
                    className="btn btn-warning w-75"
                    style={{ color: 'black' }}
                  >
                    Lodge
                  </button>
                  <div>
                    <p>Microphone : {listening ? 'on' : 'off'}</p>
                    <button onClick={SpeechRecognition.startListening}>Start</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop</button>
                    <button onClick={resetTranscript}>Reset</button>
                    
                    </div>
                </div>
                <div
                  id="summary2"
                  className="mt-4 border-2 bg-light border-dark"
                  style={{ minHeight: '100px', padding: '10px' }}
                ><p>{transcript}</p></div>
              </div>
            </div>
            {showCard && <Detection text={document.getElementById('summary').innerHTML} onClose={handleCloseCard} responseMessage={responseMessage} />}
          </div>
        </form>
      </>
    );
  };
  
  export default DescribeGrievance;
