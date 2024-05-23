
export interface Movie {
  Title: string;
  Runtime: string;
  Poster: string;
}

export interface State {
  favorites: string[];
  watchLater: string[];
}

export type Action =
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'TOGGLE_WATCH_LATER'; payload: string }