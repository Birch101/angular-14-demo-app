import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(films: any[], searchText: string): any[] {
    if (!films) {
      return [];
    }
    if (!searchText) {
      return films;
    }
    searchText = searchText.toLowerCase();

    // filter on film titles containing the search text
    return films.filter(film => {
      return film.title.toString().toLowerCase().includes(searchText);
    });
  }

}
