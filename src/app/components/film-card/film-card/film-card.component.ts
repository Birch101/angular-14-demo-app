import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Film } from 'src/app/models/film-model';
import { ApiService } from 'src/app/services/api-service.service';
import { FilmModalComponent } from '../../film-modal/film-modal.component';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent {

  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faFloppyDisk = faFloppyDisk;

  @Input() public film: Film;
  @Output() filmDataChange = new EventEmitter<string>();

  constructor(private apiService: ApiService, private modalService: NgbModal, private toastr: ToastrService) { }

  //** Update film with demo data */
  onUpdate(film: Film) {
    const modal = this.modalService.open(FilmModalComponent);

    // pass the selected film to the modal
    modal.componentInstance.filmToUpdate = film;

    modal.result.then(
      (result) => { },
      (reason) => {
        this.filmDataChange.emit("Updated");
      },
    );
  }

    //** Delete the selected film and then refesh the film list */
    onDelete(filmId: number): void {
      this.apiService.deleteFilm(filmId)
        .subscribe(
          response => {
            this.toastr.success("Film deleted successfully!", "Success");
            this.filmDataChange.emit("Deleted");
          },
          error => {
            this.toastr.error("Failed to delete film.", "Failure");
            console.log(error);
          });
    }

}
