import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { DifficultyService } from 'src/app/services/difficulty.service';

import { of, Subscription, timer } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import * as dayjs from 'dayjs';

interface Heritage {
  latitude: number,
  longitude: number,
  hint: string[],
  answer: string[],
  name: string,
}

type Difficulty = 'easy' | 'normal'; 

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})

export class ProblemComponent implements OnInit, OnDestroy {

  ansButtonText: string = '解答';
  tipsButtonText: string = 'ヒント▼';
  isVisibleHint: boolean = false;
  hintButtonDisabled: boolean = true;
  inputValue: string = '';
  wrongAnswers: string[] = [];
  isWrong: boolean = false;

  difficulty: Difficulty = 'normal';

  timerInterval?: Subscription;
  roundTimer = dayjs().minute(0).second(0);
  hintTimer = dayjs().minute(0).second(7);

  heritage: AngularFirestoreCollection<Heritage>;
  latitude: number = 0;
  longitude: number = 0;
  hints: string[] = [];


  constructor(
      private quizService: QuizService,
      private difficultyService: DifficultyService
    ) {
    this.heritage = quizService.getQuiz();
    this.difficulty = difficultyService.getDifficulty();
  }

  ngOnInit(): void {
    // firestoreのデータをセット
    this.heritage.valueChanges().subscribe(item => {
      this.latitude = item[0].latitude;
      this.longitude = item[0].longitude;
      this.hints = item[0].hint;
      this.streetViewInit().then(() => this.timerCountInit());
    });    
  }

  // タイマー処理を削除する
  ngOnDestroy(): void {
    if (this.timerInterval){
      this.timerInterval.unsubscribe();
    }
  }

  /**
   * streetViewを配置
   */
  async streetViewInit(): Promise<void> {
    const option = {
      addressControl: false, // 住所案内を非表示
      showRoadLabels: false, // 道路名を非表示
      position: {
        lat: this.latitude,
        lng: this.longitude
      },
      pov: {
        heading: 34,
        pitch: 10,
      }
    }
    await new google.maps.StreetViewPanorama(document.getElementById('pano') as Element, option);
  }

  /**
   * ヒント、タイマーのカウントを１秒ずつ進める
   */
  timerCountInit(): void {
    if(this.difficulty === 'easy') this.roundTimer = dayjs().minute(0).second(10);
    const timer$ = timer(1000, 1000);

    this.timerInterval = timer$.subscribe(() => {
      if(this.hintTimer.format('mm:ss') !== '00:00'){
        this.hintTimer = dayjs(this.hintTimer).subtract(1, 's');
        // ヒントのタイマーが０の時ヒントボタンを有効化
        if(this.hintTimer.format('mm:ss') === '00:00') this.hintButtonDisabled = false;
      }

      if(this.difficulty === 'easy') {
        this.roundTimer = dayjs(this.roundTimer).subtract(1, 's');
        if(this.hintTimer.format('mm:ss') === '00:00') this.roundSkip();
      }
      else this.roundTimer = dayjs(this.roundTimer).add(1, 's');
    });
  }

  openHint(): void {
    this.isVisibleHint = this.isVisibleHint ? false : true ;
  }

  answerEvent(): void {
    if(this.quizService.checkAnswer(this.inputValue)){
      this.quizService.nextPage();
    }
    else {
      // ボタンを揺らし不正解数を追加
      this.isWrong = true;
      setTimeout(() => (this.isWrong = false), 300);
      this.wrongAnswers.push(this.inputValue);
    }
  }

  roundSkip(): void {
    this.quizService.nextPage();
  }

}
