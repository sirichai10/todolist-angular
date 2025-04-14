import { TestBed } from "@angular/core/testing";
import { TodoService } from "./todo.service";
import { Todos } from "./todo.interface";
describe('TodoService', () => {

    let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
  })

// ================================== onGetTodoList ==================================
    it('should get data from API todo service', () => {
        const mockTodoList = {id: 1, content: "test content",isComplete: false }
        spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockTodoList))
        const result = service.onGetTodoList();
        
        expect(result).toEqual(mockTodoList);
    })

    it('should get data from API todo service when no data', () => {
        spyOn(localStorage, 'getItem').and.returnValue(null);
        const result = service.onGetTodoList();

        expect(result).toEqual('');
    })

// ================================== onUpdateTodoList ==================================
    it('should update data from API todo service', () => {
        let todoData : Todos[] = [{ id: 1, content: "test content", isComplete: false }];
        service.onUpdateTodoList(todoData);
        const todos = localStorage.getItem('todoList') || '';
        const todoList = JSON.parse(todos);
        
        expect(todoList?.length).toBe(1);
    })
})