import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { InputDialogService } from '../services/input-dialog.service';
import { HabitDataService } from '../services/habit-data.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  title = "My Habits";
  habits = [];
  habitTypes = [];
  sortedByTypeHabits = [];
  errorMessage: String;

  constructor(public toastController: ToastController,
              public dataService: HabitDataService,
              public inputDialogService: InputDialogService,) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
    this.loadListView();
    this.getHabitTypes(this.habits);
    this.sortHabitsByType(this.habitTypes,this.habits);
    console.log("Data Changed");
    });
  }

  //Makes data appear on first load
  ngOnInit() {
    console.log("did init...");
    this.loadListView();
    this.getHabitTypes(this.habits);
    this.sortHabitsByType(this.habitTypes, this.habits);
  }
  //lifecycle for loading items when view enters:
  ionViewDidEnter() {
    console.log("did load...");
    this.loadListView();
    this.getHabitTypes(this.habits);
    this.sortHabitsByType(this.habitTypes, this.habits);
  }

  loadListView() {
    this.dataService.getHabits()
      .subscribe(
        habits => this.habits = habits,
        error => this.errorMessage = <any>error
      );
    console.log("Habit List View");
  }

  addItem() {
    console.log("adding item...");
    this.inputDialogService.showPrompt();
  }

  getHabitTypes(habits) {
    console.log("Organizing by type...");
    let types = [];
    habits.forEach(habit => {
      if(!types.includes(habit.habitType,0)){
        // console.log(!types.includes(habit.habitType,0));
        types.push(habit.habitType);
      }
      console.log(types);
    });
    this.habitTypes = types;
  }

  sortHabitsByType(types, habits){
    console.log("Sorting by type...");
    let sortedHabits = [];
    types.forEach(type => {
      let obj = {
        "type": type,
        "habits": []
      };
      habits.forEach(habit => {
        if (type == habit.habitType){
          obj.habits.push(habit);
        }
      });
      sortedHabits.push(obj);
    });
    console.log(sortedHabits);
    return sortedHabits;
  }

  getHabitsByType(habitType) {
    console.log("Getting habits of type: " + habitType);
    console.log(this.sortedByTypeHabits);
    let habits = [];
    this.sortedByTypeHabits.forEach(obj => {
      console.log(obj)
    })
    // console.log(habits);

  }

  async editHabit(habit, index) {
    console.log("Edit habit... ", habit, index);
    const toast = await this.toastController.create({
      // position: 'top',
      message: 'Editing Item - ' + index + '...',
      duration: 3000
    });
    toast.present();

    this.inputDialogService.showPrompt(habit, index)
  }

  async removeHabit(habit, index) {
    console.log(habit._id);

    this.dataService.removeHabit(habit._id);
  }

}
