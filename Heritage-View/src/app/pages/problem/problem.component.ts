import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

  ansButtonText = '解答';
  tipsButtonText = 'ヒント▼';

  roundTimer = dayjs().minute(0).second(0);
  hintTimer = dayjs().minute(3).second(0);
  timer$ = timer(1000, 1000);

  constructor() {}

  ngOnInit(): void {

    // タイマーを1秒ずつ進める
    this.timer$.subscribe(() => {
      if(this.hintTimer.format('mm:ss') !== '00:00'){
        this.hintTimer = dayjs(this.hintTimer).subtract(1, 's');
      }
      this.roundTimer = dayjs(this.roundTimer).add(1, 's');
    });
  }

}
