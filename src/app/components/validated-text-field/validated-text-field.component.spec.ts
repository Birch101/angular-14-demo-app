import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedTextFieldComponent } from './validated-text-field.component';

describe('ValidatedTextFieldComponent', () => {
  let component: ValidatedTextFieldComponent;
  let fixture: ComponentFixture<ValidatedTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatedTextFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatedTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
