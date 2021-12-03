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
  round: number = 0;
  answerCount: number = 0;
  mistakeCounts: { [key: number]: number } = {};
  heritages: Heritage[] = [];

  constructor(private router: Router, private firestore: AngularFirestore) {}

  quizInit() {
    this.round = 0;
    this.answerCount = 0;
    this.heritages = [];
  }

  getHeritagesFromFirebase() {
    // クイズを取得し問題画面へ
    const heritageCollection = this.firestore.collection<Heritage>('heritage');
    const items = heritageCollection.valueChanges();
    items.subscribe((value) => {
      this.heritages = value;
      // TODO: 画面遷移をcontroller側で
      this.router.navigate(['problem']);
    });
  }

  getQuiz(): Heritage {
    return this.heritages[this.round];
  }

  getAllQuiz(): Heritage[] {
    return this.heritages;
  }

  getRound(): [number, number] {
    return [this.round, QUIZ_COUNT];
  }

  getMistakeCounts(): { [key: number]: number } {
    return this.mistakeCounts;
  }

  checkAnswer(inputValue: string): void | boolean {
    const index = this.round;
    const heritage = this.heritages[index];
    if (heritage.answer.includes(inputValue)) {
      this.answerCount++;
      return true;
    }

    if (typeof this.mistakeCounts[index] === 'undefined') {
      this.mistakeCounts[index] = 0;
    }
    this.mistakeCounts[index]++;
    return false;
  }

  nextPage(): void {
    if (this.round < QUIZ_COUNT) {
      this.router.navigate(['problem']);
    } else {
      this.router.navigate(['result']);
    }
  }

  roundCount(): void {
    ++this.round;
  }
}
