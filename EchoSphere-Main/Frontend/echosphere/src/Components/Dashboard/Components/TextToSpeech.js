import React, { useState, useEffect } from 'react';

function TextToSpeech({ content }) {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    // Fetch available voices when the component mounts
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);
    setSelectedVoice(availableVoices[0]); // Set the first voice as the default
  }, []);
  
  const speak = () => {
    if (!speaking) {
      if (selectedVoice) {
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.voice = selectedVoice;
        window.speechSynthesis.speak(utterance);
        setSpeaking(true);

        utterance.onend = () => {
          setSpeaking(false);
        };
      } else {
        alert('Please select a voice.');
      }
    }
  };

  const stopSpeaking = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const handleVoiceChange = (event) => {
    const selectedVoiceName = event.target.value;
    const voice = voices.find((v) => v.name === selectedVoiceName);
    setSelectedVoice(voice);
  };

  return (
    <div className='position-absolute'>
      <div>
        <select onChange={handleVoiceChange}>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
      <div className='d-flex'>
        <button className="w-50" onClick={speak} disabled={speaking}>
          Speak
        </button>
        <button className="w-50" onClick={stopSpeaking} disabled={!speaking}>
          Stop
        </button>
      </div>
    </div>
  );
}

export default TextToSpeech;
