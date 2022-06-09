import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'effector-react'
import * as model from './model'
import * as charModel from '../Character/model'
import { Card, Button } from 'react-bootstrap';
import { Episode } from '../../modules/types';
import CharacterPreview from '../Character/CharacterPreview';
import { getList } from '../../modules/getList';

const EpisodePage:  React.FC = () => {
  const { id } = useParams<{id?: string}>(); 
  const navigate = useNavigate();
  const episode:Episode = useStore(model.$episode);
  let charcterList:Array<string> = [];

  useEffect(() => {
    model.fetchEpisodeFx(`https://rickandmortyapi.com/api/episode/${id}`);
  }, [id]);

  episode.characters && episode.characters.map((each:string) => getList(each, charcterList));

  useEffect(() => {
    if (charcterList.length > 0) charModel.fetchCharactersFx(`https://rickandmortyapi.com/api/character/${charcterList}`);
  }, [episode]);

  return (
    <>
      <Card className="text-center">
        <Card.Header as="h1">{episode.name}</Card.Header>
        <Card.Body>
          <Card.Title>Here is more about the episode {episode.episode}</Card.Title>
          <Card.Text>Aired on {episode.air_date}</Card.Text>
          <CharacterPreview/>
        </Card.Body>
      </Card>
      <Button href={'http://localhost:3000/'} variant="secondary" style={{backgroundColor: 'rgba(0, 0, 0, 0.34)'}} className='my-3' size="lg">Main</Button>
      <Button onClick={() => navigate(-1)} variant="secondary" style={{backgroundColor: 'rgba(0, 0, 0, 0.34)'}} className='m-3' size="lg">Back</Button>
    </>
  )
}

export default EpisodePage;