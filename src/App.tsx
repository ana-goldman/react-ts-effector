import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import EpisodeList from './components/EpisodeList/EpisodeList';
import EpisodePage from './components/EpisodePage/EpisodePage';
import CharacterPage from './components/Character/CharacterPage';
import LocationPage from './components/Location/LocationPage';

function App() {
  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <Router>
          <Routes>
            <Route path="/" element={<EpisodeList/>}/>
            <Route path="/episode/:id" element={<EpisodePage/>}/>
            <Route path="/character/:id" element={<CharacterPage/>}/>
            <Route path="/location/:id" element={<LocationPage/>}/>
          </Routes>
        </Router>
      </Container>
    </Container>
  );
}

export default App;
