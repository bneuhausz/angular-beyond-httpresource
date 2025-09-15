import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'posts-resource',
    loadComponent: () => import('./posts-resource')
  },
  {
    path: 'posts-rxresource',
    loadComponent: () => import('./posts-rx-resource')
  },
  {
    path: '**',
    redirectTo: 'posts-resource'
  }
];
