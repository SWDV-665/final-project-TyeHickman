import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitDataService {
  items: any = [];
  
  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";

  constructor(public http: HttpClient) { 
    console.log('Habit Data Service');
    
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
    console.log(this.dataChanged$);
  }

  // TODO: changed URL
  getItems(): Observable<any> {
    return this.http.get(this.baseURL + '/api/groceries').pipe(
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

  // TODO: changed URL
  removeItem(id) {
    console.log("Remove item:  " + id);
    this.http.delete(this.baseURL + '/api/groceries/' + id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  // TODO: changed URL
  addItem(item) {
    // this.items.push(item);
    console.log("Adding item - " + item.name);
    this.http.post(this.baseURL + '/api/groceries', item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  // TODO: changed URL
  editItem(item, index) {
    console.log('Editing Item... ' + item._id);
    this.http.put(this.baseURL + '/api/groceries/' + item._id, item).subscribe(res => {
      this.items= res;
      this.dataChangeSubject.next(true);
    });
    // this.items[index] = item;
  }

}
