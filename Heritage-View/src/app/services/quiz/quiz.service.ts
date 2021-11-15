import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Heritage } from '../../types/heritage';

import { AngularFirestore } from '@angular/fire/compat/firestore';

const QUIZ_COUNT = 5;

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  questionCount: number = 0;
  answerCount: number = 0;
  heritage!: Heritage;


  constructor(
    private router: Router,
    private firestore: AngularFirestore,
  ) {
    const heritageCollection = this.firestore.collection<Heritage>('heritage', ref => ref.where('name', '==', '古都アユタヤ'));
    heritageCollection.valueChanges().subscribe(item => {
      this.heritage = item[0];
    });
  }

  getQuiz(): Heritage {
    return this.heritage!;
  }

  checkAnswer(inputValue: string): void | boolean {
    if(this.heritage.answer.includes(inputValue)){
      ++this.answerCount;
      ++this.questionCount;
      return true;
    }
    else return false;
  }

  nextPage(): void {
    if (this.questionCount <= QUIZ_COUNT) {
      this.router.navigateByUrl('/answer');
    } else {
      this.router.navigate(['result']);
    }
  }
}
