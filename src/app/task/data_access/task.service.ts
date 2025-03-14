import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data_access/base_http.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService extends BaseHttpService {
  tasks: any[] = [];

  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTask(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, task);
  }
}
