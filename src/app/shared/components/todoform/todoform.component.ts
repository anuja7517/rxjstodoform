import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Itodo } from '../../models/interface';
import { UuidService } from '../../service/uuid.service';
import { TodoService } from '../../service/todo.service';


@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.scss']
})
export class TodoformComponent implements OnInit {
  todoForm !: FormGroup;
  isEditMode : boolean = false;
  editTodo ! : Itodo;
  constructor(private _uuservice :UuidService,
               private _todoservice :TodoService ) { }

  ngOnInit(): void {
    this.creatTodoform();
    this._todoservice.editupdate$
    .subscribe(todo =>{
      //console.log(todo);
      this.editTodo= todo;
      this.isEditMode = true;
      this.todoForm.patchValue(todo)
      
    })
  }
  creatTodoform(){
    this.todoForm = new FormGroup({
      todoItem : new FormControl(null,[Validators.required])
    })
  }
  onsubmit(){
    if(this.todoForm.valid){
      console.log(this.todoForm.value);
      let todoObj :Itodo = {...this.todoForm.value,todoId : this._uuservice.uuid()}
      // this._todoservice.todoSubject$.next(todoObj);
      this._todoservice.addTodo(todoObj);
      this.todoForm.reset()
    }
  }
  onUpdate(){
    if(this.todoForm.valid){
      let updated ={...this.todoForm.value,todoId : this.editTodo.todoId};
      console.log(updated);
      this._todoservice.updateTodo(updated);
      this.todoForm.reset();
      this.isEditMode = false;
      
    }
  }


 

}
