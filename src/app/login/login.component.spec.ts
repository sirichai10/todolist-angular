import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let btnClear: DebugElement;
  let btnSubmit: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
      ],
    });
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    btnClear = fixture.debugElement.query(By.css('.btn-secondary'));
    btnSubmit = fixture.debugElement.query(By.css('.btn-primary'));
    fixture.detectChanges();
    
  });

// ================================== onSubmit ==================================
  it('should log-in when click onSubmit', () => {
    const form = { invalid: false } as NgModel;
    spyOn(component.router, 'navigate');
    component.onSubmit(form);

    expect(component.isRequired).toBe(false);
    expect(localStorage.getItem('username')).toBe(component.username);
    expect(component.router.navigate).toHaveBeenCalledWith(['todo-list']);
  });

  it('should have error message when form invalid', () => {
    const form = { invalid: true } as NgModel;
    component.onSubmit(form);
    
    expect(component.isRequired).toBeTruthy();
  })

// ================================== onClear ==================================
  it('should clear username when click onClear', () => {
    component.username = 'test';
    component.isRequired = true;
    component.onclear();

    expect(component.username).toBe('');
    expect(component.isRequired).toBe(false);
  });

});