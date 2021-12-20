import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { TimerService } from 'src/app/services/timer/timer.service';
import { Heritage } from 'src/app/types/heritage';

export interface roundResult {
  missCount: number;
  clearTime: string;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  heritages: Heritage[] = [];
  mistakeCounts: { [key: number]: number } = [];

  constructor(
    private quizService: QuizService,
    public timerService: TimerService
  ) {
    this.heritages = quizService.getAllQuiz();
    this.mistakeCounts = quizService.getMistakeCounts();
  }

  ngOnInit(): void {
    this.googleMapInit();
  }

  /**
   * google Mapの配置とピン刺し
   */
  googleMapInit(): void {
    const center = new google.maps.LatLng(35, 139);
    const map = new google.maps.Map(
      document.getElementById('resultMap') as Element,
      {
        center: center,
        zoom: 2,
      }
    );

    const icon = {
      fillColor: '#FF0000',
      fillOpacity: 0.8, // 透過率
      path: google.maps.SymbolPath.CIRCLE, //円を指定
      scale: 12,
      strokeColor: '#FF0000',
      strokeWeight: 1.0, //枠の透過率
    };

    const label = {
      text: '',
      color: '#FFFFFF',
      fontSize: '20px',
    };

    // 出題されたクイズのピンをループで刺す;
    this.heritages.forEach((heritage: Heritage, key) => {
      const position = new google.maps.LatLng(
        heritage.latitude,
        heritage.longitude
      );
      label.text = (key + 1).toString();
      const marker = new google.maps.Marker({
        map: map,
        position: position,
        icon: icon,
        label: label,
      });

      // マーカーに吹き出しを追加
      const InfoWindow = new google.maps.InfoWindow({
        content: `<div class="markerInfo">${heritage.name}</div>`,
      });
      marker.addListener('click', () => {
        InfoWindow.open(map, marker);
      });
    });
  }
}
