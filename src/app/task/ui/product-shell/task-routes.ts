import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('../form-task/form-task.component'),
    },
    {
        path: 'tasks',
        loadComponent: () => import('../list-task/list-task.component'),
    }
] as Routes;