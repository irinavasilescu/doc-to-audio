import './App.css';
import { useCallback, useState, useEffect } from 'react';
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
  const [isTextInputMode, setIsTextInputMode] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(voiceLanguageOptions[2].name); // US English Female
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      // Clean up ResponsiveVoice
      if (window.responsiveVoice) {
        window.responsiveVoice.cancel();
      }
      setIsVoiceReady(false);
    };
  }, []);

  const speakText = () => {
    if (!extractedText || !isVoiceReady) return;

    try {
      setIsSpeaking(true);
      const selectedVoice = voiceLanguageOptions.find(option => option.name === selectedLanguage);
      window.responsiveVoice.speak(extractedText, selectedVoice.code, {
        onend: () => {
          setIsSpeaking(false);
        },
        onerror: () => {
          setError('Error playing speech');
          setIsSpeaking(false);
        }
      });
    } catch (err) {
      setError('Error playing speech: ' + err.message);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
      setIsSpeaking(false);
    }
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
            <div className="extracted-text">
              <section className="hero-section">
                <div className="hero-content">
                  <h2>
                    <span>2. Review extracted text</span>
                  </h2>
                </div>
              </section>
              <div className="text-content">
                {extractedText}
              </div>
              <section className="hero-section">
                <div className="hero-content">
                  <h2>
                    <span>3. Select language and listen</span>
                  </h2>
                </div>
              </section>
              <div className="speech-settings-container">
                <div className="language-section">
                  <div className="section-header">
                    <h3>Select Voice</h3>
                    <p className="section-description">Choose your preferred voice and accent</p>
                  </div>
                  <div className="language-selector">
                    <LanguageDropdown
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={(language) => setSelectedLanguage(language)}
                      languageOptions={voiceLanguageOptions}
                      direction="up"
                    />
                  </div>
                </div>

                <div className="listening-section">
                  <div className="section-header">
                    <h3>Listening Controls</h3>
                    <p className="section-description">Control playback and adjust settings</p>
                  </div>
                  <div className="speech-controls">
                    {!isVoiceReady ? (
                      <div className="voice-loading-container">
                        <div className="loading-spinner"></div>
                        <p className="voice-loading">Loading speech synthesis...</p>
                      </div>
                    ) : (
                      <div className="speech-buttons">
                        <button 
                          className={`speak-btn ${isSpeaking ? 'playing' : ''}`}
                          onClick={isSpeaking ? stopSpeaking : speakText}
                        >
                          {isSpeaking ? (
                            <>
                              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                              </svg>
                              Stop
                            </>
                          ) : (
                            <>
                              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                              Start
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {isSpeaking && (
                <div className="speaking-indicator">
                  <div className="sound-waves">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <p>Listening to {uploadedFile ? uploadedFile.name : 'your text'}</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
