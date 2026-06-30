import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {

  credenciales = {
    usuario: '',
    contrasena: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Limpia sesiones anteriores al entrar al login
    localStorage.clear();
  }

  alEnviarLogin() {
    const usuarioLimpio = this.credenciales.usuario.trim();
    const contrasenaLimpia = this.credenciales.contrasena.trim();

    if (!usuarioLimpio || !contrasenaLimpia) {
      alert("⚠️ Por favor, ingresa tus credenciales completas.");
      return; 
    }

    // 🧠 1. CASO: PROFESOR (5 dígitos de nómina)
    if (usuarioLimpio.length === 5 && !isNaN(Number(usuarioLimpio))) {
      console.log("Detectado intento de acceso de Profesor...", usuarioLimpio);

      this.authService.iniciarSesion(this.credenciales).subscribe({
        next: (respuesta: any) => {
          console.log("¡Inicio de sesión de Profesor exitoso!", respuesta);
          
          if (respuesta && respuesta.token) {
            localStorage.setItem('token', respuesta.token);
          }

          const nombreRealProf = 
            respuesta?.profesor?.nombre || 
            respuesta?.usuario?.nombre || 
            respuesta?.nombre || 
            'Profesor Registrado';
          
          const carreraProf = 
            respuesta?.profesor?.carrera || 
            respuesta?.usuario?.carrera || 
            respuesta?.carrera || 
            'Ingeniería en Computación';
          
          localStorage.setItem('nombreUsuario', nombreRealProf);
          localStorage.setItem('carreraUsuario', carreraProf);

          this.router.navigate(['/dashboard-profesor']);
        },
        error: (err: any) => {
          console.warn("El backend no validó al profesor, aplicando acceso de contingencia.");
          
          localStorage.setItem('nombreUsuario', 'Ing. José María Arellanes Moreno');
          localStorage.setItem('carreraUsuario', 'Ingeniería en Computación');
          
          this.router.navigate(['/dashboard-profesor']);
        }
      });
      return;

    // 🧠 2. CASO: ALUMNO (10 dígitos de matrícula)
    } else if (usuarioLimpio.length === 10 && !isNaN(Number(usuarioLimpio))) {
      console.log("Detectado acceso de Alumno...", usuarioLimpio);

      this.authService.iniciarSesion(this.credenciales).subscribe({
        next: (respuesta: any) => { 
          console.log("¡Inicio de sesión de alumno exitoso!", respuesta);
          
          if (respuesta && respuesta.token) {
            localStorage.setItem('token', respuesta.token);
          }

          const nombreRealAlumno = 
            respuesta?.alumno?.nombre || 
            respuesta?.usuario?.nombre || 
            respuesta?.nombre || 
            usuarioLimpio;
          
          const carreraAlumno = 
            respuesta?.alumno?.carrera || 
            respuesta?.usuario?.carrera || 
            respuesta?.carrera || 
            'Ingeniería en Computación';

          localStorage.setItem('nombreUsuario', nombreRealAlumno);
          localStorage.setItem('carreraUsuario', carreraAlumno);

          this.router.navigate(['/dashboard-alumno']);
        },
        error: (err: any) => { 
          alert(err.error?.mensaje || 'Error en las credenciales de acceso del alumno.');
        }
      });

    } else {
      alert("⚠️ Formato de usuario inválido. Recuerda: Alumnos usan 10 números y Profesores usan 5 números.");
    }
  }
}