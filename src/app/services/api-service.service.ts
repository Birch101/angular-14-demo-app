import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  getFilms(): Observable<any> {
    let url = environment.apiUrl + "/films";
    return this.http.get(url, this.httpOptions);
  }

  addFilm(film: any): Observable<any> {
    let url = environment.apiUrl + "/films";
    return this.http.post(url, JSON.stringify(film), this.httpOptions);
  }

  updateFilm(film: any): Observable<any> {
    let url = environment.apiUrl + "/films/" + film.id;
    return this.http.patch(url, JSON.stringify(film), this.httpOptions);
  }

  deleteFilm(filmId: number): Observable<any> {
    let url = environment.apiUrl + "/films/" + filmId;
    return this.http.delete(url);
  }
}
