import { Component, OnInit } from '@angular/core';

export interface card {
  title: string;
  imageSrc: string;
  link: string;
}

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})

export class TopComponent implements OnInit {

  explanationButtonText = '遊び方';

  cards: card[] = [
    { title: '全世界', imageSrc: '/assets/cardImages/全般.jpeg', link: "/problem" },
    { title: 'アジア', imageSrc: '/assets/cardImages/アジア.jpeg', link: "/problem" },
    { title: 'ヨーロッパ', imageSrc: '/assets/cardImages/ヨーロッパ.jpeg', link: "/problem" },
    { title: 'アメリカ', imageSrc: '/assets/cardImages/アメリカ.jpeg', link: "/problem" },
    { title: 'アフリカ', imageSrc: '/assets/cardImages/アフリカ.jpeg', link: "/problem" },
    { title: '南アメリカ/オセアニア', imageSrc: '/assets/cardImages/南アメリカ.jpeg', link: "/problem" },
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
