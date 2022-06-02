import { createEffect, createStore } from 'effector';

export const fetchEpisodesFx = createEffect(async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return await response.json();
});

export const $episodes = createStore([]).on(
  fetchEpisodesFx.doneData,
  (state, episodes) => episodes.results as any
  // (state, episodes) => [...state, (() => {
  //   if (episodes.info.next !== null) fetchEpisodesFx(episodes.info.next)
  //   return episodes.results
  // })()] as any
);

$episodes.watch(console.log);