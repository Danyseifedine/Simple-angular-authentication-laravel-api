import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent {
  @Input() label: string = 'Submit';
  @Input() disabledLabel: string = 'Loading...';
  @Input() isDisabled: boolean = false;
  @Input() buttonClass: string = '';

  constructor() { }
}
