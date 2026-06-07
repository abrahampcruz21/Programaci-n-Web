import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  // VARIABLES DEL COMPONENTE
  mostrarModal: boolean = false;
  menuAbierto: boolean = false;
  carreraSeleccionada: string = '';

  // FUNCIONES DEL MENÚ DESPLEGABLE 
  toggleDesplegable() {
    this.menuAbierto = !this.menuAbierto;
  }

  seleccionarCarrera(carrera: string) {
    this.carreraSeleccionada = carrera;
    this.menuAbierto = false;
    console.log("Carrera seleccionada:", this.carreraSeleccionada);
  }

  // LÓGICA DE REGISTRO
  registrarUsuario(nombre: string, matricula: string, email: string, password: string) {
    // El .trim() asegura que no manden espacios vacíos ocultos
    if (!nombre.trim() || !matricula.trim() || !email.trim() || !password.trim() || !this.carreraSeleccionada) {
      alert("Por favor, completa todos los campos y selecciona una carrera.");
      return;
    }
    
    console.log("Usuario registrado con éxito:", { nombre, matricula, email, carrera: this.carreraSeleccionada });  
    this.mostrarModal = true;
  }
}