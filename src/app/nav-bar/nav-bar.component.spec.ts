import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { NavBarComponent } from './nav-bar.component';


describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let btnLogout: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [
        FormsModule,
        AppRoutingModule,
      ],
    });
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    btnLogout = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

// ================================== onLogout ==================================
  it('click onLogout should clear username', fakeAsync( () => {
    btnLogout.triggerEventHandler('click', null);
    fixture.detectChanges();
    flush();
    expect(component.userLogIn).toEqual('');
  }))

});
