import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = ''
  isRequired: boolean = false;
  isLoggedIn: boolean = false;

  constructor (
    public router: Router,
  ) {}

  onclear() {
    this.username = '';
    this.isRequired = false;
  }

  onSubmit(form: NgModel) {
    
    if (form.invalid) {
      this.isRequired = true;
    }
    else {
      this.isRequired = false;
      localStorage.setItem('username', this.username);
      this.router.navigate(['todo-list']);
    }
  }
}
