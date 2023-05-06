import { Observable, of } from "rxjs";

//** Mock class for the ApiService */
export class MockApiService {

    mockFilm = {
        id: "1",
        title: "A film",
        year: "2001",
        rated: "",
        released: "",
        runtime: "",
        genre: "",
        director: "",
        writer: "",
        actors: "",
        plot: "A test plot",
        language: "",
        country: "",
        awards: "",
        poster: "",
        metascore: "",
        imdbRating: "",
        imdbVotes: "",
        imdbID: "",
        type: "film",
        response: "",
        images: [
            {
                "id": 0,
                "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Nicolas_Cage_Deauville_2013.jpg/220px-Nicolas_Cage_Deauville_2013.jpg"
            }
        ]
    };

    getFilms(): Observable<any> {
        return of([this.mockFilm]);
    }

    addFilm(film: any): Observable<any> {
        return of(this.mockFilm);
    }

    updateFilm(film: any): Observable<any> {
        return of(this.mockFilm);
    }

    deleteFilm(filmId: number): Observable<any> {
        return of(true);
    }
}