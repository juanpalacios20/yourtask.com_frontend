import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../data_access/task.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list-task',
  providers: [],
  imports: [NgIf, NgFor],
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

  deleteTask() {
    if (this.selectedTaskId !== null) {
      this.taskService.deleteTask(this.selectedTaskId).subscribe(
        () => {
          this.tasks = this.tasks.filter((task) => task.id !== this.selectedTaskId);
          console.log(`Tarea con id ${this.selectedTaskId} eliminada.`);
          this.closeModal();
        },
        (error) => {
          console.error('Error al eliminar tarea:', error);
        }
      );
    }
  }
  showModal: boolean = false; // Estado para mostrar el modal
  selectedTaskId: number | null = null; // ID de la tarea seleccionada

  openModal(taskId: number) {
    this.selectedTaskId = taskId;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedTaskId = null;
  }
}
