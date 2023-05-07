import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilmModalComponent } from './film-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { MockApiService } from 'src/app/test/mock-api-service.service';
import { ApiService } from 'src/app/services/api-service.service';
import { Film } from 'src/app/models/film-model';

describe('FilmModalComponent', () => {
  let component: FilmModalComponent;
  let fixture: ComponentFixture<FilmModalComponent>;
  let mockToastrService = jasmine.createSpyObj(['success', 'error']);
  let mockApiService = new MockApiService();
  let mockModalService = jasmine.createSpyObj(['dismissAll']);
  let testFilm = new Film();

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, ReactiveFormsModule],
      declarations: [FilmModalComponent],
      providers: [
        { provide: ToastrService, useValue: mockToastrService },
        {provide: ApiService, useValue: mockApiService},
        {provide: NgbModal, useValue: mockModalService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testFilm.title = 'Test';
    testFilm.type = 'film';
    testFilm.year = '2000';
    testFilm.plot = 'This is the plot';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSave', () => {
    it('ToastrService called on successful add', () => {
      component.title.setValue('Test');
      component.year.setValue('2001');
      component.plot.setValue('Plot');

      component.filmToUpdate = testFilm;

      component.onSave();

      expect(mockToastrService.success).toHaveBeenCalled();

      expect(component).toBeTruthy();
    });
  })

  describe('onClose', () => {
    it('Modal service called on close', () => {
      component.onClose();

      expect(mockModalService.dismissAll).toHaveBeenCalled();

      expect(component).toBeTruthy();
    });
  })

  describe('populateForm', () => {
    it('form controls are populated with the correct initial values for a film', () => {
      component.filmToUpdate = testFilm;
      component.filmToUpdate.type = 'film';

      component.populateForm()

      expect(component.title.value).toBe("Test");
      expect(component.year.value).toBe("2000");
      expect(component.plot.value).toBe("This is the plot");

      expect(component.title.pristine).toBeTrue();
      expect(component.year.pristine).toBeTrue();
      expect(component.plot.pristine).toBeTrue();
    });

    it('form controls are populated with the correct initial values for a series', () => {
      component.filmToUpdate = testFilm;
      component.filmToUpdate.type = 'series';
      component.populateForm()

      expect(component.title.value).toBe("Test");
      expect(component.year.value).toBe("2000");
      expect(component.plot.value).toBe("This is the plot");

      expect(component.title.invalid).toBeFalse();
      expect(component.year.invalid).toBeFalse();
      expect(component.plot.invalid).toBeFalse();

      expect(component.title.pristine).toBeTrue();
      expect(component.year.pristine).toBeTrue();
      expect(component.plot.pristine).toBeTrue();
    });

    it('title from control marked as invalid when not populated', () => {
      component.filmToUpdate = testFilm;
      component.filmToUpdate.title = '';

      component.populateForm()

      expect(component.title.value).toBe("");
      expect(component.year.value).toBe("2000");
      expect(component.plot.value).toBe("This is the plot");

      expect(component.title.invalid).toBeTrue();
      expect(component.year.pristine).toBeTrue();
      expect(component.plot.pristine).toBeTrue();
    });

    it('year from control marked as invalid when not populated', () => {
      component.filmToUpdate = testFilm;
      component.filmToUpdate.year = '';

      component.populateForm()

      expect(component.title.value).toBe("Test");
      expect(component.year.value).toBe("");
      expect(component.plot.value).toBe("This is the plot");

      expect(component.title.pristine).toBeTrue();
      expect(component.year.invalid).toBeTrue();
      expect(component.plot.pristine).toBeTrue();
    });

    it('year from control marked as invalid when < 0', () => {
      component.filmToUpdate = testFilm;
      component.filmToUpdate.year = '-1';

      component.populateForm()

      expect(component.title.value).toBe("Test");
      expect(component.year.value).toBe("-1");
      expect(component.plot.value).toBe("This is the plot");

      expect(component.title.pristine).toBeTrue();
      expect(component.year.invalid).toBeTrue();
      expect(component.plot.pristine).toBeTrue();
    });

    it('year from control marked as invalid when > 9999', () => {
      component.filmToUpdate = testFilm;
      component.filmToUpdate.year = '99999';

      component.populateForm()

      expect(component.title.value).toBe("Test");
      expect(component.year.value).toBe("99999");
      expect(component.plot.value).toBe("This is the plot");

      expect(component.title.pristine).toBeTrue();
      expect(component.year.invalid).toBeTrue();
      expect(component.plot.pristine).toBeTrue();
    });

    it('plot from control marked as invalid when not populated', () => {
      component.filmToUpdate = testFilm;
      component.filmToUpdate.plot = '';
      
      component.populateForm()

      expect(component.title.value).toBe("Test");
      expect(component.year.value).toBe("2000");
      expect(component.plot.value).toBe("");

      expect(component.title.pristine).toBeTrue();
      expect(component.year.pristine).toBeTrue();
      expect(component.plot.invalid).toBeTrue();
    });

  })

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

});
