import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Todo } from "./shared/todo";
import { TodoService } from "./shared/users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
    });
  }

  deleteTodo(todo) {
    if (confirm("Are you sure you want to delete " + todo.content + "?")) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);

      //this.router.navigate(['todos']);

      this.todoService.deleteTodo(todo.id).subscribe(null, err => {
        alert("Could not delete todo.");
        // Revert the view back to its original state
        this.todos.splice(index, 0, todo);
      });
    }
  }
}
