import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
  { path: 'settings-audit', children: [
    { path: 'security', redirectTo: '' },
    { path: 'logs', redirectTo: '' }
  ]}
];

