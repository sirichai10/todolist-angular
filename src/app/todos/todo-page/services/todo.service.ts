import { Injectable } from "@angular/core";

import { Todos } from "./todo.interface";

@Injectable({
    providedIn: 'root',
  })
export class TodoService {
    onGetTodoList() {
        const res = localStorage.getItem('todoList');
        return res ? JSON.parse(res) : '';
    }

    onUpdateTodoList(data: Todos[]) {
        localStorage.setItem('todoList', JSON.stringify(data))
    }
}