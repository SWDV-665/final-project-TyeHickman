import { Component, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';
import { ToastController } from '@ionic/angular';
import { InputDialogService } from '../services/input-dialog.service';
import { HabitDataService } from '../services/habit-data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Dashboard";
  habits = [];
  errorMessage: string;

  constructor(public toastController: ToastController,
              public dataService: HabitDataService,
              public inputDialogService: InputDialogService,) {
                dataService.dataChanged$.subscribe((dataChanged: boolean) => {
                  this.loadItems();
                  console.log("Data Changed");
                });
  }

//lifecycle for loading items when view enters:
ionViewDidEnter() {
  console.log("did load...");
  this.loadItems();
}

  loadItems() {
    this.dataService.getHabits()
      .subscribe(
        habits => this.habits = habits,
        error => this.errorMessage = <any>error
      );
    console.log("loading available habits from service...")
  }

  toggleReorder() {
    const reorderGroup = (document.getElementById('reorder') as any);
    reorderGroup.disabled = !reorderGroup.disabled;
    console.log(reorderGroup.disabled);
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  openHabitOptions(habit, index) {
    console.log("Opening Habit " + habit.habitName);
    this.inputDialogService.presentActionSheet(habit, index);
  }

}

