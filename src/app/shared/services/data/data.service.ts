import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../interfaces/task.interface';
import { TASK } from '../../const/task';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = new BehaviorSubject<Task[]>(TASK);
  public data$ = this.data.asObservable();

  constructor() { }

  setData(data: Task) {
    const currentData = this.data.value;
    this.data.next([...currentData, data]);
  }

  updateData(data: Task){
    const currentData = this.data.value;

    const updatedData = currentData.map(task => 
      task === data ? data : task
    );

  this.data.next(updatedData);

  }

  getData() : Task[] {
    return this.data.value;
  }
}
