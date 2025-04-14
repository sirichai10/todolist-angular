import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Todos } from '../todo-page/services/todo.interface';

type selectedType  = "all" | "active" | "completed";

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.css']
})

export class TodoformComponent {
  @Input() todoList: Todos[] = [];
  @Output() itemEmit = new EventEmitter();

  todoForm = new FormControl('', Validators.required);
  todoListFilter: Todos[] = [];
  isComplete = false;
  itemList: number | undefined;
  todo: Todos | undefined;
  selectedTab: string = '';
  id = 0;

  ngOnInit() {
    this.itemList = this.todoList?.length;
    this.todoListFilter = this.todoList;
    this.selectedTab = 'all';
    this.generateId();
    console.log(typeof this.todoListFilter);
    
  }

  generateId() {
    this.id = this.todoList[this.todoList.length-1]?.id || 0;
  }

  onCheckComplete(id: number) {
    let itemId = this.todoList.findIndex(item => item.id === id);

    this.todoList[itemId].isComplete = !this.todoList[itemId].isComplete;
    this.itemEmit.emit(this.todoList);

    //count item active
    this.todoListFilter = this.todoList;
    this.countItem();
  }

  countItem() {
    let count = this.onFilterActive();
    this.itemList = count.length;
  }

  onFilterActive() {
    return this.todoList.filter(
      item => item.isComplete === false
    );
  }

  onFilterComplete() {
    return this.todoList.filter(
        item => item.isComplete === true
    );
  }

  onSelectedTab(tab : selectedType) {
    this.selectedTab = tab;
    switch(tab) {
      case('all') :
        this.todoListFilter = this.todoList;
        break;
      case('active') :
        this.todoListFilter = this.onFilterActive();
        break;
      case('completed') :
        this.todoListFilter = this.onFilterComplete();
        break;
    }
    this.countItem();
  }

  onClearTab() {
    this.todoList = this.onFilterActive();
    this.itemEmit.emit(this.todoList);
    this.todoListFilter = this.todoList;
    this.generateId();
  }

  onSubmit() {
    let isRepeat = this.todoList.findIndex(
      item => item.content === this.todoForm.value
    );

    if(this.todoForm.valid && isRepeat === -1) {
      this.todo = {
        id: this.id+=1,
        content: this.todoForm.value,
        isComplete: false
      }

      this.todoList.push(this.todo);
      this.todoForm.reset();
      this.todoListFilter  = this.todoList;
      this.countItem();
      this.itemEmit.emit(this.todoList);
    }
  }

}

