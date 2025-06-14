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
            path="/scribbloo"
            element={<Navigate to="/scribbloo/home" replace />}
          />
          <Route
            path="/scribbloo/home"
            element={<Landing/>}
          />
          <Route
            path="/scribbloo/converter"
            element={<App/>}
          />
        </Routes>
    </Router>
  );
};

export default Root; 