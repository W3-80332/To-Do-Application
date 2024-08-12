import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './Modal/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskSetviceService {

  constructor(private http:HttpClient) { }

  baseURL = "http://localhost:8080/";

  createNewTask(taskdata : Task) : Observable<any>{
    return this.http.post<any>(`http://localhost:3000/api/todos/`, taskdata);
  }

  getAllTask() : Observable<any>{
    return this.http.get<any>(`http://localhost:3000/api/todos/`);
  }

  editTask(id:any, task:Task) : Observable<any>{
    return this.http.put<any>(`http://localhost:3000/api/todos/${id}`,task);
  }

  getTaskId(id : any):Observable<Task>{
    return this.http.get<Task>(`http://localhost:3000/api/todos/${id}`);
  }

  deleteTask(id : any) : Observable<Task>{
    return this.http.delete<Task>(`http://localhost:3000/api/todos/${id}`)
  }
}
