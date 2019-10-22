import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Injectable({
  providedIn: 'root'
})
export class TodoService 
{
  toDoList: AngularFireList<any>;
  constructor( private firebasedb: AngularFireDatabase) { }

  getToDoList()
  {
    this.toDoList = this.firebasedb.list('tasks');
    return this.toDoList;
  }

  addTask(task: string)
  {
    this.toDoList.push(
      {
        task: task,
        isChecked: false
      });
  }

  checkOrUncheckTask($key: string, flag: boolean)
  {
    this.toDoList.update($key, {isChecked: flag});
  }

  removeTask($key: string)
  {
    this.toDoList.remove($key);
  }


}
