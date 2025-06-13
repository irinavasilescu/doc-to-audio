import logo from './logo.svg';
import './App.css';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += `Page ${i}:\n${pageText}\n\n`;
      }
      
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
        </div>
      )}
    </div>
  );
}

export default App;
