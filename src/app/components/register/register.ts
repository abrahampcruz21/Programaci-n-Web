import { Component } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
=======
import { RouterLink } from '@angular/router';
>>>>>>> 3bf1c7c82bbb9f4580b78a7afa2a738650a4df83

@Component({
  selector: 'app-register',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule],
=======
  imports: [RouterLink],
>>>>>>> 3bf1c7c82bbb9f4580b78a7afa2a738650a4df83
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
<<<<<<< HEAD
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
=======
  //VARIABLES DEL COMPONENTE
  mostrarModal: boolean = false;
  menuAbierto: boolean = false;
  carreraSeleccionada: string = ''; // <-- ¡Importante declararla aquí!

  //FUNCIONES DEL MENÚ DESPLEGABLE 
  toggleDesplegable() {
    this.menuAbierto = !this.menuAbierto;
  }

  seleccionarCarrera(carrera: string) {
    this.carreraSeleccionada = carrera;
    this.menuAbierto = false;
    console.log("Carrera seleccionada:", this.carreraSeleccionada);
  }

  //LOGICÁ DE REGISTRO 
  registrarUsuario() {
    console.log("Usuario registrado");  
    this.mostrarModal = true;
  }
}
>>>>>>> 3bf1c7c82bbb9f4580b78a7afa2a738650a4df83
