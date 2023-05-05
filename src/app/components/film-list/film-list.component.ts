import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  films: any;

  emptyFilm = {
    id: "0",
    title: "",
    year: "",
    rated: "",
    released: "",
    runtime: "",
    genre: "",
    director: "",
    writer: "",
    actors: "",
    plot: "",
    language: "",
    country: "",
    awards: "",
    poster: "",
    metascore: "",
    imdbRating: "",
    imdbVotes: "",
    imdbID: "",
    type: "",
    response: "",
    images: [
      {
        "id": 0,
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Nicolas_Cage_Deauville_2013.jpg/220px-Nicolas_Cage_Deauville_2013.jpg"
      }
    ]
  };

  constructor(private apiService: ApiService, private modalService: NgbModal, private toastr: ToastrService) { }

  title = new FormControl('');

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
    if (this.title.value !== null) {
      // use our title value in the film we will write
      this.emptyFilm.title = this.title.value?.toString();

      // call the api service to write this film away
      this.apiService.addFilm(this.emptyFilm)
        .subscribe(
          response => {
            this.toastr.success("Film added successfully!", "Success");
            // clear the field
            this.title.setValue('');
            // close the modal
            this.getFilms();
          },
          error => {
            this.toastr.error("Failed to add film.", "Failure");
            console.log(error);
          });
    }
  }

  //** Update film with demo data */
  onUpdate(film: any) {

    // TODO: quick way to show update working, but isn't taking any user input
    film.title = film.title + " updated at: " + moment(new Date()).format('DD-MM-YY HH:mm:ss')

    this.apiService.updateFilm(film)
      .subscribe(
        response => {
          this.toastr.success("Film updated successfully!", "Success");
          this.getFilms();
        },
        error => {
          this.toastr.error("Failed to update film.", "Failure");
          console.log(error);
        });
  }

  //** Delete the selected film and then refesh the film list */
  onDelete(filmId: any): void {

    this.apiService.deleteFilm(filmId)
      .subscribe(
        response => {
          this.toastr.success("Film deleted successfully!", "Success");
          this.getFilms();
        },
        error => {
          this.toastr.error("Failed to delete film.", "Failure");
          console.log(error);
        });
  }

}
