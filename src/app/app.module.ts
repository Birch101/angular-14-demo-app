import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FilmModalComponent } from './components/film-modal/film-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { AddFilmCardComponent } from './components/add-film-card/add-film-card.component';
import { ValidatedTextFieldComponent } from './components/validated-text-field/validated-text-field.component';
import { ValidatedNumberFieldComponent } from './components/validated-number-field/validated-number-field.component';
import { ValidatedTextareaFieldComponent } from './components/validated-textarea-field/validated-textarea-field.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    FilmModalComponent,
    FilterPipe,
    FilmCardComponent,
    AddFilmCardComponent,
    ValidatedTextFieldComponent,
    ValidatedNumberFieldComponent,
    ValidatedTextareaFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
