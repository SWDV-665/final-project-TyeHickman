import { Component, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';
import { ToastController } from '@ionic/angular';
import { InputDialogService } from '../services/input-dialog-service.service';
// TODO: Import habit data service when created

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Dashboard";
  habits = [
    {
      habitName: "Mindful Breathing",
      habitType: "Build"
    },
    {
      habitName: "Nail Biting",
      habitType: "Break"
    }
  ];

  constructor(public toastController: ToastController,
              public inputDialogService: InputDialogService,) {}

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

  addItem() {
    console.log("Adding Item...");
    this.inputDialogService.showPrompt();
  }

}

