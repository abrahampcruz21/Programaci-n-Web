import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-profesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-profesor.component.html',
  styleUrls: ['./dashboard-profesor.component.scss']
})
export class DashboardProfesorComponent implements OnInit {

  // Variables dinámicas para el nombre y carrera del profesor
  nombreProfesor: string = 'Docente';
  carreraProfesor: string = 'Ingeniería en Computación';
  
  // Datos lógicos de ubicación del profesor (Página 9 del PDF)
  edificioProfesor: string = 'Edificio Alfa';
  cuboProfesor: string = 'Cubo 12';

  // Listados requeridos que inician vacíos para funcionar de forma real
  alumnosAsignados: string[] = [];
  solicitudes: any[] = [];
  citasConfirmadas: any[] = [];

  // Control de Modales (Rechazo obligatorio según el PDF)
  mostrarModal: boolean = false;
  motivoRechazo: string = '';
  solicitudSeleccionada: any = null;

  ngOnInit() {
    // 🧠 LEEMOS EL NOMBRE Y CARRERA GENÉRICOS GUARDADOS POR EL LOGIN
    const nombreReal = localStorage.getItem('nombreUsuario');
    const carreraReal = localStorage.getItem('carreraUsuario');

    if (nombreReal) {
      // Si el nombre no tiene un título formal, le agregamos "Ing. " de forma elegante
      if (!nombreReal.startsWith('Ing.') && !nombreReal.startsWith('M.C.') && !nombreReal.startsWith('Dr.') && !nombreReal.startsWith('Profesor')) {
        this.nombreProfesor = 'Ing. ' + nombreReal;
      } else {
        this.nombreProfesor = nombreReal;
      }
    } else {
      this.nombreProfesor = 'Ing. José María Arellanes Moreno';
    }

    if (carreraReal) {
      this.carreraProfesor = carreraReal;
    }

    // Configuramos los datos físicos y alumnos según la carrera
    this.ajustarEspacioYAlumnos();
  }

  ajustarEspacioYAlumnos() {
    // Asignación de Edificio y Cubo Lógico (Página 9 del PDF)
    if (this.carreraProfesor.includes('Industrial')) {
      this.carreraProfesor = 'Ingeniería Industrial';
      this.edificioProfesor = 'Edificio Beta';
      this.cuboProfesor = 'Cubo 5';
      this.alumnosAsignados = ['Sofía García Ruiz', 'Carlos Mendoza Torres'];
    } else if (this.carreraProfesor.includes('Diseño')) {
      this.carreraProfesor = 'Ingeniería en Diseño';
      this.edificioProfesor = 'Edificio Gamma';
      this.cuboProfesor = 'Cubo 8';
      this.alumnosAsignados = ['Ana Patricia Morales', 'Mario López, Sánchez'];
    } else {
      // Por defecto Computación
      this.carreraProfesor = 'Ingeniería en Computación';
      this.edificioProfesor = 'Edificio Alfa';
      this.cuboProfesor = 'Cubo 12';
      this.alumnosAsignados = ['Ángel Adair Epitacio Linares', 'Abraham Pineda De La Cruz', 'Ricardo Hernández Medina'];
    }
    
    // Las solicitudes inician vacías, esperando a que los alumnos las envíen en la vida real
    this.solicitudes = [];
    this.citasConfirmadas = [];
  }

  // 📲 SIMULACIÓN INTELIGENTE (Para tu exposición en vivo)
  simularLlegadaDeAsesoria() {
    this.solicitudes.push({
      id: Date.now(), 
      alumno: 'Ángel Adair Epitacio Linares',
      materia: 'Programación Web',
      fecha: 'Hoy - 5:00 PM'
    });
    alert('🔔 ¡Nueva solicitud de asesoría recibida en tiempo real!');
  }

  // Lógica de confirmar asesoría
  confirmarAsesoria(id: number) {
    const indice = this.solicitudes.findIndex(s => s.id === id);
    if (indice !== -1) {
      const aprobada = this.solicitudes.splice(indice, 1)[0];
      this.citasConfirmadas.push(aprobada);
      alert(`✓ Asesoría confirmada exitosamente para ${aprobada.alumno}.`);
    }
  }

  // Lógica de apertura y cierre de modal de rechazo
  abrirModalRechazo(solicitud: any) {
    this.solicitudSeleccionada = solicitud;
    this.motivoRechazo = '';
    this.mostrarModal = true;
  }

  cerrarModalRechazo() {
    this.mostrarModal = false;
    this.solicitudSeleccionada = null;
  }

  confirmarRechazoFinal() {
    if (!this.motivoRechazo.trim()) {
      alert('⚠️ El motivo del rechazo es obligatorio según el reglamento del sistema.');
      return;
    }

    const id = this.solicitudSeleccionada.id;
    this.solicitudes = this.solicitudes.filter(s => s.id !== id);
    
    alert(`✗ Solicitud rechazada. Motivo enviado al alumno: "${this.motivoRechazo}"`);
    this.cerrarModalRechazo();
  }
}