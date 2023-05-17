import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validated-text-field',
  templateUrl: './validated-text-field.component.html',
  styleUrls: ['./validated-text-field.component.scss']
})
export class ValidatedTextFieldComponent implements OnInit {

  public formControl: FormControl;
  @Input() public label: string;
  @Input() public maxCharacters: number;
  @Input() public defaultValue: string;

  constructor() { }

  ngOnInit(): void {
    this.formControl = new FormControl(this.defaultValue);
  }

  public resetField() {
    this.formControl.setValue('');
    this.formControl.markAsPristine();
    this.formControl.markAsUntouched();
  }

}
