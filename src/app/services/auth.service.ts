import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // 1. REGISTRO AUTOMÁTICO (Guarda al alumno directamente en MongoDB)
  registrarUsuario(datos: any): Observable<any> {
    const datosFormateados = {
      ...datos,
      carrera: datos.carrera ? datos.carrera : 'No especificada'
    };
    return this.http.post(`${this.API_URL}/registro`, datosFormateados);
  }

  // 2. LOGIN INTELIGENTE (Traduce 'usuario' a 'matricula' para el backend)
  iniciarSesion(credenciales: any): Observable<any> {
    const datosParaBackend = {
      matricula: credenciales.usuario,    // <-- ¡Aquí está el truco! Traducimos el campo de Abraham
      contrasena: credenciales.contrasena // Coincide idéntico con tu backend
    };
    return this.http.post(`${this.API_URL}/login`, datosParaBackend);
  }
}