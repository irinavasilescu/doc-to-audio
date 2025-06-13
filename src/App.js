import './App.css';
import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceReady, setIsVoiceReady] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [textSections, setTextSections] = useState([]);

  useEffect(() => {
    // Load ResponsiveVoice script
    const script = document.createElement('script');
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=1fYy7Y8L';
    script.async = true;
    
    script.onload = () => {
      if (window.responsiveVoice) {
        setIsVoiceReady(true);
      }
    };
    
    script.onerror = () => {
      setError('Failed to load speech synthesis');
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Split text into sections when extractedText changes
  useEffect(() => {
    if (extractedText) {
      // Split text into smaller chunks (approximately 2-3 sentences each)
      const sentences = extractedText.match(/[^.!?]+[.!?]+/g) || [];
      const sections = [];
      let currentSection = '';
      
      for (const sentence of sentences) {
        if ((currentSection + sentence).length > 200) {
          if (currentSection) sections.push(currentSection.trim());
          currentSection = sentence;
        } else {
          currentSection += ' ' + sentence;
        }
      }
      
      if (currentSection) {
        sections.push(currentSection.trim());
      }
      
      setTextSections(sections);
      setCurrentSection(0);
    }
  }, [extractedText]);

  const speakNextSection = useCallback(() => {
    if (!isSpeaking || currentSection >= textSections.length) {
      setIsSpeaking(false);
      setCurrentSection(0);
      return;
    }

    const section = textSections[currentSection];
    if (!section) {
      setCurrentSection(prev => prev + 1);
      return;
    }

    window.responsiveVoice.speak(section, "US English Female", {
      onend: () => {
        setCurrentSection(prev => prev + 1);
      },
      onerror: () => {
        setError('Error playing speech');
        setIsSpeaking(false);
      }
    });
  }, [currentSection, textSections, isSpeaking]);

  // Effect to handle section progression
  useEffect(() => {
    if (isSpeaking && currentSection < textSections.length) {
      speakNextSection();
    } else if (currentSection >= textSections.length) {
      setIsSpeaking(false);
      setCurrentSection(0);
    }
  }, [currentSection, isSpeaking, textSections.length, speakNextSection]);

  const speakText = () => {
    if (!extractedText || !isVoiceReady || textSections.length === 0) return;

    try {
      setIsSpeaking(true);
      setCurrentSection(0);
    } catch (err) {
      setError('Error playing speech: ' + err.message);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
      setIsSpeaking(false);
      setCurrentSection(0);
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

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      extractTextFromPDF(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    }
  });

  return (
    <div className="App">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {uploadedFile ? (
          <div className="uploaded-file">
            <p>File uploaded: {uploadedFile.name}</p>
            <p className="file-size">Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            <button 
              className="remove-file"
              onClick={(e) => {
                e.stopPropagation();
                setUploadedFile(null);
                setExtractedText('');
                setError(null);
                stopSpeaking();
                setTextSections([]);
                setCurrentSection(0);
              }}
            >
              Remove file
            </button>
          </div>
        ) : isDragActive ? (
          <p>Drop the PDF file here...</p>
        ) : (
          <p>Drag and drop a PDF file here, or click to select one</p>
        )}
      </div>

      {isLoading && (
        <div className="loading">
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
          <h3>Extracted Text:</h3>
          <div className="text-content">
            {extractedText}
          </div>
          <div className="speech-controls">
            {!isVoiceReady ? (
              <p className="voice-loading">Loading speech synthesis...</p>
            ) : (
              <div className="speech-buttons">
                <button 
                  className="speak-btn"
                  onClick={isSpeaking ? stopSpeaking : speakText}
                >
                  {isSpeaking ? 'Stop Speaking' : 'Speak Text'}
                </button>
                {isSpeaking && (
                  <div className="progress">
                    Section {currentSection + 1} of {textSections.length}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
