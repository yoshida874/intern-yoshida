import { Component, OnInit } from '@angular/core';

export interface roundResult {
  missCount: number,
  clearTime: string
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  backHomeButton = 'ホームに戻る';

  roundResults: roundResult[] = [
    {missCount: 0, clearTime: '0:00:00'},
    {missCount: 0, clearTime: '0:00:00'},
    {missCount: 0, clearTime: '0:00:00'},
    {missCount: 0, clearTime: '0:00:00'},
    {missCount: 0, clearTime: '0:00:00'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
