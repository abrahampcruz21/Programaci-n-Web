import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  // Objeto para capturar lo que el usuario escribe en el formulario
  credenciales = {
    usuario: '',
    contrasena: ''
  };

  // Inyectamos el servicio y el enrutador
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // FUNCIÓN PRINCIPAL DEL INICIO DE SESIÓN
  alEnviarLogin() {
    // 1. Candado estricto: Validación de espacios en blanco
    if (!this.credenciales.usuario.trim() || !this.credenciales.contrasena.trim()) {
      alert("⚠️ Por favor, ingresa tus credenciales completas.");
      return; 
    }

    console.log("Credenciales validadas. Intentando conectar con el servidor...", this.credenciales);

    // 2. Conexión con el servicio rumbo a MongoDB
    // 💡 NOTA: Si 'iniciarSesion' sigue subrayado, haz Ctrl+Clic en 'AuthService' arriba (línea 5)
    // para abrir el archivo y confirmar si tu compañero le puso 'login' o 'ingresar'.
    this.authService.iniciarSesion(this.credenciales).subscribe({
      next: (respuesta: any) => { 
        console.log("¡Inicio de sesión exitoso!", respuesta);
        
        // Guardamos el token en el navegador por seguridad si el backend lo genera
        if (respuesta && respuesta.token) {
          localStorage.setItem('token', respuesta.token);
        }

        // Redirección directa a tu panel premium de bienvenida
        this.router.navigate(['/dashboard-alumno']);
      },
      error: (err: any) => { 
        alert(err.error?.mensaje || 'Error en las credenciales de acceso.');
      }
    });
  }
}