export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<number>;
}

export interface ListOfSeasons {
  [key:string]: Array<Episode>
}
