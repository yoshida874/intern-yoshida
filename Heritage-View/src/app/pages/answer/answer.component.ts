import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { Heritage } from 'src/app/types/heritage';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { TimerService } from 'src/app/services/timer/timer.service';
import { DifficultyService } from 'src/app/services/difficulty/difficulty.service';
import { Difficulty } from 'src/app/types/difficulty';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  heritage!: Heritage;
  roundTimer: dayjs.Dayjs;
  difficulty: Difficulty;

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private difficultyService: DifficultyService,
  ) {
    this.heritage = quizService.getQuiz();
    this.roundTimer = this.timerService.getRoundTimer();
    this.difficulty = this.difficultyService.getDifficulty();
  }
  ngOnInit(): void {
      this.googleMapInit();
  }

  async googleMapInit(): Promise<void> {
    const position = new google.maps.LatLng(this.heritage.latitude, this.heritage.longitude);
    const map = await new google.maps.Map(document.getElementById('map') as Element, {
      center: position,
      zoom: 16
    });
    await new google.maps.Marker({map: map, position: position});
  }

}
