import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Film } from 'src/app/models/film-model';
import { ApiService } from 'src/app/services/api-service.service';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ValidatedTextFieldComponent } from '../validated-text-field/validated-text-field.component';
import { ValidatedNumberFieldComponent } from '../validated-number-field/validated-number-field.component';
import { ValidatedTextareaFieldComponent } from '../validated-textarea-field/validated-textarea-field.component';

@Component({
  selector: 'app-add-film-card',
  templateUrl: './add-film-card.component.html',
  styleUrls: ['./add-film-card.component.scss']
})
export class AddFilmCardComponent {

  faFloppyDisk = faFloppyDisk;

  @Output() filmDataChange = new EventEmitter<string>();

  @ViewChild(ValidatedTextFieldComponent) titleField: ValidatedTextFieldComponent;
  @ViewChild(ValidatedNumberFieldComponent) yearField: ValidatedNumberFieldComponent;
  @ViewChild(ValidatedTextareaFieldComponent) plotField: ValidatedTextareaFieldComponent;

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  //** Open the modal to prompt for title and on success refresh the film list */
  onAdd(): void {
    if (this.titleField.formControl.value !== null && this.yearField.formControl.value !== null && this.plotField.formControl !== null) {
      let addFilm: Film = new Film();

      addFilm = {
        ...addFilm,
        title: this.titleField.formControl.value?.toString(),
        year: this.yearField.formControl.value?.toString() ?? "",
        plot: this.plotField.formControl.value?.toString() ?? "",
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
    this.titleField.resetField();
    this.yearField.resetField();
    this.plotField.resetField();
  }

  //** Determine if save should be disabled or not based on state of form controls */
  isSaveDisabled() {
    if (!this.titleField || !this.titleField.formControl || !this.yearField || !this.yearField.formControl) {
      return true;
    }

    if (this.titleField.formControl.invalid || this.yearField.formControl.invalid || this.plotField.formControl.invalid) {
      return true;
    }

    return false;
  }
}
