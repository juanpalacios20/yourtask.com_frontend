import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../data_access/task.service';
import { NgFor, NgIf } from '@angular/common';
import { DeleteModalComponent } from '../../modals/delete-modal/delete-modal.component';

@Component({
  selector: 'app-list-task',
  providers: [],
  imports: [NgIf, NgFor, DeleteModalComponent],
  templateUrl: './list-task.component.html',
  styles: ``,
})
export default class ListTaskComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

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

  isModalOpen = false;
  taskToDelete: number | null = null;

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
}
