import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import * as dayjs from 'dayjs';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { DifficultyService } from 'src/app/services/difficulty/difficulty.service';
import { TimerService } from 'src/app/services/timer/timer.service';
import { Heritage } from 'src/app/types/heritage';
import { Difficulty } from 'src/app/types/difficulty';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss'],
})
export class ProblemComponent implements OnInit, OnDestroy {
  isVisibleHint: boolean = false;
  hintButtonDisabled: boolean = true;
  inputValue: string = '';
  mistakeAnswers: string[] = [];
  isMistake: boolean = false;

  nowRound = 0;
  rounds = 0;
  difficulty: Difficulty;

  timerInterval?: Subscription;
  roundTimer: dayjs.Dayjs;
  hintTimer: dayjs.Dayjs;

  heritage: Heritage;
  hints: string[] = [];

  constructor(
    private quizService: QuizService,
    private difficultyService: DifficultyService,
    private timerService: TimerService,
    private router: Router
  ) {
    this.heritage = quizService.getQuiz();
    this.difficulty = difficultyService.difficulty;
    this.roundTimer = this.timerService.getRoundTimer(this.difficulty);
    this.hintTimer = this.timerService.getHintTimer();
    // this.nowRound = this.quizService.round;
    [this.nowRound, this.rounds] = this.quizService.getRound();
  }

  ngOnInit(): void {
    // firestoreのデータをセット
    this.hints = this.heritage.hint;
    this.streetViewInit().then(() => this.timerCountInit());
  }

  ngOnDestroy(): void {
    // タイマー処理を削除する
    if (this.timerInterval) {
      this.timerInterval.unsubscribe();
    }
  }

  /**
   * googleStreetViewの配置
   */
  async streetViewInit(): Promise<void> {
    const option = {
      addressControl: false, // 住所案内を非表示
      showRoadLabels: false, // 道路名を非表示
      position: {
        lat: this.heritage.latitude,
        lng: this.heritage.longitude,
      },
      pov: {
        heading: 34,
        pitch: 10,
      },
    };
    await new google.maps.StreetViewPanorama(
      document.getElementById('streetMap') as Element,
      option
    );
  }

  /**
   * ヒント、タイマーのカウントを１秒ずつ進める
   */
  timerCountInit(): void {
    const timer$ = timer(1000, 1000);
    this.timerInterval = timer$.subscribe(() => {
      this.roundTimer = this.timerService.roundTimerChange(this.difficulty);
      // roundタイマーが０秒で解答画面に
      if (this.roundTimer.format('mm:ss') === '00:00') this.roundSkip();

      this.hintTimer = this.timerService.hintTimerChange();
      // ヒントタイマーが０秒でヒントを有効に
      if (this.hintTimer.format('mm:ss') === '00:00')
        this.hintButtonDisabled = false;
    });
  }

  openHint(): void {
    // this.isVisibleHint = this.isVisibleHint ? false : true;
    this.isVisibleHint = !this.isVisibleHint;
  }

  answerEvent(): void {
    if (this.quizService.checkAnswer(this.inputValue)) {
      this.roundSkip();
    } else {
      // ボタンを揺らし不正解数を追加
      this.isMistake = true;
      setTimeout(() => (this.isMistake = false), 300);
      this.mistakeAnswers.push(this.inputValue);
    }
  }

  /**
   * 問題を終了し解答画面へ
   */
  roundSkip(): void {
    this.timerService.setRoundTimer();
    this.router.navigate(['answer']);
  }
}
