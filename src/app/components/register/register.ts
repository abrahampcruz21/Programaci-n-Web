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
