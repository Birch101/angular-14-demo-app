import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validated-number-field',
  templateUrl: './validated-number-field.component.html',
  styleUrls: ['./validated-number-field.component.scss']
})
export class ValidatedNumberFieldComponent implements OnInit {

  public formControl: FormControl = new FormControl('');
  @Input() public label: string;
  @Input() public minValue: number;
  @Input() public maxValue: number;
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
