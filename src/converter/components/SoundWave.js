import React from 'react';
import './SoundWave.css';

const SoundWave = () => {
  return (
    <div className="sound-waves">
      {[...Array(40)].map((_, index) => (
        <span key={index}></span>
      ))}
    </div>
  );
};

export default SoundWave;
