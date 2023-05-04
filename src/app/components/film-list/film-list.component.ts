import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { FilmModalComponent } from '../film-modal/film-modal.component';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  films: any;

  demoFilm = {
    id: "0",
    title: "Demo Film",
    year: "2001",
    rated: "PG-13",
    released: "2001",
    runtime: "139 mins",
    genre: "horror",
    director: "Nicolas Cage",
    writer: "Nicolas Cage",
    actors: "Nicolas Cage",
    plot: "Nicolas Cage being Nicolas Cage",
    language: "English",
    country: "UK",
    awards: "None",
    poster: "None",
    metascore: "100",
    imdbRating: "10",
    imdbVotes: "10000",
    imdbID: "abc",
    type: "movie",
    response: "True",
    images: [
      {
        "id": 0,
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Nicolas_Cage_Deauville_2013.jpg/220px-Nicolas_Cage_Deauville_2013.jpg"
      }
    ]
  };

  constructor(private apiService: ApiServiceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    // initial load of films
    this.getFilms();
  }

  //** Get all the films to display */
  getFilms() {
    this.apiService.getFilms()
      .subscribe(
        response => {
          this.films = response;
        },
        error => {
          console.log(error);
        });
  }

  //** Open the modal to prompt for title and on success refresh the film list */
  onAdd(): void {
    this.modalService.open(FilmModalComponent).result.then(
      (result) => { },
      (reason) => {
        this.getFilms()
      },
    );
  }

  //** Update film with demo data */
  onUpdate(film: any) {

    // TODO: quick way to show update working, but isn't taking any user input
    film.title = film.title + " updated at: " + moment(new Date()).format('DD-MM-YY HH:mm:ss')

    this.apiService.updateFilm(film)
      .subscribe(
        response => {
          this.getFilms();
        },
        error => {
          console.log(error);
        });
  }

  //** Delete the selected film and then refesh the film list */
  onDelete(filmId: any): void {

    this.apiService.deleteFilm(filmId)
      .subscribe(
        response => {
          this.getFilms();
        },
        error => {
          console.log(error);
        });
  }

}
