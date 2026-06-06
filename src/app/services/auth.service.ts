import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //  La dirección de tu Backend inteligente que acabamos de prender
  private URL_BACKEND = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  //  Función para registrar Alumnos o Profesores
  registrarUsuario(datosUsuario: any): Observable<any> {
    return this.http.post(`${this.URL_BACKEND}/registro`, datosUsuario);
  }
}