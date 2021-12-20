import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash-es'; // https://www.npmjs.com/package/lodash-es
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Heritage } from 'src/app/types/heritage';
import { QuizConst } from 'src/app/const/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  round: number = 1;
  answerCount: number = 0;
  heritages: Heritage[] = [];

  constructor(private router: Router, private firestore: AngularFirestore) {}

  quizInit() {
    this.round = 1;
    this.answerCount = 0;
    this.heritages = [];
    // クイズを取得し問題画面へ
    const heritageCollection = this.firestore.collection<Heritage>('heritage');
    const items = heritageCollection.valueChanges();
    items.subscribe((value) => {
      this.heritages = value;
      this.router.navigate(['problem']);
    });
  }

  getQuiz(): Heritage {
    return this.heritages[this.round - 1];
  }

  getAllQuiz(): Heritage[] {
    return this.heritages;
  }

  checkAnswer(inputValue: string): void | boolean {
    const heritage = this.heritages[this.round - 1];
    if (heritage.answer.includes(inputValue)) {
      ++this.answerCount;
      return true;
    } else return false;
  }

  nextPage(): void {
    if (this.round <= QuizConst.QUIZ_COUNT) {
      this.router.navigate(['problem']);
    } else {
      this.router.navigate(['result']);
    }
  }

  roundCount(): void {
    ++this.round;
  }
}
