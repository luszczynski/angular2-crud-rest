import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Todo } from "../shared/todo";
import { TodoService } from "../shared/users.service";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"]
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  title: string;
  todo: Todo = new Todo();
  @Input() edit: boolean;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {
    this.form = formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(1)]],
      content: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    const id = this.route.params.subscribe(params => {
      this.edit = !!params.id;
      this.title = this.edit ? 'Edit Todo' : 'New Todo';

      if (!this.edit) {
        return;
      } else {
        this.todoService.getTodo(params.id).subscribe(
          todo => {
            this.todo.id = todo.id;
            this.todo.content = todo.content;
          },
          response => {
            if (response.status === 404) {
              this.router.navigate(["NotFound"]);
            }
          }
        );
      }
    });
  }

  save() {
    let result;
    const todoValue = this.form.value;
    if (this.edit) {
      result = this.todoService.updateTodo(todoValue);
    } else {
      result = this.todoService.addTodo(todoValue);
    }

    result.subscribe(data => this.router.navigate(['todos']));
  }
}
