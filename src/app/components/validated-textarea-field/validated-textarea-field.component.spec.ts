import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedTextareaFieldComponent } from './validated-textarea-field.component';

describe('ValidatedTextareaFieldComponent', () => {
  let component: ValidatedTextareaFieldComponent;
  let fixture: ComponentFixture<ValidatedTextareaFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatedTextareaFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatedTextareaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
