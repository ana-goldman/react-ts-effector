import React, { useEffect } from 'react';
import { useStore } from 'effector-react'
import { useNavigate } from 'react-router-dom';
import * as model from './model'

import BootstrapTable from 'react-bootstrap-table-next';

const EpisodeList: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    model.fetchEpisodesFx('https://rickandmortyapi.com/api/episode');
  }, []);

  const products = useStore(model.$episodes);
  const columns = [{
    dataField: 'id',
    text: 'ID',
    sort: true
  }, 
  {
    dataField: 'name',
    text: 'Name',
    sort: true
  }, 
  {
    dataField: 'air_date',
    text: 'Air Date',
    sort: true
  },
  {
    dataField: 'episode',
    text: 'Episode N',
    sort: true
  },
  {
    dataField: 'characters.length',
    text: 'Number of characters',
    sort: true,
    // hidden: true
  }];

  const rowEvents = {
    onClick: (e: any, row: { id: string; }, rowIndex: any) => navigate(`/episode/${row.id}`)
  };

  return (
    <>
      <h1 className="header">Rick and Morty: List of Episodes</h1>
      <h3>Season 1</h3>
      <BootstrapTable striped bordered hover keyField='id' data={ products } columns={ columns } rowEvents={ rowEvents } />
    </>
  );
};

export default EpisodeList;