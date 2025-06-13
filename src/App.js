import logo from './logo.svg';
import './App.css';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
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
    </div>
  );
}

export default App;
