import { createEffect, createStore } from 'effector';

import { Location } from '../../modules/types';

//fetch location
export const fetchLocationFx = createEffect(async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return await response.json();
});

// creating store 
export const $location = createStore<Location>({} as Location).on(
  fetchLocationFx.doneData,
  (state, character) => character as Location
);

// $location.watch(console.log)