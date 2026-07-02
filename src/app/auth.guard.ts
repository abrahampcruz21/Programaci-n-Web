import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const usuario = localStorage.getItem('usuario');
  const nombreUsuario = localStorage.getItem('nombreUsuario');

  if (usuario || nombreUsuario) {
    return true;
  }

  console.warn('Acceso denegado por el Guardián. Redirigiendo...');
  router.navigate(['/login']);
  return false;
};