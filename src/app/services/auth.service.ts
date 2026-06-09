import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // 1. Simulador para la pantalla de Registro
  registrarUsuario(datos: any): Observable<any> {
    console.log('--- [Simulador AuthService] Enviando datos a MongoDB ---', datos);
    // Simula una respuesta exitosa del servidor tras 1 segundo
    return of({ mensaje: 'Usuario creado con éxito (Simulado)', status: 201 }).pipe(delay(1000));
  }

  // 2. Simulador para la pantalla de Login
  iniciarSesion(credenciales: any): Observable<any> {
    console.log('--- [Simulador AuthService] Validando credenciales ---', credenciales);
    
    // De manera simulada, dejamos pasar cualquier login para que puedas ver tu Dashboard
    return of({ 
      mensaje: 'Login correcto (Simulado)', 
      token: 'token-falso-sigataa-2026',
      usuario: credenciales.usuario 
    }).pipe(delay(1000));
  }
}