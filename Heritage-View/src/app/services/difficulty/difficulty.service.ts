import { Injectable } from '@angular/core';
import { Difficulty } from 'src/app/types/difficulty';

@Injectable({
  providedIn: 'root',
})
export class DifficultyService {
  difficulty: Difficulty = 'normal';
  constructor() {}

  getDifficulty(): Difficulty {
    return this.difficulty;
  }

  setDifficulty(value: Difficulty): void {
    this.difficulty = value;
  }

  // get difficulty(): Difficulty {
  //   return this.difficulty;
  // }

  // set difficulty(value: Difficulty) {
  //   this.difficulty = value;
  // }
}
