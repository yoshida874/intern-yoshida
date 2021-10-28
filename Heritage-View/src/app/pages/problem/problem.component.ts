import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})

export class ProblemComponent implements OnInit {

  ansButtonText = '解答';
  tipsButtonText = 'ヒント▼';
  isVisibleHint = false;
  hintButtonDisabled = true;

  roundTimer = dayjs().minute(0).second(0);
  hintTimer = dayjs().minute(0).second(7);

  constructor() {}

  ngOnInit(): void {
    this.streetViewInit().then(() => this.timerCountInit());
  }

  /**
   * streetViewを配置
   */
  async streetViewInit(): Promise<void> {
    const option = {
      addressControl: false, // 住所案内を非表示
      showRoadLabels: false, // 道路名を非表示
      position: {
        lat: 42.345573,
        lng: -71.098326
      },
      pov: {
        heading: 34,
        pitch: 10,
      }
    }
    await new google.maps.StreetViewPanorama(document.getElementById('pano') as Element, option);
  }

  /**
   * ヒント、タイマーのカウントを１秒ずつ進める
   */
  timerCountInit(): void {
    const timer$ = timer(1000, 1000);
    timer$.subscribe(() => {
      if(this.hintTimer.format('mm:ss') !== '00:00'){
        this.hintTimer = dayjs(this.hintTimer).subtract(1, 's');
        // ヒントのタイマーが０の時ヒントボタンを有効化
        if(this.hintTimer.format('mm:ss') === '00:00') this.hintButtonDisabled = false;
      }
      this.roundTimer = dayjs(this.roundTimer).add(1, 's');
    });
  }

  openHint(): void {
    this.isVisibleHint = this.isVisibleHint ? false : true ;
  }

}
