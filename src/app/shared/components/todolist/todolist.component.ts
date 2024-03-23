import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { Itodo } from '../../models/interface';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
todoArr :Array<Itodo> = [];
  constructor(private _todoservices :TodoService,
                ) { }

  ngOnInit(): void {
    this.todoArr = this._todoservices.fetchAlltodo()
  }
  onedit(todo :Itodo){
    console.log(todo);
    //this.todoArr.push(todo);
    this._todoservices.editupdate$.next(todo);
    
  }
  ondelete(todo: Itodo){
    this._todoservices.removeTodo(todo);
  }
}
