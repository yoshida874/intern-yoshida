import { Component, OnInit } from '@angular/core';

// 難易度 0: かんたん 1: ふつう
type Difficulty = 0 | 1;

@Component({
  selector: 'app-difficulty-set',
  templateUrl: './difficulty-set.component.html',
  styleUrls: ['./difficulty-set.component.scss']
})
export class DifficultySetComponent implements OnInit {

  difficulty: Difficulty = 1;

  constructor() { }

  ngOnInit(): void {
  }
  
  difficultyChange(putValue: Difficulty): void {
    this.difficulty = putValue;
  }

}
