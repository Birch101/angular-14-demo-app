import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { FilmModalComponent } from '../film-modal/film-modal.component';
import { Film } from 'src/app/models/film-model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  //** List of films to display */
  filmsList: Film[] = [];

  searchText: string;

  title = new FormControl('');
  year = new FormControl('');
  plot = new FormControl('');

  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faFloppyDisk = faFloppyDisk;
  loading = false;

  constructor(private apiService: ApiService, private modalService: NgbModal, private toastr: ToastrService) { }

  //** Load films on initialization */
  ngOnInit(): void {
    // initial load of films
    this.getFilms();
  }

  //** Get all the films to display */
  getFilms() {
    this.loading = true;

    this.apiService.getFilms()
      .subscribe(
        response => {
          this.filmsList = response;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastr.error("Failed to display films.", "Failure");
          console.log(error);
        });
  }

  //** Open the modal to prompt for title and on success refresh the film list */
  onAdd(): void {
    if (this.title.value !== null && this.year !== null && this.plot !== null) {
      let addFilm: Film = new Film();

      addFilm = {
        ...addFilm,
        title: this.title.value?.toString(),
        year: this.year.value?.toString() ?? "",
        plot: this.plot.value?.toString() ?? "",
        // insert placeholder image
        images: [{id: 0, imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Nicolas_Cage_Deauville_2013.jpg/220px-Nicolas_Cage_Deauville_2013.jpg"}]
      }

      // call the api service to write this film away
      this.apiService.addFilm(addFilm)
        .subscribe(
          response => {
            this.toastr.success("Film added successfully!", "Success");
            this.resetFields();
            // refresh the film list
            this.getFilms();
          },
          error => {
            this.toastr.error("Failed to add film.", "Failure");
            console.log(error);
          });
    }
  }

  //** Update film with demo data */
  onUpdate(film: Film) {
    const modal = this.modalService.open(FilmModalComponent);

    // pass the selected film to the modal
    modal.componentInstance.filmToUpdate = film;

    modal.result.then(
      (result) => { },
      (reason) => {
        this.getFilms()
      },
    );

  }

  //** Delete the selected film and then refesh the film list */
  onDelete(filmId: number): void {
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

  //** Reset the fields text and validation errors. */
  resetFields() {
    this.title.setValue('');
    this.year.setValue('');
    this.plot.setValue('');

    this.title.markAsPristine();
    this.title.markAsUntouched();
    this.year.markAsPristine();
    this.year.markAsUntouched();
    this.plot.markAsPristine();
    this.plot.markAsUntouched();
  }

}
