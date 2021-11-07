import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

import { timer } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import * as dayjs from 'dayjs';

interface Heritage {
  latitude: number,
  longitude: number,
  hint: string[],
  answer: string[],
  name: string,
}

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})

export class ProblemComponent implements OnInit {

  ansButtonText: string = '解答';
  tipsButtonText: string = 'ヒント▼';
  isVisibleHint: boolean = false;
  hintButtonDisabled: boolean = true;
  inputValue: string = '';
  wrongAnswers: string[] = [];
  isWrong: boolean = false;

  roundTimer = dayjs().minute(0).second(0);
  hintTimer = dayjs().minute(0).second(7);

  heritage: AngularFirestoreCollection<Heritage>;
  latitude: number = 0;
  longitude: number = 0;
  hints: string[] = [];
  answers: string[] = [];

  constructor(
      private quizService: QuizService
    ) {
    this.heritage = quizService.getQuiz();
  }

  ngOnInit(): void {
    // firestoreのデータをセット
    this.heritage.valueChanges().subscribe(item => {
      this.latitude = item[0].latitude;
      this.longitude = item[0].longitude;
      this.hints = item[0].hint;
      this.answers = item[0].answer;
      this.streetViewInit().then(() => this.timerCountInit());
    });    
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
    const timer$ = timer(1000, 1000);
    timer$.subscribe(() => {
      if(this.hintTimer.format('mm:ss') !== '00:00'){
        this.hintTimer = dayjs(this.hintTimer).subtract(1, 's');
        // ヒントのタイマーが０の時ヒントボタンを有効化
        if(this.hintTimer.format('mm:ss') === '00:00') this.hintButtonDisabled = false;
      }
    this.roundTimer = dayjs(this.roundTimer).add(1, 's');
    });
  }

  openHint(): void {
    this.isVisibleHint = this.isVisibleHint ? false : true ;
  }

  answerEvent(): void {
    if(this.answers.includes(this.inputValue)) {
      // 解答数をカウントし画面遷移
      this.quizService.nextPage();
    } else {
      // ボタンを揺らし不正解数を追加
      this.isWrong = true;
      setTimeout(() => (this.isWrong = false), 300);
      this.wrongAnswers.push(this.inputValue);
    }
  }

}
