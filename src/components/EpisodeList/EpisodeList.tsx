import React, { useEffect } from 'react';
import { useStore } from 'effector-react'
import { useNavigate } from 'react-router-dom';
import * as model from './model'
import { nanoid } from 'nanoid';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, ColumnToggle } from 'react-bootstrap-table2-toolkit';
import { ToolkitContextType } from 'react-bootstrap-table2-toolkit';
// import ToolkitProvider, { Search, ColumnToggle } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { ListOfSeasons } from '../../modules/types';

const EpisodeList: React.FC = () => {
  const episodes = useStore(model.$episodes);
  const list:ListOfSeasons = {};
  const navigate = useNavigate();
  const { ToggleList } = ColumnToggle;
  const { SearchBar, ClearSearchButton } = Search;
  const columns:any = [{
    dataField: 'id',
    text: 'ID',
    sort: true,
    style: { cursor: 'pointer' },
    events: {
      onClick: ( e: any, column: 'id', columnIndex: 0, row: { id: number; }, rowIndex: any) => navigate(`/episode/${row.id}`)
    }
  }, 
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
  }, 
  {
    dataField: 'air_date',
    text: 'Air Date',
    sort: true,
  },
  {
    dataField: 'episode',
    text: 'Episode N',
    sort: true,
  },
  {
    dataField: 'characters.length',
    text: 'Number of characters',
    sort: true,
  }];

  useEffect(() => {
    model.fetchEpisodesFx('https://rickandmortyapi.com/api/episode');
  }, []);

  useStore(model.$episodes).forEach(episode => {
    const num: string = episode.episode.slice(0,3);
    if (!Object.keys(list).includes(num)) {
      list[num] = [];
    }
  })

  Object.entries(list).forEach(([key, value]) => {
    list[key] = episodes.filter(o => o.episode.includes(key))
  });

  return (
    <>
      <h1 className="header">Rick and Morty: List of Episodes</h1>
      {Object.entries(list).map((season) => {
        return <>
          <h3 key={nanoid()}>{`Season ${season[0].slice(2,3)}`}</h3>
          <ToolkitProvider
            keyField="id"
            data={ season[1] }
            columns={ columns }
            columnToggle
            search
          >
            {
              (props: ToolkitContextType) => (
                <div>
                  <ToggleList { ...props.columnToggleProps } />
                  <hr />
                  <SearchBar { ...props.searchProps } />
                  <ClearSearchButton { ...props.searchProps } />
                  <hr />
                  <BootstrapTable
                    { ...props.baseProps }
                  />
                </div>
              )
            }
          </ToolkitProvider>
          
          
          {/* <BootstrapTable striped bordered hover keyField='id' data={ season[1] } columns={ columns } filter={ filterFactory() }/> */}
        </>
      })}
    </>
  );
};

export default EpisodeList;