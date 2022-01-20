import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { TimerService } from 'src/app/services/timer/timer.service';

export interface card {
  title: string;
  imageSrc: string;
  link: string;
  sixContinents: string;
}

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  explanationButtonText = '遊び方';
  items: any;

  cards: card[] = [
    {
      title: '全世界',
      imageSrc: '/assets/cardImages/全般.jpeg',
      link: '/problem',
      sixContinents: 'all',
    },
    {
      title: 'アジア',
      imageSrc: '/assets/cardImages/アジア.jpeg',
      link: '/problem',
      sixContinents: 'asia',
    },
    {
      title: 'ヨーロッパ',
      imageSrc: '/assets/cardImages/ヨーロッパ.jpeg',
      link: '/problem',
      sixContinents: 'europe',
    },
    {
      title: 'アメリカ',
      imageSrc: '/assets/cardImages/アメリカ.jpeg',
      link: '/problem',
      sixContinents: 'america',
    },
    {
      title: 'アフリカ',
      imageSrc: '/assets/cardImages/アフリカ.jpeg',
      link: '/problem',
      sixContinents: 'africa',
    },
    {
      title: '南アメリカ/オセアニア',
      imageSrc: '/assets/cardImages/南アメリカ.jpeg',
      link: '/problem',
      sixContinents: 'southAmerica',
    },
  ];

  constructor(
    private router: Router,
    private quizService: QuizService,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {}

  quizStart(sixContinents: string) {
    this.timerService.initializeClearTimer();
    this.quizService.quizInit();
    this.quizService.getHeritagesFromFirebase(sixContinents);
  }
}
