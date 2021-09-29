import { Component, OnInit } from '@angular/core';

export interface card {
  title: string;
  src: string;
}

@Component({
  selector: 'app-menu-cards',
  templateUrl: './menu-cards.component.html',
  styleUrls: ['./menu-cards.component.scss']
})
export class MenuCardsComponent implements OnInit {

  cards: card[] = [
    {title: '全世界', src: '/assets/cardImages/全般.jpeg'},
    {title: 'アジア', src: '/assets/cardImages/アジア.jpeg'},
    {title: 'ヨーロッパ', src: '/assets/cardImages/ヨーロッパ.jpeg'},
    {title: 'アメリカ', src: '/assets/cardImages/アメリカ.jpeg'},
    {title: 'アフリカ', src: '/assets/cardImages/アフリカ.jpeg'},
    {title: '南アメリカ/オセアニア', src: '/assets/cardImages/南アメリカ.jpeg'},
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
