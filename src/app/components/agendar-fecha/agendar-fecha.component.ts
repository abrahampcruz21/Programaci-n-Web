import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // 👈 Esto evita que la pantalla se quede congelada

@Component({
  selector: 'app-agendar-fecha',
  standalone: true,
  imports: [CommonModule], // 👈 Aseguramos que carguen los bloques grises
  templateUrl: './agendar-fecha.component.html',
  styleUrls: ['./agendar-fecha.component.scss']
})
export class AgendarFechaComponent implements OnInit {
  nombreProfesor: string = 'General';
  gradoAcademico: string = 'Maestría';
  bloquesHorario: any[] = [];

  mostrarExito: boolean = false;
  mostrarError: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Escuchamos si viene un profesor por la URL, si no, se queda como General
    this.route.queryParams.subscribe(params => {
      this.nombreProfesor = params['nombre'] || 'General';
      this.gradoAcademico = params['grado'] || 'Maestría';
      
      // Limpiamos la matriz antes de generarla para que no se duplique
      this.bloquesHorario = [];
      this.generarMatrizHorarios();
    });
  }

  generarMatrizHorarios() {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const horas = ['09:00', '11:00', '14:00', '15:00', '16:00'];

    for (let h of horas) {
      for (let d of dias) {
        const horaNum = parseInt(h.split(':')[0]);
        let esReceso = false;

        // Reglas de receso automáticas
        if (this.gradoAcademico === 'Maestría' && horaNum === 14) {
          esReceso = true; // Bloquea 2:00 PM
        } else if (this.gradoAcademico === 'Doctorado' && (horaNum === 14 || horaNum === 15)) {
          esReceso = true; // Bloquea 2:00 PM y 3:00 PM
        }

        this.bloquesHorario.push({
          dia: d,
          hora: h,
          esReceso: esReceso,
          estado: esReceso ? 'denegado' : 'disponible'
        });
      }
    }
  }

  solicitarAsesorica(bloque: any) {
    if (bloque.esReceso || bloque.estado === 'denegado') {
      this.mostrarError = true;
    } else {
      bloque.estado = 'asignado'; // Lo pinta de AZUL
      this.mostrarExito = true;
    }
  }

  cerrarAlerta() {
    this.mostrarExito = false;
    this.mostrarError = false;
  }
}