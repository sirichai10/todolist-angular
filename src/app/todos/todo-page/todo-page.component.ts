import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Todos } from './services/todo.interface';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent {
  todoList: Todos[] = [];
  constructor(
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit() {
    const username = localStorage.getItem('username');
    if(username) {
      this.onGetAPIData();
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  onGetAPIData() {
    this.todoList = this.todoService.onGetTodoList() || [];
  }

  onCheckboxChange(event: Todos[]) {
    this.todoService.onUpdateTodoList(event);
    this.onGetAPIData();
  }
}
