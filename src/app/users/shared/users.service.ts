import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


@Injectable()
export class TodoService {

  private url = "http://todo-backend:8080/todo";

  constructor(private http: Http) { }

  getTodos() {
    return this.http.get(this.url)
      .map(res => res.json());
  }

  getTodo(id){
    return this.http.get(this.getTodoUrl(id))
      .map(res => res.json());
  }

  addTodo(todo){
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, JSON.stringify(todo), options)
      .map(res => res.json());
  }

  updateTodo(todo){
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(this.getTodoUrl(todo.id), JSON.stringify(todo), options)
      .map(res => res.json());
  }

  deleteTodo(id){
    return this.http.delete(this.getTodoUrl(id))
      .map(res => res.json());
  }

  private getTodoUrl(id){
    return this.url + '/' + id;
  }
}
