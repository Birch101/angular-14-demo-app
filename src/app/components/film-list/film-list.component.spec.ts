import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmListComponent } from './film-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

describe('FilmListComponent', () => {
  let component: FilmListComponent;
  let fixture: ComponentFixture<FilmListComponent>;
  let mockToastrService;

  beforeEach(async () => {
    mockToastrService = jasmine.createSpyObj(['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
      declarations: [ FilmListComponent, FilterPipe ],
      providers: [
        {provide: ToastrService, useValue: mockToastrService}, NgControl
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
});
