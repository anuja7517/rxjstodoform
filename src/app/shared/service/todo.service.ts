import { Injectable, OnInit } from '@angular/core';
import { Itodo } from '../models/interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService  {

  TodoArray : Array<Itodo> = [
    {
      todoItem : "vivo",
      todoId: "12"
    }
  ]
  todoSubject$ : Subject <Itodo> =new Subject();
  editupdate$ : Subject<Itodo> = new Subject()
  constructor(){
    this.todoSubject$
    .subscribe(res =>{
      //console.log(res);
      this.TodoArray.push(res);
      console.log(this.TodoArray);
      

      
    })
  }

  fetchAlltodo(): Array<Itodo>{
    return this.TodoArray
  }
 
 addTodo (todo : Itodo){
  this.TodoArray.push(todo)
 }
 updateTodo(updated : Itodo){
  for (let i = 0; i < this.TodoArray.length; i++) {
   if(this.TodoArray[i].todoId ===updated.todoId){
    this.TodoArray[i]= updated;
   }
    
  }
 }
 removeTodo (todo : Itodo){
  let getIndex = this.TodoArray.findIndex(todo => todo.todoId === todo.todoId);
  this.TodoArray.splice(getIndex,1)
 }
}
