import { Observable, of } from "rxjs";
import { Film } from "../models/film-model";
import { Title } from "@angular/platform-browser";

//** Mock class for the ApiService */
export class MockApiService {

    private mockFilm: Film = new Film();

    public constructor() {
        this.mockFilm = new Film();
        this.mockFilm.title = 'A film';
        this.mockFilm.year = '2001';
        this.mockFilm.plot = 'Test plot';
        this.mockFilm.type = 'film';
    }

    getFilms(): Observable<Film[]> {
        return of([this.mockFilm]);
    }

    addFilm(film: Film): Observable<Film> {
        return of(this.mockFilm);
    }

    updateFilm(film: Film): Observable<Film> {
        return of(this.mockFilm);
    }

    deleteFilm(filmId: number): Observable<any> {
        return of(true);
    }
}