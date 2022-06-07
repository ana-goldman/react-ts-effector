import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStore } from 'effector-react';
import * as model from './model';
import * as charModel from '../Character/model';
import { Location, Character } from '../../modules/types';
import { Card, Figure } from 'react-bootstrap';
import { getList } from '../../modules/getList';
import { nanoid } from 'nanoid';

const LocationPage: React.FC = () => {
  const { id } = useParams<{id?: string}>(); 
  const location:Location = useStore(model.$location);
  const characters:Character[] = useStore(charModel.$characters);
  const residentList:Array<string> = [];

  useEffect(() => {
    model.fetchLocationFx(`https://rickandmortyapi.com/api/location/${id}`);
  }, [id]);

  location.residents && location.residents.map((each:string) => getList(each, residentList));

  useEffect(() => {
    if (residentList.length > 0) charModel.fetchCharactersFx(`https://rickandmortyapi.com/api/character/${residentList}`);
  }, [location]);

  return (
    <>
      <Card className='text-center' >
        <Card.Header as="h1">
          {location.name}
          <Card.Title>Type: {location.type}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Dimension: {location.dimension}</Card.Subtitle>
        </Card.Header>
        <Card.Body className='d-flex flex-wrap gap-3 justify-content-evenly'>
          {characters.map((each:Character) => 
            <Card.Link href={`/character/${each.id}`} key={nanoid()}>
              <Figure className="d-flex flex-column align-items-center">
                <Figure.Image
                  width={300}
                  height={300}
                  alt={each.name}
                  src={each.image}
                  thumbnail={true}
                />
                <Figure.Caption>{each.name}</Figure.Caption>
              </Figure>
            </Card.Link>)}
        </Card.Body>
        
      </Card>
    </>
  )
}

export default LocationPage;