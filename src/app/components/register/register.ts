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
  // TU LÓGICA: Campos para guardar en MongoDB
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
    this.datos.carrera = carrera; // Vincula la carrera seleccionada a tus datos
    this.menuAbierto = false;
    console.log("Carrera seleccionada:", this.carreraSeleccionada);
  }

  
  registrarUsuario() {
    console.log("Intentando registrar usuario con datos:", this.datos);
    
    this.authService.registrarUsuario(this.datos).subscribe({
      next: (respuesta) => {
        console.log("Usuario registrado con éxito en MongoDB", respuesta);
        this.mostrarModal = true; 
      },
      error: (err) => {
        alert(err.error?.mensaje || 'Error al registrar');
      }
    });
  }
}