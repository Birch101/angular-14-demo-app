import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Film } from 'src/app/models/film-model';
import { ApiService } from 'src/app/services/api-service.service';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-film-card',
  templateUrl: './add-film-card.component.html',
  styleUrls: ['./add-film-card.component.scss']
})
export class AddFilmCardComponent {

  title = new FormControl('');
  year = new FormControl('');
  plot = new FormControl('');

  faFloppyDisk = faFloppyDisk;

  @Output() filmDataChange = new EventEmitter<string>();

  constructor(private apiService: ApiService, private modalService: NgbModal, private toastr: ToastrService) { }

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
        images: [{ id: 0, imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Nicolas_Cage_Deauville_2013.jpg/220px-Nicolas_Cage_Deauville_2013.jpg" }]
      }

      // call the api service to write this film away
      this.apiService.addFilm(addFilm)
        .subscribe({
          complete: () => {
            this.toastr.success("Film added successfully!", "Success");
            this.resetFields();
            // refresh the film list
            this.filmDataChange.emit("Added");
          },
          error: (e) => {
            this.toastr.error("Failed to add film.", "Failure");
            console.log(e);
          }
        })
    }
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
