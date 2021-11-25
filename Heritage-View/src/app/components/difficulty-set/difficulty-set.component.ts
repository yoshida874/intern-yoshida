import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DifficultyService } from 'src/app/services/difficulty/difficulty.service';
import { Difficulty } from 'src/app/types/difficulty';

@Component({
  selector: 'app-difficulty-set',
  templateUrl: './difficulty-set.component.html',
  styleUrls: ['./difficulty-set.component.scss']
})
export class DifficultySetComponent implements OnInit {

  difficulty: Difficulty = this.difficultyService.getDifficulty();

  constructor(
    private difficultyService: DifficultyService
  ) { }

  ngOnInit(): void {
  }

  difficultyChange(putValue: Difficulty): void {
    this.difficulty = putValue;
    this.difficultyService.setDifficulty(this.difficulty);
  }

}
