import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  
  // Estructura de datos unificada para el Backend
  datos = {
    nombreCompleto: '',
    correoElectronico: '',
    matricula: '',
    contrasena: '',
    carrera: ''
  };

  mostrarModal: boolean = false;
  menuAbierto: boolean = false;
  carreraSeleccionada: string = '';

  constructor(private authService: AuthService) {}

  toggleDesplegable() {
    this.menuAbierto = !this.menuAbierto;
  }

  seleccionarCarrera(carrera: string) {
    this.carreraSeleccionada = carrera;
    this.datos.carrera = carrera; // Vincula la carrera al objeto de envío
    this.menuAbierto = false;
    console.log("Carrera seleccionada con éxito:", this.carreraSeleccionada);
  }

  // ESTA FUNCIÓN PROCESA TODO EL FORMULARIO AL DAR CLIC EN REGISTRARSE
  alEnviarFormulario() {
    // 1. Candado de seguridad: Tus validaciones .trim() usando el objeto de datos
    if (
      !this.datos.nombreCompleto.trim() || 
      !this.datos.matricula.trim() || 
      !this.datos.correoElectronico.trim() || 
      !this.datos.contrasena.trim() || 
      !this.datos.carrera
    ) {
      alert("⚠️ Por favor, completa todos los campos vacíos y selecciona una carrera.");
      return; // Frena el envío si hay trampas o espacios en blanco
    }

    console.log("Campos validados de forma estricta. Conectando con MongoDB...", this.datos);
    
    // 2. Lógica del backend: Envía la información al servicio si pasó el candado
    this.authService.registrarUsuario(this.datos).subscribe({
      next: (respuesta) => {
        console.log("¡Usuario guardado con éxito en la base de datos!", respuesta);
        this.mostrarModal = true; // Abre tu ventana modal de cristal de éxito
      },
      error: (err) => {
        alert(err.error?.mensaje || 'Ocurrió un error al intentar registrar al usuario.');
      }
    });
  }
}