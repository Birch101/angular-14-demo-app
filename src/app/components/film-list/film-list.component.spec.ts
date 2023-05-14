import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmListComponent } from './film-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ApiService } from 'src/app/services/api-service.service';
import { MockApiService } from '../../test/mock-api-service.service'

describe('FilmListComponent', () => {
  let component: FilmListComponent;
  let fixture: ComponentFixture<FilmListComponent>;
  let mockToastrService = jasmine.createSpyObj(['success', 'error'])
  let mockApiService = new MockApiService();
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
      declarations: [ FilmListComponent, FilterPipe ],
      providers: [
        {provide: ToastrService, useValue: mockToastrService}, 
        {provide: ApiService, useValue: mockApiService},
        NgControl
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getFilms', () => {
    it('', () => {
      component.getFilms();

      expect(component).toBeTruthy();
    });
  })
});
