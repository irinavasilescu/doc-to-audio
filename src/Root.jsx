import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './converter/App';
import Landing from './landing/Landing';

const Root = () => {
  return (
    <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/home" replace />}
          />
          <Route
            path="/home"
            element={<Landing/>}
          />
          <Route
            path="/converter"
            element={<App/>}
          />
        </Routes>
    </Router>
  );
};

export default Root; 