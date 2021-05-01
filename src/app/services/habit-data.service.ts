import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitDataService {
  habits: any = [];
  
  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";

  constructor(public http: HttpClient) { 
    console.log('Habit Data Service');
    
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
    console.log(this.dataChanged$);
  }

  
  getHabits(): Observable<any> {
    return this.http.get(this.baseURL + '/api/habits').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response){
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  removeHabit(id) {
    console.log("Remove Habit:  " + id);
    this.http.delete(this.baseURL + '/api/habits/' + id).subscribe(res => {
      this.habits = res;
      this.dataChangeSubject.next(true);
    });
  }

  
  addHabit(habit) {
    console.log("Adding item - " + habit.name);
    this.http.post(this.baseURL + '/api/habits', habit).subscribe(res => {
      this.habits = res;
      this.dataChangeSubject.next(true);
    });
  }

  
  editHabit(habit, index) {
    console.log('Editing Item... ' + habit._id);
    this.http.put(this.baseURL + '/api/habits/' + habit._id, habit).subscribe(res => {
      this.habits= res;
      this.dataChangeSubject.next(true);
    });
  }

  

}
