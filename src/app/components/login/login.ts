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
    
    localStorage.clear();
  }

  alEnviarLogin() {
    const usuarioLimpio = this.credenciales.usuario.trim();
    const contrasenaLimpia = this.credenciales.contrasena.trim();

    if (!usuarioLimpio || !contrasenaLimpia) {
      alert("⚠️ Por favor, ingresa tus credenciales completas.");
      return; 
    }

    if (usuarioLimpio.length === 5 && !isNaN(Number(usuarioLimpio))) {
      console.log("Detectado intento de acceso de Profesor...", usuarioLimpio);

      this.authService.iniciarSesion(this.credenciales).subscribe({
        next: (respuesta: any) => {
          console.log("¡Inicio de sesión de Profesor exitoso!", respuesta);
          
          if (respuesta && respuesta.token) {
            localStorage.setItem('token', respuesta.token);
          }

          const nombreRealProf = 
            respuesta?.usuario?.nombre || 
            respuesta?.profesor?.nombre || 
            respuesta?.nombre;
          
          const carreraProf = 
            respuesta?.usuario?.carrera || 
            respuesta?.profesor?.carrera || 
            respuesta?.carrera || 
            'Ingeniería en Computación';
          
          localStorage.setItem('nombreUsuario', nombreRealProf);
          localStorage.setItem('carreraUsuario', carreraProf);

          const usuarioSesion = { nombre: nombreRealProf, carrera: carreraProf };
          localStorage.setItem('usuario', JSON.stringify(usuarioSesion));

          this.router.navigate(['/dashboard-profesor']);
        },
        error: (err: any) => {
          console.error("Acceso denegado. El profesor no existe en la BD:", err);
          
          alert(err.error?.mensaje || '⚠️ Error: No se encontró ningún profesor registrado con esos datos.');
        }
      });
      return;

    } else if (usuarioLimpio.length === 10 && !isNaN(Number(usuarioLimpio))) {
      console.log("Detectado acceso de Alumno...", usuarioLimpio);

      this.authService.iniciarSesion(this.credenciales).subscribe({
        next: (respuesta: any) => { 
          console.log("¡Inicio de sesión de alumno exitoso!", respuesta);
          
          if (respuesta && respuesta.token) {
            localStorage.setItem('token', respuesta.token);
          } else {
            localStorage.setItem('token', 'token_temporal_seguro'); 
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

          const usuarioSesion = { 
            nombre: nombreRealAlumno, 
            carrera: carreraAlumno 
          };
          localStorage.setItem('nombreUsuario', usuarioSesion.nombre);
          localStorage.setItem('carreraUsuario', usuarioSesion.carrera);
          localStorage.setItem('usuario', JSON.stringify(usuarioSesion));

          this.router.navigate(['/dashboard-alumno']);
        },
        error: (err: any) => { 
          console.error("Error detectado en el botón de Login:", err);
          alert(err.error?.mensaje || 'Error en las credenciales de acceso del alumno.');
        }
      });

    } else {
      alert("⚠️ Formato de usuario inválido. Recuerda: Alumnos usan 10 números y Profesores usan 5 números.");
    }
  }
}