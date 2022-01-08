import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Heritage } from 'src/app/types/heritage';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { TimerService } from 'src/app/services/timer/timer.service';
import { DifficultyService } from 'src/app/services/difficulty/difficulty.service';
import { Difficulty } from 'src/app/types/difficulty';
import { OnBeforeunload } from 'src/app/guards/problem.guard';
import { QuizConst, QuizConstInterface } from 'src/app/const/quiz';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})

export class AnswerComponent implements OnInit, OnBeforeunload {
  quizConst: QuizConstInterface = QuizConst;

  heritage!: Heritage;
  roundTimer: dayjs.Dayjs;
  difficulty: Difficulty;
  imgUrl: any;

  currentRound = 0;
  nextButtonText = '次の問題へ';
  isLastRound = false;

  loadWarning = true;

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private difficultyService: DifficultyService,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    this.heritage = quizService.getQuiz();
    this.roundTimer = this.timerService.getRoundTimer();
    this.difficulty = this.difficultyService.getDifficulty();
    this.currentRound = this.quizService.round;
    const ref = storage.refFromURL(this.heritage.imgUrl);
    this.imgUrl = ref.getDownloadURL();
  }

  ngOnInit(): void {
    this.googleMapInit();
    this.isLastRound = this.quizService.round === this.quizConst.QUIZ_COUNT;
  }
 
  beforeUnload(e: Event) {
    if (this.shouldConfirmOnBeforeunload()) {
      e.returnValue = true;
    }
  }

  // アラートの表示を行うか
  shouldConfirmOnBeforeunload() {
    return !!this.loadWarning;
  }

  googleMapInit(): void {
    const position = new google.maps.LatLng(
      this.heritage.latitude,
      this.heritage.longitude
    );
    const map = new google.maps.Map(document.getElementById('map') as Element, {
      center: position,
      zoom: 16,
    });
    new google.maps.Marker({ map: map, position: position });
  }

  nextQuiz() {
    this.quizService.isQuizzing = true;
    this.quizService.roundCount();
    this.loadWarning = false;
    this.quizService.nextPage();
  }
}
