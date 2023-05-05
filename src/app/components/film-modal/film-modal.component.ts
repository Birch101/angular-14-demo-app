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

  // TODO: Needs validation
  public title = new FormControl('');

  constructor(private modalService: NgbModal, private apiService: ApiService, private toastr: ToastrService) {}

  //** Display title of film being updated */
  ngOnInit() {
    // set the title to the passed in value
    this.title.setValue(this.filmToUpdate?.title);
  }

  //** Save away changes and close the modal */
  onSave() {
    // set the title to the entered value
    this.filmToUpdate.title = this.title.value;

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

}
