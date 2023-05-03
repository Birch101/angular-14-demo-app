import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  films: any;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.getFilms();
  }

  getFilms() {
    this.apiService.getFilms()
      .subscribe(
        response => {
          this.films = response;
        },
        error => {
          console.log(error);
        });
  }

  onDelete(filmId: any): void {

    this.apiService.deleteFilm(filmId)
      .subscribe(
        response => {
          this.getFilms();
        },
        error => {
          console.log(error);
        });


  }

}
