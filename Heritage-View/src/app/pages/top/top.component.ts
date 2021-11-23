import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';

export interface card {
  title: string;
  imageSrc: string;
  link: string;
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
    },
    {
      title: 'アジア',
      imageSrc: '/assets/cardImages/アジア.jpeg',
      link: '/problem',
    },
    {
      title: 'ヨーロッパ',
      imageSrc: '/assets/cardImages/ヨーロッパ.jpeg',
      link: '/problem',
    },
    {
      title: 'アメリカ',
      imageSrc: '/assets/cardImages/アメリカ.jpeg',
      link: '/problem',
    },
    {
      title: 'アフリカ',
      imageSrc: '/assets/cardImages/アフリカ.jpeg',
      link: '/problem',
    },
    {
      title: '南アメリカ/オセアニア',
      imageSrc: '/assets/cardImages/南アメリカ.jpeg',
      link: '/problem',
    },
  ];

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit(): void {}

  quizStart() {
    const items = this.quizService.quizInit();
    items.subscribe((value) => {
      this.quizService.setQuiz(value);
      this.router.navigateByUrl('/problem');
    });
  }
}
