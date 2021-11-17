import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { Heritage } from 'src/app/types/heritage';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { TimerService } from 'src/app/services/timer/timer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  heritage!: Heritage;
  roundTimer: dayjs.Dayjs;

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
  ) {
    this.heritage = quizService.getQuiz();
    this.roundTimer = this.timerService.getRoundTimer();
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
