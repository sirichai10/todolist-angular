import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPageComponent } from './todo-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TodoService } from './services/todo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from 'src/app/nav-bar/nav-bar.component';
import { TodoformComponent } from '../todoform/todoform.component';
import { Router } from '@angular/router';

describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;
  let todoService: TodoService;
  let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoPageComponent,
        NavBarComponent,
        TodoformComponent,
      ],
      imports: [
        AppRoutingModule,
        RouterTestingModule,
      ],
      providers: [
        TodoPageComponent, 
        TodoService,
        Router
      ],
    });
    fixture = TestBed.createComponent(TodoPageComponent);
    component = component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    router = TestBed.inject(Router);
    // fixture.detectChanges();
  });

// ================================== ngOnInit ==================================
  it('should navigate to login when no username', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'navigate');
    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call onGetAPIData when has username', () => {
    spyOn(localStorage, 'getItem').and.returnValue('testUser');
    spyOn(component, 'onGetAPIData');
    component.ngOnInit();

    expect(component.onGetAPIData).toHaveBeenCalled();
  });

// ================================== onGetAPIData ==================================
  it('should set todoList from todoService in onGetAPIData', () => {
    const todoList = [{id: 1, content: "test content", isComplete: false,}]
    spyOn(todoService, 'onGetTodoList').and.returnValue(todoList);
    component.onGetAPIData();

    expect(component.todoList).toEqual(todoList);
  });

  it('should set todoList from todoService in onGetAPIData when no data', () => {
    spyOn(todoService, 'onGetTodoList').and.returnValue(null);
    component.onGetAPIData();

    expect(component.todoList).toEqual([]);
  });

// ================================== onCheckboxChange ==================================
  it('should call onCheckboxChange function', () => {
    const todoList = [{
      id: 1,
      content: "test content",
      isComplete: false,
    }]
    spyOn(todoService, 'onUpdateTodoList');
    spyOn(todoService, 'onGetTodoList');
    component.onCheckboxChange(todoList);

    expect(todoService.onUpdateTodoList).toHaveBeenCalledWith(todoList);
    expect(todoService.onGetTodoList).toHaveBeenCalled();
  });
});

