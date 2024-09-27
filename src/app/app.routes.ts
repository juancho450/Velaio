import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks',
    },
    {   
        path: 'tasks',
        loadComponent: () =>
            import('./feature/tasks/tasks.component').then((m) => m.TasksComponent),
    },{
        path: 'tasks-form',
        loadComponent: () =>
            import('./feature/tasks-form/tasks-form.component').then((m) => m.TasksFormComponent),
    },
];
