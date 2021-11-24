import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Heritage } from '../../types/heritage';

import { AngularFirestore } from '@angular/fire/compat/firestore';

const QUIZ_COUNT = 5;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  round: number = 0;
  // 難易度が簡単の時
  answerCount: number = 0;
  heritages: Heritage[] = [];

  constructor(private router: Router, private firestore: AngularFirestore) {}

  quizInit() {
    const heritageCollection = this.firestore.collection<Heritage>('heritage');
    const items = heritageCollection.valueChanges();
    return items;
  }

  setQuiz(heritages: Heritage[]) {
    this.heritages = heritages;
  }

  getQuiz(): Heritage {
    return this.heritages[this.round];
  }

  checkAnswer(inputValue: string): void | boolean {
    const heritage = this.heritages[this.round];
    if (heritage.answer.includes(inputValue)) {
      ++this.answerCount;
      return true;
    } else return false;
  }

  nextPage(): void {
    if (this.round <= QUIZ_COUNT) {
      this.router.navigateByUrl('/answer');
    } else {
      this.router.navigate(['result']);
    }
  }

  roundCount(): void {
    ++this.round;
  }
}
