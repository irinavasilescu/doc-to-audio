import React from 'react';

const PlayerButton = ({ 
  type, 
  onClick, 
  disabled, 
  title,
  isSpeaking,
  isPaused 
}) => {
  const getIconPath = () => {
    switch (type) {
      case 'play':
        return !isSpeaking ? (
          <path d="M8 5v14l11-7z"/>
        ) : isPaused ? (
          <path d="M8 5v14l11-7z"/>
        ) : (
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        );
      case 'stop':
        return <path d="M6 6h12v12H6z"/>;
      case 'skip-backward':
        return <path d="M11.5 12l8.5 6V6l-8.5 6z"/>;
      case 'skip-forward':
        return <path d="M4 18l8.5-6L4 6v12z"/>;
      default:
        return null;
    }
  };

  return (
    <button 
      className={`control-btn ${type}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      <svg viewBox="0 0 24 24">
        {getIconPath()}
      </svg>
    </button>
  );
};

export default PlayerButton;
