import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
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
  timer$ = timer(1000, 1000);

  constructor() {}

  ngOnInit(): void {
    // タイマーを1秒ずつ進める
    this.timer$.subscribe(() => {
      if(this.hintTimer.format('mm:ss') !== '00:00'){
        this.hintTimer = dayjs(this.hintTimer).subtract(1, 's');
        // ヒントのタイマーが０の時ヒントボタンを有効化
        if(this.hintTimer.format('mm:ss') === '00:00') this.hintButtonDisabled = false;
      }
      this.roundTimer = dayjs(this.roundTimer).add(1, 's');
    });
  }

  ngAfterViewInit(): void {
    const option = {
      addressControl: false,
      showRoadLabels: false,
      position: {
        lat: 42.345573,
        lng: -71.098326
      },
      pov: {
        heading: 34,
        pitch: 10,
      }
    }
    new google.maps.StreetViewPanorama(document.getElementById('pano') as Element, option);
  }

  openHint(): void {
    this.isVisibleHint = this.isVisibleHint ? false : true ;
  }

}
