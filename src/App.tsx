import React from 'react';
import Container from 'react-bootstrap/Container';
import EpisodeList from './components/EpisodeList/EpisodeList';

function App() {
  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <EpisodeList/>
      </Container>
    </Container>
  );
}

export default App;
