import React from 'react';
import { useStore } from 'effector-react'
import { useNavigate } from 'react-router-dom';
import * as model from './model'
import { Carousel } from 'react-bootstrap';
import { Character } from '../../modules/types';
import { nanoid } from 'nanoid';

const CharacterPreview:  React.FC = () => {
  const characters: Character[] | [] = useStore(model.$characters);
  const navigate = useNavigate();

  return (
    <>
      <Carousel style={{backgroundColor:"black", cursor: 'pointer'}}>
        {characters.map((each) => {
          return (
            <Carousel.Item key={nanoid()} onClick={()=> navigate(`/character/${each.id}`)}>
              <img
                className="img-fluid"
                src={each.image}
                alt="slide"
              />
              <Carousel.Caption>
                <h3>{each.name}</h3>
                <p>{each.gender} / {each.species} / {each.status}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
        
      </Carousel>
    </>
  )
}

export default CharacterPreview;