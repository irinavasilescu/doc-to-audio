import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './converter/App';
import Landing from './landing/Landing';
import Header from './common/Header';

const Root = () => {
  return (
    <Router>
      <Header />
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