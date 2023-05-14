import { FilmImage } from "./film-image-model";

export class Film {
    id: number;
    title: string;
    year: string;
    rated: string;
    released: Date;
    runtimeMinutes: number;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    metascore: number;
    imdbRating: number;
    imdbVote: number;
    imdbId: string;
    type: string;
    response: boolean;
    images: FilmImage[];
}