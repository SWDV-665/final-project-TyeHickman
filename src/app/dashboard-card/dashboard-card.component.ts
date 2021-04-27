import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
})
export class DashboardCardComponent implements OnInit {
  @Input() name: string;
  @Input() habitName: string;

  constructor() { }

  ngOnInit() {}

}
