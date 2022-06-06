import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStore } from 'effector-react'
import * as model from './model'
import { Figure, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Character } from '../../modules/types';
import { getList } from '../../modules/getList';

const CharacterPage:  React.FC = () => {
  const { id } = useParams<{id?: string}>(); 
  const character:Character = useStore(model.$character);
  let episodeList:Array<string> = [];

  useEffect(() => {
    model.fetchCharacterFx(`https://rickandmortyapi.com/api/character/${id}`);
  }, [id]);

  character.episode && character.episode.map((each:string) => getList(each, episodeList));

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
        {character.type && <ListGroupItem>Type: {character.type}</ListGroupItem>}
        <ListGroupItem>Gender: {character.gender}</ListGroupItem>
        {character.origin && <ListGroupItem>Origin: {character.origin.name}</ListGroupItem>}
        {character.location && <ListGroupItem>Location: {character.location.name}</ListGroupItem>}
        <ListGroupItem>Appears in episodes: {episodeList.map((each:string) => {
          return episodeList.indexOf(each) !== (episodeList.length - 1) ? `${each}, ` : each
        })}</ListGroupItem>
      </ListGroup>
    </>
  )
}

export default CharacterPage;