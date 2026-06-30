import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-profesores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './menu-profesores.component.html',
  styleUrl: './menu-profesores.component.scss'
})
export class MenuProfesoresComponent {

  // Función agregada para solucionar el error de compilación NG9 de tu HTML
  irAHorario(nombre: string, carrera: string) {
    console.log("Navegando al horario del profesor:", nombre, carrera);
    // Lógica de navegación o redirección pendiente
  }

}