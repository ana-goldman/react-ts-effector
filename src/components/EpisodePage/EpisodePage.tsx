import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStore } from 'effector-react'
import * as model from './model'
import * as charModel from '../Character/model'
import { Card } from 'react-bootstrap';
import { Episode } from '../types';
import CharacterPreview from '../Character/CharacterPreview';

const EpisodePage:  React.FC = () => {
  const { id } = useParams<{id?: string}>(); 
  const episode:{id: '', name: '', air_date: '', episode: '', characters: []} | Episode = useStore(model.$episode);
  let charcterList:Array<string> = [];

  const getCharactersList = (char: string | null) => {
    if (char) {
      const regex = /\d+/g;
      const string = char;
      const match:RegExpMatchArray | null = string.match(regex);
      if (match) return charcterList.push(match[0])
    }
  } 

  useEffect(() => {
    model.fetchEpisodeFx(`https://rickandmortyapi.com/api/episode/${id}`);
  }, [id]);

  episode.characters.map((each:string) => getCharactersList(each));

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
    </>
  )
}

export default EpisodePage;