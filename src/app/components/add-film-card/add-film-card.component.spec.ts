import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilmCardComponent } from './add-film-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api-service.service';
import { MockApiService } from 'src/app/test/mock-api-service.service';

describe('AddFilmCardComponent', () => {
  let component: AddFilmCardComponent;
  let fixture: ComponentFixture<AddFilmCardComponent>;
  let mockToastrService = jasmine.createSpyObj(['success', 'error'])
  let mockApiService = new MockApiService();

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

    fixture = TestBed.createComponent(AddFilmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onAdd', () => {
    it('ToastrService called on successful add', () => {   
      component.onAdd();

      expect(mockToastrService.success).toHaveBeenCalled();

      expect(component).toBeTruthy();
    });
  })

  describe('resetFields', () => {
    it('Form controls should all be reset', () => {
      component.title.setValue('Test');
      component.year.setValue('2001');
      component.plot.setValue('This is the plot');

      component.resetFields();

      expect(component.title.value).toBe('');
      expect(component.year.value).toBe('');
      expect(component.plot.value).toBe('');

      expect(component.title.pristine).toBeTrue();
      expect(component.year.pristine).toBeTrue();
      expect(component.plot.pristine).toBeTrue();

      expect(component.title.untouched).toBeTrue();
      expect(component.year.untouched).toBeTrue();
      expect(component.plot.untouched).toBeTrue();
    });
  })
});
