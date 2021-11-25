import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as _ from 'lodash-es'; // https://www.npmjs.com/package/lodash-es
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Heritage } from '../../types/heritage';

const QUIZ_COUNT = 2;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  round: number = 1;
  // 難易度が簡単の時
  answerCount: number = 0;
  heritages: Heritage[] = [];

  constructor(private router: Router, private firestore: AngularFirestore) {}

  quizInit() {
    this.round = 1;
    this.answerCount = 0;
    this.heritages = [];
    const heritageCollection = this.firestore.collection<Heritage>('heritage');
    const items = heritageCollection.valueChanges();
    items.subscribe((value) => {
      this.setQuiz(value);
      this.router.navigateByUrl('/problem');
    });
  }

  setQuiz(heritages: Heritage[]) {
    this.heritages = heritages;
  }

  getQuiz(): Heritage {
    return this.heritages[this.round - 1];
  }

  getRound(): [number, number] {
    return [this.round, QUIZ_COUNT];
  }

  checkAnswer(inputValue: string): void | boolean {
    const heritage = this.heritages[this.round - 1];
    if (heritage.answer.includes(inputValue)) {
      ++this.answerCount;
      return true;
    } else return false;
  }

  nextPage(): void {
    if (this.round <= QUIZ_COUNT) {
      this.router.navigate(['problem']);
    } else {
      this.router.navigate(['result']);
    }
  }

  roundCount(): void {
    ++this.round;
  }
}
