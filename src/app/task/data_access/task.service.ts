import { Injectable } from "@angular/core";
import { BaseHttpService } from "../../shared/data_access/base_http.service";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class TaskService extends BaseHttpService {
    createTask(task: any): Observable<any> {
        return this.http.post(this.apiUrl, task);
    }
}