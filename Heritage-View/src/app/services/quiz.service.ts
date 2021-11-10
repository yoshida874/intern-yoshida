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
  answers: string[] = [];
  heritage: AngularFirestoreCollection<Heritage>;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
  ) { 
    this.heritage = this.firestore.collection<Heritage>('heritage', ref => ref.where('name', '==', '古都アユタヤ'));
    this.heritage.valueChanges().subscribe(item => {
      this.answers = item[0].answer;
    });
  }

  getQuiz(): AngularFirestoreCollection<Heritage> {
    return this.heritage;
  }

  checkAnswer(inputValue: string): void | boolean {
    if(this.answers.includes(inputValue)){
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
