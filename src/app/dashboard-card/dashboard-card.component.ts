import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
})
export class DashboardCardComponent implements OnInit {
  @Input() habitName: string;
  @Input() habitType: string;

  constructor() { }

  ngOnInit() {}

}
