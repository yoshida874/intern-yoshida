import { Component, OnInit } from '@angular/core';

export interface heritage {
  name: string
  Commentary: string[]
}

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  nextButtonText = '次の問題へ';
  heritage: heritage = {
    name: '古都アユタカ',
    Commentary: [
      '1991年に世界遺産に登録',
      '14世紀に栄えたアユタヤ王朝の遺跡',
      'ワット・プラ・シーサンペット、ワット・マハータートが有名'
    ]
  };

  constructor() { }
  ngOnInit(): void {
  }

}
