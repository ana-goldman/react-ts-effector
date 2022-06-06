import { createEffect, createStore } from 'effector';

import { Episode } from '../../modules/types';

//fetching episode
export const fetchEpisodeFx = createEffect(async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return await response.json();
});

// creating store with an episode fetched 
export const $episode = createStore<Episode>({} as Episode)
.on(
  fetchEpisodeFx.doneData,
  (state, episode) => episode as Episode
);

// $episode.watch(console.log)