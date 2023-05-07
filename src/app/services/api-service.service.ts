import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Film } from '../models/film-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  getFilms(): Observable<Film[]> {
    let url = environment.apiUrl + "/films";
    return this.http.get<Film[]>(url, this.httpOptions);
  }

  addFilm(film: Film): Observable<Film> {
    let url = environment.apiUrl + "/films";
    return this.http.post<Film>(url, JSON.stringify(film), this.httpOptions);
  }

  updateFilm(film: Film): Observable<Film> {
    let url = environment.apiUrl + "/films/" + film.id;
    return this.http.patch<Film>(url, JSON.stringify(film), this.httpOptions);
  }

  deleteFilm(filmId: number): Observable<any> {
    let url = environment.apiUrl + "/films/" + filmId;
    return this.http.delete(url);
  }
}
