import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Film } from 'src/app/models/film-model';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {

  //** List of films to display */
  filmsList: Film[] = [];

  searchText: string;

  title = new FormControl('');
  year = new FormControl('');
  plot = new FormControl('');

  loading = false;

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

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

  //** Refresh displayed data on data change */
  handleFilmDataChange(event: any) {
    this.getFilms();
  }

}
