import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-film-modal',
  templateUrl: './film-modal.component.html',
  styleUrls: ['./film-modal.component.css']
})
export class FilmModalComponent {

  title = new FormControl('');

  constructor(private modalService: NgbModal, private apiService: ApiService) { }

  // anonymous film object
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

  //** Save away changes and close the modal */
  onSave() {
    if (this.title.value !== null) {
      // use our title value in the film we will write
      this.emptyFilm.title = this.title.value?.toString();

      // call the api service to write this film away
      this.apiService.addFilm(this.emptyFilm)
        .subscribe(
          response => {
            // close the modal
            this.modalService.dismissAll();
          },
          error => {
            console.log(error);
          });
    }
  }

}
