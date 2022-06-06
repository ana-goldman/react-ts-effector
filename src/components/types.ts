export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
}

export interface ListOfSeasons {
  [key:string]: Array<Episode>
}

export interface Character {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: Object,
  location: Object,
  image: string,
  episode: Array<[]>,
}