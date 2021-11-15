import { Injectable } from '@angular/core';

type Difficulty = 'easy' | 'normal'; 

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {
  difficulty: Difficulty = 'normal';
  constructor() { }

  getDifficulty(): Difficulty {
    return this.difficulty;
  }

  setDifficulty(value: Difficulty): void {
    this.difficulty = value;
  }

}
