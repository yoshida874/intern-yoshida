import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-limit-time',
  templateUrl: './limit-time.component.html',
  styleUrls: ['./limit-time.component.scss']
})
export class LimitTimeComponent implements OnInit {

  @Input() time: string | null = '';
  @Input() difficulty: string = 'normal';

  constructor() { }

  ngOnInit(): void {
    if(this.time === '00:00' && this.difficulty === 'easy'){
      this.time = '未解答';
    }
  }

}
