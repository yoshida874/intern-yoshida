import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-limit-time',
  templateUrl: './limit-time.component.html',
  styleUrls: ['./limit-time.component.scss']
})
export class LimitTimeComponent implements OnInit {

  @Input() time: string | null = '';

  constructor() { }

  ngOnInit(): void {
  }

}
