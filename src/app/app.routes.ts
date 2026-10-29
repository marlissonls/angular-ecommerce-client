import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    // Manter aqui a configuração da tela de login existente.
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      // Adicionar aqui as rotas existentes que exigem autenticação.
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
