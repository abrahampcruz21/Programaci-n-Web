import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  datos = {
    nombreCompleto: '',
    correoElectronico: '',
    matricula: '',
    contrasena: '',
    carrera: ''
  };

  constructor(private authService: AuthService) {}

  alEnviarFormulario() {
    this.authService.registrarUsuario(this.datos).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje);
      },
      error: (err) => {
        alert(err.error?.mensaje || 'Error al registrar');
      }
    });
  }
}