import React, { useEffect } from 'react';
import { useList, useStore, useStoreMap } from 'effector-react'
import * as model from './model'
import { Episode } from '../../types';

import Table from 'react-bootstrap/Table';

const EpisodeList: React.FC = () => {
  useEffect(() => {
    model.fetchEpisodesFx('https://rickandmortyapi.com/api/episode');
  }, []);

  const episodes = useStore(model.$episodes)

  return (
    <>{console.log(episodes)}
      <h1 className="header">Rick and Morty: List of Episodes</h1>
      <h3>Season 1</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Air Date</th>
            <th>Episode N</th>
            <th>Number of characters</th>
          </tr>
        </thead>
        <tbody>
          {episodes && episodes.map((episode: Episode) => {
            return (
              <tr key={episode.id}>
                <td>{episode.id}</td>
                <td>{episode.name}</td>
                <td>{episode.air_date}</td>
                <td>{episode.episode}</td>
                <td>{episode.characters.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
};

export default EpisodeList;