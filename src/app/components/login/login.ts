import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  iniciarSesion(email: string, password: string) {
    if (!email || !password) {
      alert("Por favor, completa ambos campos.");
      return;
    } 
    console.log("Campos completos. Iniciando sesión...");
  }
}
