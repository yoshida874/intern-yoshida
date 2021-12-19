import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss'],
})
export class RoundComponent implements OnInit {
  @Input() currentRound = 0;
  @Input() rounds = 0;
  constructor() {}

  ngOnInit(): void {}
}
