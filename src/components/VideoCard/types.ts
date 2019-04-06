export type VideoType = 'movie' | 'series' | 'episode';

export interface Video {
  Poster: string,
  Title: string,
  Type: VideoType,
  Year: string,
  imdbID: string,
}
