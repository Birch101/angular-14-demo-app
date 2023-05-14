import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  title = 'angular-14-demo-app';

  //** Toggle dark and light classes to appy theme */
  toggleDarkMode() {
    this.document.body.classList.toggle("dark");
    this.document.body.classList.toggle("light");
  }
}
