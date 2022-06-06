import { createEvent, createEffect, createStore } from 'effector';

import { Episode } from '../../modules/types';

// creating store for the array of episodes
export const $episodes = createStore<Episode[]>([]);

//creating event that takes parametr of Episode
export const update = createEvent<Episode>();

//fetching episodes
export const fetchEpisodesFx = createEffect(async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const list = await response.json();
  if (list.info.next !== null) fetchEpisodesFx(list.info.next);
  list.results.map((o: any) => {return update(o)})
});

// handler for an update
const updateStore = (state: Episode[], data: Episode) => {  
  const episodeIndex = state.findIndex((episode) => episode.id === data.id);

  // changeing state
  if (episodeIndex > -1) {
    state.splice(episodeIndex, 1, data);
  } else {
    state.push(data);
  }

  //returning state
  return [...state];
};

//subscribing for an event in store
$episodes.on(update, updateStore);
// $episodes.watch(console.log)