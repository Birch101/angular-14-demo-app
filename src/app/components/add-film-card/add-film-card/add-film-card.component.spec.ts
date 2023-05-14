import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilmCardComponent } from './add-film-card.component';

describe('AddFilmCardComponent', () => {
  let component: AddFilmCardComponent;
  let fixture: ComponentFixture<AddFilmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFilmCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFilmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
