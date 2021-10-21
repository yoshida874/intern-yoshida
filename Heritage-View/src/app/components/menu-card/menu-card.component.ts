import { Component, OnInit, Input } from '@angular/core';

export interface card {
  title: string;
  imageSrc: string;
}

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {

  @Input() card: card = {title: 'hoge', imageSrc: 'huga'};

  constructor() { }

  ngOnInit(): void {
  }

}
