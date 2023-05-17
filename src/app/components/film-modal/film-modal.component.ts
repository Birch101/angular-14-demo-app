import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Film } from 'src/app/models/film-model';
import { ApiService } from 'src/app/services/api-service.service';
import { ValidatedTextFieldComponent } from '../validated-text-field/validated-text-field.component';
import { ValidatedNumberFieldComponent } from '../validated-number-field/validated-number-field.component';
import { ValidatedTextareaFieldComponent } from '../validated-textarea-field/validated-textarea-field.component';

@Component({
  selector: 'app-film-modal',
  templateUrl: './film-modal.component.html',
  styleUrls: ['./film-modal.component.scss']
})
export class FilmModalComponent {

  //** Passed in film to update */
  @Input() public filmToUpdate: Film;

  @ViewChild(ValidatedTextFieldComponent) titleField: ValidatedTextFieldComponent;
  @ViewChild(ValidatedNumberFieldComponent) yearField: ValidatedNumberFieldComponent;
  @ViewChild(ValidatedTextareaFieldComponent) plotField: ValidatedTextareaFieldComponent;

  constructor(private modalService: NgbModal, private apiService: ApiService, private toastr: ToastrService) { }


  //** Save away changes and close the modal */
  onSave() {
    // set the title to the entered value
    this.filmToUpdate = {
      ...this.filmToUpdate,
      title: this.titleField.formControl.value?.toString() ?? "",
      year: this.constructYearValue(this.filmToUpdate.type, this.yearField.formControl.value?.toString() ?? ""),
      plot: this.plotField.formControl.value?.toString() ?? ""
    }

    this.apiService.updateFilm(this.filmToUpdate)
      .subscribe({
        complete: () => {
           this.toastr.success("Film updated successfully!", "Success");
           this.modalService.dismissAll();
        },
        error: (e) => {
          this.toastr.error("Failed to update film.", "Failure");
          console.log(e);
        }
      })
  }

  //** Close the modal. */
  onClose() {
    this.modalService.dismissAll();
  }

  //** Return true to disable save if any field invalid or no fields have been touched */
  isSaveDisabled() {
    if (!this.titleField || !this.titleField.formControl || !this.yearField || !this.yearField.formControl) {
      return true;
    }

    if (this.titleField.formControl.invalid || this.yearField.formControl.invalid || this.plotField.formControl.invalid) {
      return true;
    }

    if (!this.titleField.formControl.dirty && !this.yearField.formControl.dirty && !this.plotField.formControl.dirty) {
      return true;
    }

    return false;
  }

  //** Construct an appropriate year string based on if it is a series or not */
  // TODO: move this to somewhere shared
  constructYearValue(type: string, year: string) {
    if (type.toLowerCase() === 'series') {
      // series year return in format of '2001-'
      return this.extractYearValue(year).toString() + "-" ?? ""
    }

    return this.extractYearValue(year) ?? "";
  }

  //** Extract the first year in a '2001-2002' type year range string or return an empty string */
  // TODO: move this to somewhere shared
  extractYearValue(yearString: string) {
    if (yearString) {
      var match = yearString.match(/\d*/g);

      if (match !== null && match.length > 0) {
        return match[0];
      }
    }
    return "";
  }

}
