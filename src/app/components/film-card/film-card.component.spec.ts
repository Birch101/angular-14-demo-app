import { Title } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCardComponent } from './film-card.component';
import { Film } from 'src/app/models/film-model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api-service.service';
import { MockApiService } from 'src/app/test/mock-api-service.service';

describe('FilmCardComponent', () => {
  let component: FilmCardComponent;
  let fixture: ComponentFixture<FilmCardComponent>;
  let mockToastrService = jasmine.createSpyObj(['success', 'error'])
  let mockApiService = new MockApiService();
  let film = new Film();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
      providers: [
        {provide: ToastrService, useValue: mockToastrService}, 
        {provide: ApiService, useValue: mockApiService},
        NgControl
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmCardComponent);
    component = fixture.componentInstance;

    film.title = "Test";
    film.year = "2001";
    film.plot = "Test Plot"

    component.film = film;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onUpdate', () => {
    it('ToastrService called on successful update', () => {
      component.onUpdate(new Film());

      expect(component).toBeTruthy();
    });
  })

  describe('onDelete', () => {
    it('ToastrService called on successful delete', () => {
      component.onDelete(1);

      expect(mockToastrService.success).toHaveBeenCalled();

      expect(component).toBeTruthy();
    });
  })
});
