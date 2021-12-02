import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  roundTimer = dayjs().minute(0).second(0);
  hintTimer = dayjs().minute(0).second(7);
  roundClearTimes: dayjs.Dayjs[] = [];
  timerInterval?: Subscription;
  constructor() {}

  timerInit() {
    this.roundClearTimes = [];
  }

  getRoundTimer(difficulty?: string): dayjs.Dayjs {
    if (difficulty === 'easy') this.roundTimer = dayjs().minute(0).second(10);
    else this.roundTimer = dayjs().minute(0).second(0);
    return this.roundTimer;
  }

  getHintTimer(): dayjs.Dayjs {
    this.hintTimer = dayjs().minute(0).second(7);
    return this.hintTimer;
  }

  setRoundTimer() {
    this.roundClearTimes.push(this.roundTimer);
  }

  /**
   * １秒ごとに呼び出される
   * @param {string} difficulty
   * @returns roundTimer
   */
  roundTimerChange(difficulty: string): dayjs.Dayjs {
    if (difficulty === 'easy') {
      this.roundTimer = dayjs(this.roundTimer).subtract(1, 's');
    } else this.roundTimer = dayjs(this.roundTimer).add(1, 's');
    return this.roundTimer;
  }

  hintTimerChange(): dayjs.Dayjs {
    // ヒントのタイマーが０の時ヒントボタンを有効化
    if (this.hintTimer.format('mm:ss') !== '00:00') {
      this.hintTimer = dayjs(this.hintTimer).subtract(1, 's');
    }
    return this.hintTimer;
  }
}
