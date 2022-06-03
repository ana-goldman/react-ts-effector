import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import EpisodeList from './components/EpisodeList/EpisodeList';
import Episode from './components/Episode/Episode';

function App() {
  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <Router>
          <Routes>
            <Route path="/" element={<EpisodeList/>}/>
            <Route path="/episode/:id" element={<Episode />}/>
          </Routes>
        </Router>
      </Container>
    </Container>
  );
}

export default App;
