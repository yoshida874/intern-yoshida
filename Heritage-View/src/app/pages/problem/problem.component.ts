import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  roundTimerStr?: Observable<Date> = new Observable((observer) => observer.next(this.roundTimer.toDate()));

  hintTimer = dayjs().minute(1).second(0);
  hintTimerStr?: Observable<Date> = new Observable((observer) => observer.next(this.hintTimer.toDate()));

  constructor() {}

  ngOnInit(): void {
    // ヒントのタイマーを1秒ずつ進める
    this.hintTimerStr = new Observable((observer) => {
      setInterval(() => {
        // タイマーが0の時表示をそのままに
        if(this.hintTimer.format('mm:ss') !== '00:00'){
          this.hintTimer = dayjs(this.hintTimer).subtract(1, 's');
        }
        observer.next(this.hintTimer.toDate());
      }, 1000);
    });

    // ラウンドのタイマーを1秒ずつ進める
    this.roundTimerStr = new Observable((observer) => {
      setInterval(() => {
        this.roundTimer = dayjs(this.roundTimer).add(1, 's');
        observer.next(this.roundTimer.toDate());
      }, 1000);
    });
  }

}
