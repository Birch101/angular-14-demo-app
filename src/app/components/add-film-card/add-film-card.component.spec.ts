import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilmCardComponent } from './add-film-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api-service.service';
import { MockApiService } from 'src/app/test/mock-api-service.service';
import { ValidatedTextFieldComponent } from '../validated-text-field/validated-text-field.component';
import { ValidatedNumberFieldComponent } from '../validated-number-field/validated-number-field.component';
import { ValidatedTextareaFieldComponent } from '../validated-textarea-field/validated-textarea-field.component';

describe('AddFilmCardComponent', () => {
  let component: AddFilmCardComponent;
  let fixture: ComponentFixture<AddFilmCardComponent>;
  let mockToastrService = jasmine.createSpyObj(['success', 'error'])
  let mockApiService = new MockApiService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
      declarations: [ValidatedTextFieldComponent, ValidatedNumberFieldComponent, ValidatedTextareaFieldComponent],
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
      component.titleField = new ValidatedTextFieldComponent();
      component.yearField = new ValidatedNumberFieldComponent();
      component.plotField = new ValidatedTextareaFieldComponent();

      component.titleField.formControl = new FormControl('');
      component.yearField.formControl = new FormControl('');
      component.plotField.formControl = new FormControl('');

      component.onAdd();

      expect(mockToastrService.success).toHaveBeenCalled();

      expect(component).toBeTruthy();
    });
  })

  describe('resetFields', () => {
    it('Form controls should all be reset', () => {
      component.titleField = new ValidatedTextFieldComponent();
      component.yearField = new ValidatedNumberFieldComponent();
      component.plotField = new ValidatedTextareaFieldComponent();

      component.titleField.formControl = new FormControl('Test');
      component.yearField.formControl = new FormControl('2001');
      component.plotField.formControl = new FormControl('This is the plot');

      component.resetFields();

      expect(component.titleField.formControl.value).toBe('');
      expect(component.yearField.formControl.value).toBe('');
      expect(component.plotField.formControl.value).toBe('');

      expect(component.titleField.formControl.pristine).toBeTrue();
      expect(component.yearField.formControl.pristine).toBeTrue();
      expect(component.plotField.formControl.pristine).toBeTrue();

      expect(component.titleField.formControl.untouched).toBeTrue();
      expect(component.yearField.formControl.untouched).toBeTrue();
      expect(component.plotField.formControl.untouched).toBeTrue();
    });
  })
});
