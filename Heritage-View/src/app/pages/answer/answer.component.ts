import { Component, OnInit } from '@angular/core';
import { Heritage } from 'src/app/types/heritage';

import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  heritage!: Heritage;

  constructor(
    private quizService: QuizService,
  ) {
    this.heritage = quizService.getQuiz();
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
