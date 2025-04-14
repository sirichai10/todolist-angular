import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  userLogIn: string = '';
  constructor (
    private router: Router,
  ) {
    const user = localStorage.getItem('username');
    this.userLogIn = user || '';
  }

  onLogout() {
    localStorage.removeItem('username');
    this.userLogIn = '';
    this.router.navigate(['login']);
  }
}
