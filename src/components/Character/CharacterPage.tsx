import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from 'effector-react';
import * as model from './model';
import * as eModel from '../EpisodeList/model';
import { Figure, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Character, Episode } from '../../modules/types';
import { getList } from '../../modules/getList';
import { nanoid } from 'nanoid';

const CharacterPage:  React.FC = () => {
  const { id } = useParams<{id?: string}>(); 
  const navigate = useNavigate();
  const character:Character = useStore(model.$character);
  const episodes:Episode[] = useStore(eModel.$episodes);
  const episodeList:Array<string> = [];

  useEffect(() => {
    model.fetchCharacterFx(`https://rickandmortyapi.com/api/character/${id}`);
  }, [id]);

  character.episode && character.episode.map((each:string) => getList(each, episodeList));

  useEffect(() => {
    if (episodeList.length > 0) eModel.fetchEpisodesFx(`https://rickandmortyapi.com/api/episode/${episodeList}`);
  }, [character]);

  const handleClick = (string: string) => {
    const id:number | undefined = getList(string, []);
    navigate(`/location/${id}`);
  }

  return (
    <>
      <Figure className="d-flex flex-column align-items-center">
        <Figure.Image
          width={300}
          height={300}
          alt={character.name}
          src={character.image}
          thumbnail={true}
        />
        <figcaption className="h1">{character.name}</figcaption>
      </Figure>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Status: {character.status}</ListGroupItem>
        <ListGroupItem>Species: {character.species}</ListGroupItem>
        {character.type && 
          <ListGroupItem>Type: {character.type}</ListGroupItem>
        }
        <ListGroupItem>Gender: {character.gender}</ListGroupItem>
        {character.origin && 
          <ListGroupItem>Origin: {character.origin.name}</ListGroupItem>
        }
        {(character.location && character.location.name !== 'unknown') && 
        <ListGroupItem style={{cursor:'pointer'}} onClick={() => handleClick(character.location.url)}>Location: {character.location.name}</ListGroupItem>
        }
        <ListGroupItem>Appears in episodes: {episodes.map((each:Episode) => {
          return <Link to={`/episode/${each.id}`} key={nanoid()}><br/>{each.name}</Link>
        })}</ListGroupItem>
      </ListGroup>
      <Button href={'http://localhost:3000/'} variant="secondary" style={{backgroundColor: 'rgba(0, 0, 0, 0.34)'}} className='my-3' size="lg">Main</Button>
      <Button onClick={() => navigate(-1)} variant="secondary" style={{backgroundColor: 'rgba(0, 0, 0, 0.34)'}} className='m-3' size="lg">Back</Button>
    </>
  )
}

export default CharacterPage;