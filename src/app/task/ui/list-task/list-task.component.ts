import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../data_access/task.service';
import { NgFor, NgIf } from '@angular/common';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { UpdateModalComponent } from '../../modals/update-modal/update-modal.component';

@Component({
  selector: 'app-list-task',
  providers: [],
  imports: [NgIf, NgFor, DeleteModalComponent, UpdateModalComponent],
  templateUrl: './list-task.component.html',
  styles: ``,
})
export default class ListTaskComponent implements OnInit {
  //arreglo de las tareas que se muestran en la vista
  tasks: any[] = [];
  //un estado para saber si el modal del delete esta abierto
  isModalOpen = false;
  //id de la tarea que se va a eliminar
  taskToDelete: number | null = null;
  taskForm: FormGroup;
  isModalUpdateOpen = false;
  tasktoUpdate: number | null = null;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error al obtener tareas:', error);
      }
    );
  }

  openDeleteModal(taskId: number) {
    this.taskToDelete = taskId;
    this.isModalOpen = true;
  }

  deleteTask() {
    if (this.taskToDelete !== null) {
      this.taskService.deleteTask(this.taskToDelete).subscribe(
        () => {
          if (this.taskToDelete !== null) {
            this.tasks = this.tasks.filter(
              (task) => task.id !== this.taskToDelete
            );
            console.log('Task deleted:', this.taskToDelete);
            this.isModalOpen = false;
          }
        },
        (error) => {
          console.error('Error al eliminar tarea:', error);
        }
      );
    }
  }

  openUpdateModal(task: any) {
    this.tasktoUpdate = task;
    this.isModalUpdateOpen = true;
  }

  updateTask(updatedTask: any) {
    try {
      if (this.tasktoUpdate !== null) {
        this.taskService
          .updateTask(this.tasktoUpdate, updatedTask)
          .subscribe((response) => {
            console.log('Task updated:', response);
            this.taskForm.reset();
            this.isModalUpdateOpen = false;
            this.loadTasks();
          });
      }
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  }
}
