import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadCV from './components/UploadCV';
import QueryCV from './components/Query';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QueryCV />} />
      </Routes>
    </Router>
  );
}

export default App;
