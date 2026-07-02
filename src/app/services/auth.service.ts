import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  registrarUsuario(datos: any): Observable<any> {
    const datosFormateados = {
      ...datos,
      carrera: datos.carrera ? datos.carrera : 'No especificada'
    };
    return this.http.post(`${this.API_URL}/registro`, datosFormateados);
  }

  iniciarSesion(credenciales: any): Observable<any> {
    const datosParaBackend = {
      matricula: credenciales.usuario,   
      contrasena: credenciales.contrasena
    };
    return this.http.post(`${this.API_URL}/login`, datosParaBackend);
  }
}