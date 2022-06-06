import React from 'react';
import { useParams } from 'react-router';

const CharacterPage:  React.FC = () => {
  const { id } = useParams<{id?: string}>(); 


  return (
    <>
      
    </>
  )
}

export default CharacterPage;