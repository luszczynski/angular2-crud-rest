import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TodoService } from './shared/users.service';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule
  ],
  declarations: [
    UsersComponent,
    UserFormComponent
  ],
  exports: [
    UsersComponent
  ],
  providers: [
    TodoService
  ]
})
export class UsersModule { }
