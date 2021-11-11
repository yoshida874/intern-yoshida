import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent implements OnInit {
  @Input() text = '';
  @Input() disabled: boolean = false;
  @Input() isWrong: boolean = false;
  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  pressButton(): void {
    // Event Emmit
    this.onClick.emit();
  }

}
