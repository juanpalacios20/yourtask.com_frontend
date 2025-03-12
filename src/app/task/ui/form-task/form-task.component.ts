import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../data_access/task.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form-task',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './form-task.component.html',
  styles: ``
})
export class FormTaskComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  onSubmit() {
    this.taskService.createTask(this.taskForm.value).subscribe(response => {
      console.log('Task created:', response);
      this.taskForm.reset();
    });
  }

}
