import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users.component';


const usersRoutes: Routes = [
  { path: 'todos', component: UsersComponent, pathMatch: 'full' },
  { path: 'todos/new', component: UserFormComponent},
  { path: 'todos/:id', component: UserFormComponent}
];

export const usersRouting = RouterModule.forChild(usersRoutes);
