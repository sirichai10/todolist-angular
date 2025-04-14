import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoformComponent } from './todoform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todos } from '../todo-page/services/todo.interface';

describe('TodoformComponent', () => {
  let component: TodoformComponent;
  let fixture: ComponentFixture<TodoformComponent>;
  let mockTodoList: Todos[];
  type selectedType  = "all" | "active" | "completed";
  let selected: selectedType;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoformComponent],
      imports: [FormsModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(TodoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockTodoList = [
        { id: 1, content: "task 1", isComplete: false },
        { id: 2, content: "task 2", isComplete: true },
    ];
  });

// ================================== ngOnInit ==================================
  it('should initailize component onInit', () => {
    const spy = spyOn(component, 'generateId');
    component.ngOnInit();

    expect(component.itemList).toEqual(component.todoList.length);
    expect(component.todoListFilter).toEqual(component.todoList);
    expect(component.selectedTab).toEqual('all');
    expect(spy).toHaveBeenCalled();
  });

// ================================== onCheckComplete ==================================
  it('should update status isComplete and emit updated data todo list', () => {
    spyOn(component.itemEmit, 'emit');
    spyOn(component, 'countItem');
    component.todoList = mockTodoList;
    const iDToggle = 1;
    component.onCheckComplete(iDToggle);
    const toggledItem = component.todoList.find(item => item.id === iDToggle);
    
    expect(toggledItem?.isComplete).toBe(true); // toggle isComplete false -> true
    expect(component.itemEmit.emit).toHaveBeenCalledWith(component.todoList);
    expect(component.todoListFilter).toEqual(component.todoList);
    expect(component.countItem).toHaveBeenCalled();
  });

// ================================== onFilterComplete ==================================
  it('should call onFilterComplete when isComplete to bo true', () => {
    component.todoList = mockTodoList;
    const itemComplete = component.onFilterComplete();

    expect(itemComplete.length).toBe(1)
  })

// ================================== onSelectedTab all ==================================
  it('should return all data when click all tab', () => {
    spyOn(component, 'countItem')
    selected = 'all'
    component.onSelectedTab(selected);

    expect(component.selectedTab).toEqual(selected)
    expect(component.todoListFilter).toEqual(component.todoList)
    expect(component.countItem).toHaveBeenCalled()
  })

// ================================== onSelectedTab active ==================================
  it('should return active data when click active tab', () => {
    spyOn(component, 'countItem')
    selected = 'active'
    component.onSelectedTab(selected);
    const dataFilter = component.onFilterActive();

    expect(component.selectedTab).toEqual(selected)
    expect(component.todoListFilter).toEqual(dataFilter)
    expect(component.countItem).toHaveBeenCalled()
  })

// ================================== onSelectedTab completed ==================================
  it('should return completed data when click completed tab', () => {
    spyOn(component, 'countItem')
    selected = 'completed'
    component.onSelectedTab(selected);
    const dataFilter = component.onFilterComplete();

    expect(component.selectedTab).toEqual(selected)
    expect(component.todoListFilter).toEqual(dataFilter)
    expect(component.countItem).toHaveBeenCalled()
  })

// ================================== onClearTab ==================================
  it('should clear data when data isComplete to be true', () => {
    const dataFilter = component.onFilterActive();
    spyOn(component.itemEmit, 'emit');
    spyOn(component, 'generateId')
    component.onClearTab();

    expect(component.todoList).toEqual(dataFilter);
    expect(component.itemEmit.emit).toHaveBeenCalledWith(component.todoList);
    expect(component.todoListFilter).toEqual(component.todoList);
    expect(component.generateId).toHaveBeenCalled()
  })

// ================================== onSubmit ==================================
  it('should save data when click submit button', () => {
    component.todoForm.setValue('new task')
    component.onSubmit();

    expect(component.todoList.length).toBe(1);
  })

  it('should not save data when content duplicate', () => {
    component.todoList = [{ id: 1, content: "task 1", isComplete: false }]
    component.todoForm.setValue('task 1')
    component.onSubmit();

    expect(component.todoList.length).toBe(1); //content duplicate not add new task
  })
  
});