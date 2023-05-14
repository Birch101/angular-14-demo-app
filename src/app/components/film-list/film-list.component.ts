import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Film } from 'src/app/models/film-model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {

  //** List of films to display */
  filmsList: Film[] = [];

  searchText: string;

  loading = false;

  sorts = [
    "Sort By",
    "Title Asc",
    "Title Desc",
    "Year Asc",
    "Year Desc"
  ];

  form = new FormGroup({
    sortOrder: new FormControl("Sort By"),
  });

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
          this.filmsList = this.applySort();
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastr.error("Failed to display films.", "Failure");
          console.log(error);
        });
  }

  //** Sort films based on sort selection */
  onSelectChange(event: any) {
    this.filmsList = this.applySort();
  }

  //** Applies an appropriate sort based on selection and returns sorted list of films */
  applySort() {
    switch (this.form.getRawValue().sortOrder) {
      case "Title Asc": {
        return this.filmsList.sort(this.createCompareFn<Film>("title", "asc"));
      }
      case "Title Desc": {
        return this.filmsList.sort(this.createCompareFn<Film>("title", "desc"));
      }
      case "Year Asc": {
        return this.filmsList.sort(this.createCompareFn<Film>("year", "asc"));
      }
      case "Year Desc": {
        return this.filmsList.sort(this.createCompareFn<Film>("year", "desc"));
      }
      default: {
        return this.filmsList;
      }
    }
  }

  //** Refresh displayed data on data change */
  handleFilmDataChange(event: any) {
    this.getFilms();
  }

  //** Create an appropriate comapre function base do a property and sort order */
  createCompareFn<T extends Object>(property: keyof T, sort_order: "asc" | "desc") {
    const compareFn = (a: T, b: T) => {
      // grab the values from the property we've passed in to check
      const val1 = a[property];
      const val2 = b[property];

      // based on the sort order set whether it will be 1 / -1
      const order = sort_order !== "desc" ? 1 : -1;

      switch (typeof val1) {
        case "number": {
          const valb = val2 as unknown as number;
          const result = val1 - valb;
          // times by order to return asc/desc
          return result * order;
        }
        case "string": {
          const valb = val2 as unknown as string;
          const result = val1.localeCompare(valb);
          // times by order to return asc/desc
          return result * order;
        }
        default:
          return 0;
      }
    };
    return compareFn;
  }

}
