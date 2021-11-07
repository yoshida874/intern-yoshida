import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

const QUIZ_COUNT = 5;

interface Heritage {
  latitude: number,
  longitude: number,
  hint: string[],
  answer: string[],
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  questionCount: number = 0;
  answerCount: number = 0;
  heritage: AngularFirestoreCollection<Heritage>;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
  ) { 
    this.heritage = this.firestore.collection<Heritage>('heritage', ref => ref.where('name', '==', '古都アユタヤ'));
  }

  // initQuiz(): void {
  // }

  getQuiz(): AngularFirestoreCollection<Heritage> {
    return this.heritage;
  }

  checkAnswer(): void {
    ++this.answerCount;
    ++this.questionCount;
  }

  nextPage(): void {
    this.checkAnswer();
    if (this.questionCount <= QUIZ_COUNT) {
      this.router.navigateByUrl('/answer');
    } else {
      this.router.navigate(['result']);
    }
  }
}
