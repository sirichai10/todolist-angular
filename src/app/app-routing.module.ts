import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoPageComponent } from './todos/todo-page/todo-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'todo-list', component: TodoPageComponent},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
