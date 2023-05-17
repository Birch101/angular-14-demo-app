import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validated-textarea-field',
  templateUrl: './validated-textarea-field.component.html',
  styleUrls: ['./validated-textarea-field.component.scss']
})
export class ValidatedTextareaFieldComponent implements OnInit {

  public formControl: FormControl = new FormControl('');
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
