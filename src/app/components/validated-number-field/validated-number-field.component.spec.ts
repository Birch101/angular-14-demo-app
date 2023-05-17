import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedNumberFieldComponent } from './validated-number-field.component';

describe('ValidatedNumberFieldComponent', () => {
  let component: ValidatedNumberFieldComponent;
  let fixture: ComponentFixture<ValidatedNumberFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatedNumberFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatedNumberFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
