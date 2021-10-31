import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import * as dayjs from 'dayjs';

interface Heritage {
  latitude: number,
  longitude: number,
  hint: string[],
  name: string,
}

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

  heritage: AngularFirestoreCollection<Heritage>;
  latitude: number = 0;
  longitude: number = 0;
  hints: string[] = [];

  constructor(firestore: AngularFirestore) {
    this.heritage = firestore.collection<Heritage>('heritage', ref => ref.where('name', '==', '古都アユタヤ'));
  }

  ngOnInit(): void {
    this.heritage.valueChanges().subscribe(item => {
      this.latitude = item[0].latitude;
      this.longitude = item[0].longitude;
      this.hints = item[0].hint;
      this.streetViewInit().then(() => this.timerCountInit());
    });    
  }

  /**
   * streetViewを配置
   */
  async streetViewInit(): Promise<void> {
    const option = {
      addressControl: false, // 住所案内を非表示
      showRoadLabels: false, // 道路名を非表示
      position: {
        lat: this.latitude,
        lng: this.longitude
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
