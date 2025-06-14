import './App.css';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import document from '../assets/document.png';
import pdfIcon from '../assets/pdf_icon.png';
import epubIcon from '../assets/epub_icon.png';
import docIcon from '../assets/doc_icon.png';
import docxIcon from '../assets/docx_icon.png';
import { supportedFileTypes } from '../values/fileTypes';
import voiceLanguageOptions from '../values/voiceLanguageOptions';
import LanguageDropdown from '../common/LanguageDropdown';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceReady, setIsVoiceReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isTextInputMode, setIsTextInputMode] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(voiceLanguageOptions[2].name); // US English Female
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const progressBarRef = useRef(null);
  const progressInterval = useRef(null);
  const startTimeRef = useRef(null);
  const seekPositionRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [visualProgress, setVisualProgress] = useState(0);

  useEffect(() => {
    // Check if ResponsiveVoice is available
    const checkResponsiveVoice = () => {
      if (window.responsiveVoice) {
        setIsVoiceReady(true);
      } else {
        // If not available yet, try again in 100ms
        setTimeout(checkResponsiveVoice, 100);
      }
    };

    checkResponsiveVoice();

    return () => {
      // Clean up ResponsiveVoice and intervals
      if (window.responsiveVoice) {
        window.responsiveVoice.cancel();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      setIsVoiceReady(false);
    };
  }, []);

  const resetProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    startTimeRef.current = null;
    seekPositionRef.current = 0;
  };

  const startProgressTracking = (startPosition) => {
    resetProgressTracking();
    
    startTimeRef.current = Date.now();
    seekPositionRef.current = startPosition;
    
    progressInterval.current = setInterval(() => {
      if (window.responsiveVoice && window.responsiveVoice.isPlaying()) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const newTime = Math.min(seekPositionRef.current + elapsed, duration);
        setCurrentTime(newTime);
        setVisualProgress(newTime / duration);
      }
    }, 100);
  };

  const stopProgressTracking = () => {
    resetProgressTracking();
  };

  const speakText = () => {
    if (!extractedText || !isVoiceReady) return;

    try {
      setIsSpeaking(true);
      setIsPaused(false);
      const selectedVoice = voiceLanguageOptions.find(option => option.name === selectedLanguage);
      
      // Estimate duration based on text length (rough estimate)
      const estimatedDuration = extractedText.length * 0.05; // 50ms per character
      setDuration(estimatedDuration);
      setCurrentTime(0);
      setProgress(0);
      
      window.responsiveVoice.speak(extractedText, selectedVoice.code, {
        onstart: () => {
          startProgressTracking(0);
        },
        onend: () => {
          setIsSpeaking(false);
          setIsPaused(false);
          setProgress(1);
          setCurrentTime(duration);
          stopProgressTracking();
        },
        onerror: () => {
          setError('Error playing speech');
          setIsSpeaking(false);
          setIsPaused(false);
          stopProgressTracking();
        }
      });
    } catch (err) {
      setError('Error playing speech: ' + err.message);
      setIsSpeaking(false);
      setIsPaused(false);
      stopProgressTracking();
    }
  };

  const pauseSpeaking = () => {
    if (window.responsiveVoice) {
      window.responsiveVoice.pause();
      setIsPaused(true);
      stopProgressTracking();
    }
  };

  const resumeSpeaking = () => {
    if (window.responsiveVoice) {
      window.responsiveVoice.resume();
      setIsPaused(false);
      startProgressTracking(currentTime);
    }
  };

  const stopSpeaking = () => {
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setProgress(0);
      setCurrentTime(0);
      stopProgressTracking();
    }
  };

  const skipForward = () => {
    if (window.responsiveVoice && isSpeaking) {
      const newTime = Math.min(currentTime + 5, duration);
      // Calculate approximate character position (20 chars per second)
      const charPosition = Math.floor(newTime * 20);
      const remainingText = extractedText.substring(charPosition);
      
      // Stop current playback
      window.responsiveVoice.cancel();
      
      // Start new playback from the new position
      const selectedVoice = voiceLanguageOptions.find(option => option.name === selectedLanguage);
      window.responsiveVoice.speak(remainingText, selectedVoice.code, {
        onstart: () => {
          startTimeRef.current = Date.now() - (newTime * 1000);
          startProgressTracking(newTime);
        },
        onend: () => {
          setIsSpeaking(false);
          setIsPaused(false);
          setProgress(1);
          setCurrentTime(duration);
          stopProgressTracking();
        }
      });
      
      setCurrentTime(newTime);
      setProgress(newTime / duration);
    }
  };

  const skipBackward = () => {
    if (window.responsiveVoice && isSpeaking) {
      const newTime = Math.max(currentTime - 5, 0);
      // Calculate approximate character position (20 chars per second)
      const charPosition = Math.floor(newTime * 20);
      const remainingText = extractedText.substring(charPosition);
      
      // Stop current playback
      window.responsiveVoice.cancel();
      
      // Start new playback from the new position
      const selectedVoice = voiceLanguageOptions.find(option => option.name === selectedLanguage);
      window.responsiveVoice.speak(remainingText, selectedVoice.code, {
        onstart: () => {
          startTimeRef.current = Date.now() - (newTime * 1000);
          startProgressTracking(newTime);
        },
        onend: () => {
          setIsSpeaking(false);
          setIsPaused(false);
          setProgress(1);
          setCurrentTime(duration);
          stopProgressTracking();
        }
      });
      
      setCurrentTime(newTime);
      setProgress(newTime / duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const extractTextFromPDF = async (file) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Preserve the original text items with their positions
        const items = textContent.items;
        let lastY = null;
        let lastX = null;
        
        for (const item of items) {
          const currentY = item.transform[5];
          const currentX = item.transform[4];
          
          // Add double newline when y position changes significantly (likely a title or subtitle)
          if (lastY !== null && Math.abs(lastY - currentY) > 25) {
            fullText += '\n\n';
          }
          // Add single newline for smaller vertical changes (new line in PDF)
          else if (lastY !== null && Math.abs(lastY - currentY) > 8) {
            fullText += '\n';
          }
          // Add space when x position changes significantly (new word in PDF)
          else if (lastX !== null && Math.abs(lastX - currentX) > 5) {
            fullText += ' ';
          }
          
          // Skip if the text is just a page number (usually at the bottom of the page)
          const isPageNumber = /^\d+$/.test(item.str.trim());
          if (!isPageNumber) {
            fullText += item.str;
          }
          
          lastY = currentY;
          lastX = currentX;
        }
      }
      
      // Clean up the text while preserving formatting
      fullText = fullText
        .replace(/\n{3,}/g, '\n\n')  // Replace 3+ newlines with 2
        .replace(/\n\s*\n/g, '\n\n') // Remove empty lines with only spaces
        .replace(/\n\n\s*\n\n/g, '\n\n') // Remove multiple double line breaks
        .trim();
      
      setExtractedText(fullText);
    } catch (err) {
      setError('Error extracting text from PDF: ' + err.message);
      console.error('PDF extraction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const validateFileType = (file) => {
    console.log('file type', file.type);
    if (!supportedFileTypes.includes(file.type)) {
      throw new Error('Unsupported file format');
    }
    return true;
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      try {
        validateFileType(file);
        setUploadedFile(file);
        if (supportedFileTypes.includes(file.type)) {
          extractTextFromPDF(file);
        } else {
          setError('File type not supported for text extraction');
        }
      } catch (err) {
        setError(err.message);
        setUploadedFile(null);
        setExtractedText('');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/epub+zip': ['.epub'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  const getFileTypeDisplay = (fileType) => {
    switch (fileType) {
      case 'application/pdf':
        return 'PDF Document';
      case 'application/epub+zip':
        return 'EPUB Book';
      case 'application/msword':
        return 'Word Document (DOC)';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'Word Document (DOCX)';
      default:
        return 'Unknown Format';
    }
  };

  const getFileTypeIcon = (fileType) => {
    switch (fileType) {
      case 'application/pdf':
        return pdfIcon;
      case 'application/epub+zip':
        return epubIcon;
      case 'application/msword':
        return docIcon;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return docxIcon;
      default:
        return document;
    }
  };

  const handleTextInput = (e) => {
    setInputText(e.target.value);
    setExtractedText(e.target.value);
  };

  const switchToTextInput = () => {
    setIsTextInputMode(true);
    setUploadedFile(null);
    setExtractedText('');
    setError(null);
    stopSpeaking();
  };

  const switchToFileUpload = () => {
    setIsTextInputMode(false);
    setInputText('');
    setExtractedText('');
    setError(null);
    stopSpeaking();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProgressBarClick = (e) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = clickPosition * duration;
    
    seekToPosition(newTime);
  };

  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = clickPosition * duration;
    
    setCurrentTime(newTime);
    setVisualProgress(clickPosition);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    seekToPosition(currentTime);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const seekToPosition = (newTime) => {
    if (!window.responsiveVoice) return;
    
    const charPosition = Math.floor(newTime * 20);
    const remainingText = extractedText.substring(charPosition);
    
    window.responsiveVoice.cancel();
    setCurrentTime(newTime);
    setVisualProgress(newTime / duration);
    
    const selectedVoice = voiceLanguageOptions.find(option => option.name === selectedLanguage);
    window.responsiveVoice.speak(remainingText, selectedVoice.code, {
      onstart: () => {
        setIsSpeaking(true);
        startProgressTracking(newTime);
      },
      onend: () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setVisualProgress(1);
        setCurrentTime(duration);
        stopProgressTracking();
      },
      onerror: () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setError('Error playing speech');
        stopProgressTracking();
      }
    });
  };

  useEffect(() => {
    return () => {
      stopProgressTracking();
    };
  }, []);

  return (
    <div className="app-container">
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h2>
              {isTextInputMode ? (
                <span>
                  1. <span className="clickable" onClick={switchToFileUpload}>Upload your document</span> or add your text
                </span>
              ) : (
                <span>
                  1. Upload your document or <span className="clickable" onClick={switchToTextInput}>add your text</span>
                </span>
              )}
            </h2>
          </div>
        </section>

        <section className="converter-section">
          {isTextInputMode ? (
            <div className="text-input-container">
              <textarea
                className="text-input"
                value={inputText}
                onChange={handleTextInput}
                placeholder="Paste your text here..."
                rows={10}
              />
            </div>
          ) : (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {uploadedFile ? (
                <div className="uploaded-file">
                  <div className="file-info">
                    <img 
                      src={getFileTypeIcon(uploadedFile.type)} 
                      alt={`${getFileTypeDisplay(uploadedFile.type)} icon`} 
                      className="file-type-icon"
                    />
                    <div className="file-details">
                      <p className="file-name">{uploadedFile.name}</p>
                      <div className="file-meta">
                        <span className="file-type">{getFileTypeDisplay(uploadedFile.type)}</span>
                        <span className="file-size">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="remove-file"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                      setExtractedText('');
                      setError(null);
                      stopSpeaking();
                    }}
                  >
                    Remove file
                  </button>
                </div>
              ) : isDragActive ? (
                <p>Drop the PDF file here...</p>
              ) : (
                <div className="dropzone-content">
                  <div className="upload-icon">
                    <img src={document} alt="PDF Icon" />
                  </div>
                  <p>Drag and drop a PDF file here, or click to select one</p>
                </div>
              )}
            </div>
          )}

          {isLoading && (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Extracting text from PDF...</p>
            </div>
          )}

          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}

          {extractedText && (
            <div>
              <section className="hero-section">
                <div className="hero-content">
                  <h2>
                    <span>2. Select language and listen</span>
                  </h2>
                </div>
              </section>
              <div className="speech-settings-container">
                <div className="language-and-status-row">
                  <div className="language-section">
                    <div className="language-selector">
                      <LanguageDropdown
                        selectedLanguage={selectedLanguage}
                        onLanguageChange={(language) => setSelectedLanguage(language)}
                        languageOptions={voiceLanguageOptions}
                        direction="up"
                      />
                    </div>
                  </div>
                </div>

                <div className="listening-section">
                  <div className="speech-controls">
                    {!isVoiceReady ? (
                      <div className="voice-loading-container">
                        <div className="loading-spinner"></div>
                        <p className="voice-loading">Loading speech synthesis...</p>
                      </div>
                    ) : (
                      <div className="audio-player">
                        <div className="player-header">
                          {isSpeaking && !isPaused && (
                            <div className="sound-waves">
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          )}
                          <p className="now-playing">{isSpeaking ? `${uploadedFile ? uploadedFile.name : 'Your text'}` : 'Ready to play'}</p>
                        </div>
                        <div className="progress-container">
                          <div className="time current">{formatTime(currentTime)}</div>
                          <div 
                            className="progress-bar"
                            ref={progressBarRef}
                            onClick={handleProgressBarClick}
                          >
                            <div 
                              className="progress" 
                              style={{ width: `${visualProgress * 100}%` }}
                            />
                            <div 
                              className="progress-thumb"
                              style={{ left: `${visualProgress * 100}%` }}
                              onMouseDown={handleThumbMouseDown}
                            />
                          </div>
                          <div className="time total">{formatTime(duration)}</div>
                        </div>
                        <div className="player-controls">
                          <button 
                            className="control-btn play"
                            onClick={!isSpeaking ? speakText : (isPaused ? resumeSpeaking : pauseSpeaking)}
                            disabled={!extractedText}
                            title={!isSpeaking ? "Play" : (isPaused ? "Resume" : "Pause")}
                          >
                            <svg viewBox="0 0 24 24">
                              {!isSpeaking ? (
                                <path d="M8 5v14l11-7z"/>
                              ) : isPaused ? (
                                <path d="M8 5v14l11-7z"/>
                              ) : (
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                              )}
                            </svg>
                          </button>
                          <button 
                            className="control-btn stop"
                            onClick={stopSpeaking}
                            disabled={!isSpeaking}
                            title="Stop"
                          >
                            <svg viewBox="0 0 24 24">
                              <path d="M6 6h12v12H6z"/>
                            </svg>
                          </button>
                          <button 
                            className="control-btn skip-backward"
                            onClick={skipBackward}
                            disabled={!isSpeaking}
                            title="Skip backward 5 seconds"
                          >
                            <svg viewBox="0 0 24 24">
                              <path d="M11.5 12l8.5 6V6l-8.5 6z"/>
                            </svg>
                          </button>
                          <button 
                            className="control-btn skip-forward"
                            onClick={skipForward}
                            disabled={!isSpeaking}
                            title="Skip forward 5 seconds"
                          >
                            <svg viewBox="0 0 24 24">
                              <path d="M4 18l8.5-6L4 6v12z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
