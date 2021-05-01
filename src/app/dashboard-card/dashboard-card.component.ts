import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, Input } from '@angular/core';
import { InputDialogService } from '../services/input-dialog.service'

@Component({
  selector: 'dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
})
export class DashboardCardComponent implements OnInit {
  @Input() habitName: string;
  @Input() habitType: string;
  @Input() habitOccurences: number;

  constructor( public inputDialogService: InputDialogService) { }

  ngOnInit() {}

  
  // openHabitOptions(habit) {
  //   console.log("Opening Habit " + habit.habitName);
  //   this.inputDialogService.presentActionSheet();
  // }
}
