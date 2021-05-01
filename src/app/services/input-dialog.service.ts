import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular'
import { HabitDataService } from './habit-data.service';
import { Vibration } from '@ionic-native/vibration/ngx';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public alertController: AlertController,
              public actionSheetController: ActionSheetController,
              public dataService: HabitDataService,
              private vibration: Vibration) { 
    console.log("Initate INPUT DIALOG SERVICE");
  }

  async showPrompt(habit?, index?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: habit ? 'Edit Habit' : 'Add Habit',
      // message: item ? "Please edit item..." : "Please add item...",
      message: "Please " + (habit ? "edit" : "add") + " habit...",
      inputs: [
        {
          name: 'habitName',
          type: 'text',
          value: habit ? habit.habitName : null
        },
        {
          name: 'habitType',
          type: 'text',
          value: habit ? habit.habitType : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          // handler: (item) => {
          //   console.log('Confirm Ok', item);
          //   if (index !== undefined){
          //     this.dataService.editItem(item, index);
          //   }
          //   else {
          //     this.dataService.addItem(item);
          //   }
          handler: data => {
            console.log('Saving data... ' + data);
            if (index !== undefined) {
              habit.habitName = data.habitName;
              habit.habitType = data.habitType;
              this.dataService.editHabit(habit,index);
            }
            else {
              this.dataService.addHabit(data);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // This is used in the Dashboards
  async presentActionSheet(habit,index) {
    const actionSheet = await this.actionSheetController.create({
      header: habit.habitName + ' Options',
      buttons: [
        // {
        //   text: 'Share',
        //   icon: 'share',
        //   handler: () => {
        //     console.log('Share clicked');
        //   }
        // }, 
        {
          text: 'I did this',
          icon: (habit.habitType == 'Break' ? 'remove':'add') + '-circle' ,
          handler: () => {
            console.log('Tracking clicked');
            console.log('Cordova vibration...');
            this.vibration.vibrate(500);
            habit.Occurences = habit.Occurences + 1;
            console.log(habit.Occurences);
            this.dataService.editHabit(habit, index)
          }
        }, 
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

}
