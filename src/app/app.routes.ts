import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./task/ui/product-shell/task-routes'),
    }
];
