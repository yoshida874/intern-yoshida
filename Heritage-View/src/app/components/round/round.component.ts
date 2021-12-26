import { Component, OnInit, Input } from '@angular/core';
import { QuizConst, QuizConstInterface } from 'src/app/const/quiz';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss'],
})
export class RoundComponent implements OnInit {
  quizConst: QuizConstInterface = QuizConst;
  @Input() currentRound = 0;
  constructor() {}

  ngOnInit(): void {}
}
