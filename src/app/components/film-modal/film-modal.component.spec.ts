import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmModalComponent } from './film-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

describe('FilmModalComponent', () => {
  let component: FilmModalComponent;
  let fixture: ComponentFixture<FilmModalComponent>;
  let mockToastrService;

  beforeEach(async () => {
    mockToastrService = jasmine.createSpyObj(['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, ReactiveFormsModule],
      declarations: [FilmModalComponent],
      providers: [
        { provide: ToastrService, useValue: mockToastrService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('extractYearValue', () => {
    it('return year when string contains only year', () => {
      var actual = component.extractYearValue("2001")

      expect(actual).toBe("2001");
    });

    it('return year when string contains only year and -', () => {
      var actual = component.extractYearValue("2001-")

      expect(actual).toBe("2001");
    });

    it('return year when string contains year range', () => {
      var actual = component.extractYearValue("2001-2002")

      expect(actual).toBe("2001");
    });

    it('return blank string when string contains no digits', () => {
      var actual = component.extractYearValue("sdfgdfgg")

      expect(actual).toBe("");
    });

    it('return blank string when string contains year and text', () => {
      var actual = component.extractYearValue("2001safdsdf")

      expect(actual).toBe("2001");
    });

    it('return blank string when string is blank', () => {
      var actual = component.extractYearValue("")

      expect(actual).toBe("");
    });
  });

  describe('constructYearValue', () => {
    it('return year without - when type is film', () => {
      var actual = component.constructYearValue("film", "2001")

      expect(actual).toBe("2001");
    });

    it('return year with - when type is series', () => {
      var actual = component.constructYearValue("series", "2001")

      expect(actual).toBe("2001-");
    });

    it('return year with - when type is SERIES', () => {
      var actual = component.constructYearValue("SERIES", "2001")

      expect(actual).toBe("2001-");
    });

    it('return year with - when type is SErIeS', () => {
      var actual = component.constructYearValue("SErIeS", "2001")

      expect(actual).toBe("2001-");
    });

    it('return year with - when type is series and passed in year string contains -', () => {
      var actual = component.constructYearValue("SErIeS", "2001-----")

      expect(actual).toBe("2001-");
    });

    it('return year with - when type is series and passed in year string contains text', () => {
      var actual = component.constructYearValue("SErIeS", "2001abc")

      expect(actual).toBe("2001-");
    });

    it('return year without - when type is film and passed in year string contains text', () => {
      var actual = component.constructYearValue("film", "2001abc")

      expect(actual).toBe("2001");
    });

    it('return year without - when type is film and passed in year string contains -', () => {
      var actual = component.constructYearValue("film", "2001-")

      expect(actual).toBe("2001");
    });

    it('return year without - when type is unknown', () => {
      var actual = component.constructYearValue("test", "2001-")

      expect(actual).toBe("2001");
    });
  })

  // TODO: test coverage for validation
});
