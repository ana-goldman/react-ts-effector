import { createEffect, createStore } from 'effector';

import { Character } from '../types';

//fetching characters
export const fetchCharactersFx = createEffect(async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return await response.json();
});

// creating store with characters
export const $characters = createStore<Character[]>([]).on(
  fetchCharactersFx.doneData,
  (state, characters) => characters as Character[]
);

// $characters.watch(console.log)