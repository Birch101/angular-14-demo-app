import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-film-modal',
  templateUrl: './film-modal.component.html',
  styleUrls: ['./film-modal.component.css']
})
export class FilmModalComponent implements OnInit {

  //** Passed in film to update */
  @Input() public filmToUpdate: any;

  public title = new FormControl('');
  public year = new FormControl('');
  public plot = new FormControl('');

  constructor(private modalService: NgbModal, private apiService: ApiService, private toastr: ToastrService) { }

  //** Display title of film being updated */
  ngOnInit() {
    this.populateForm();
  }

  //** Save away changes and close the modal */
  onSave() {
    // set the title to the entered value
    this.filmToUpdate = {
      ...this.filmToUpdate,
      title: this.title.value?.toString(),
      year: this.constructYearValue(this.filmToUpdate.type, this.year.value?.toString()),
      plot: this.plot.value?.toString() ?? ""
    }

    this.apiService.updateFilm(this.filmToUpdate)
      .subscribe(
        response => {
          this.toastr.success("Film updated successfully!", "Success");
          this.modalService.dismissAll();
        },
        error => {
          this.toastr.error("Failed to update film.", "Failure");
          console.log(error);
        });
  }

  //** Close the modal. */
  onClose() {
    this.modalService.dismissAll();
  }

  //** Populate the form with data from the film selected to update */
  populateForm() {
    // set the title to the passed in value
    this.title.setValue(this.filmToUpdate?.title);

    // For a series pick out the first year in a '2001 - 2002' type string
    if (this.filmToUpdate?.type.toLowerCase() === 'series') {
      this.year.setValue(this.extractYearValue(this.filmToUpdate.year.toString()));
    }
    else {
      this.year.setValue(this.filmToUpdate?.year);
    }

    this.plot.setValue(this.filmToUpdate?.plot);

    this.title.markAsPristine();
    this.year.markAsPristine();
    this.plot.markAsPristine();
  }

  //** Construct an appropriate year string based on if it is a series or not */
  // TODO: move this to somewhere shared
  constructYearValue(type: any, year: any) {
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
