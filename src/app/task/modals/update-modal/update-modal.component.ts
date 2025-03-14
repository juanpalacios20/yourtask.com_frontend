import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../data_access/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-modal',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.scss',
})
export class UpdateModalComponent implements OnChanges{
  @Input() isVisible = false;
  @Input() task: any | null = null;
  @Output() confirm = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task !== null) {
      this.loadTaskDetails();
    }
  }


  loadTaskDetails() {
    this.taskService.getTask(this.task).subscribe(
      (data) => {
        this.taskForm.patchValue({
          title: data.title,
          description: data.description,
        });
      },
      (error) => {
        console.error('Error al obtener tarea:', error);
      }
    );
  }

  closeModal() {
    this.close.emit();
  }

  confirmUpdate() {
    this.confirm.emit(this.taskForm.value);
  }
}
