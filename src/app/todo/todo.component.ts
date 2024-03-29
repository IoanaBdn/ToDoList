import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service'
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit 
{
  toDoListArray: any[];
  constructor( private toDoService: TodoService) { }

  ngOnInit() 
  {
    this.toDoService.getToDoList().snapshotChanges().subscribe(
      item =>
      {
        this.toDoListArray = [];
        item.forEach(element=>
          {
            console.log("Element: "+  JSON.stringify( element ) );
            var x = element.payload.toJSON();
            console.log("Payload: "+  JSON.stringify(element.payload) );
            x["$key"] = element.key;
            this.toDoListArray.push(x);
          }); 

          console.log("Array: "+  JSON.stringify(this.toDoListArray) );

          this.toDoListArray.sort( //function(a, b)
          (a, b)=> 
          {
            return a.isChecked - b.isChecked;
          });

      }
      );

     
  }

  onAdd(taskInput)
  {
    this.toDoService.addTask(taskInput.value);
    taskInput.value = null;
  }

  alterCheck($key: string, isChecked) 
  {
    console.log("Key: "+$key+" C: "+isChecked);
    this.toDoService.checkOrUncheckTask($key,!isChecked);
  }

  onDelete($key : string)
  {
    this.toDoService.removeTask($key);
  }
}
