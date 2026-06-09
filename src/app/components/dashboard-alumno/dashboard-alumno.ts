import { Component, OnInit } from '@angular/core';

interface InformacionCarrera {
  objetivo: string;
  perfil: string;
}

@Component({
  selector: 'app-dashboard-alumno',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-alumno.html',
  styleUrls: ['./dashboard-alumno.scss']
})
export class DashboardAlumnoComponent implements OnInit {
  
  nombreAlumno: string = 'Abraham'; 
  carreraAlumno: string = 'Ingeniería en Computación'; 
  
  objetivoCarrera: string = '';
  perfilEgreso: string = '';

  private infoCarreras: Record<string, InformacionCarrera> = {
    'Ingeniería en Computación': {
      objetivo: 'Formar profesionales capaces de diseñar, desarrollar e implementar soluciones tecnológicas mediante software, hardware y sistemas computacionales.',
      perfil: 'Egresado con habilidades en programación, bases de datos, redes, ciberseguridad y desarrollo de sistemas para resolver problemas tecnológicos de distintos sectores.'
    },
    'Ingeniería Industrial': {
      objetivo: 'Formar ingenieros capaces de optimizar procesos, recursos y sistemas productivos para mejorar la eficiencia y competitividad de las organizaciones.',
      perfil: 'Profesional con conocimientos en gestión de operaciones, calidad, logística y mejora continua para incrementar la productividad empresarial.'
    },
    'Ingeniería Petrolera': { 
      objetivo: 'Formar especialistas en la exploración, extraction y aprovechamiento eficiente de los recursos petroleros y energéticos.',
      perfil: 'Egresado capacitado para participar en proyectos de exploración, perforación, producción y gestión de hidrocarburos con enfoque técnico y sostenible.'
    },
    'Ingeniería en Energías Renovables': {
      objetivo: 'Formar profesionales capaces de desarrollar e implementar soluciones energéticas sostenibles basadas en fuentes renovables.',
      perfil: 'Especialista en diseño, operación y evaluación de sistemas de energía solar, eólica y otras tecnologías limpias para la transición energética.'
    },
    'Ingeniería Química': {
      // 📝 ¡CORREGIDO AQUÍ! Cambiado 'objective' a 'objetivo'
      objetivo: 'Formar ingenieros capaces de transformar materias primas en productos útiles mediante procesos químicos seguros y eficientes.',
      perfil: 'Profesional con competencias en diseño, control y optimización de procesos industriales químicos, considerando aspectos económicos y ambientales.'
    },
    'Licenciatura en Matemáticas Aplicadas': {
      objetivo: 'Formar profesionales con sólida preparación matemática para modelar, analizar y resolver problemas en ciencia, tecnología e industria.',
      perfil: 'Egresado capaz de aplicar métodos matemáticos, estadísticos y computacionales en la investigación y solución de problemas complejos.'
    },
    'Ingeniería en Diseño': {
      objetivo: 'Formar profesionales capaces de crear productos, servicios y experiencias funcionales, innovadoras y centradas en el usuario.',
      perfil: 'Diseñador con habilidades para desarrollar soluciones creative e integrando estética, funcionalidad, tecnología y sostenibilidad.'
    }
  };

  ngOnInit() {
    this.cargarInformacionDeCarrera();
  }

  cargarInformacionDeCarrera() {
    const datos = this.infoCarreras[this.carreraAlumno];

    if (datos) {
      this.objetivoCarrera = datos.objetivo;
      this.perfilEgreso = datos.perfil;
    } else {
      this.objetivoCarrera = 'Objetivo de carrera no disponible.';
      this.perfilEgreso = 'Perfil de egreso no disponible.';
    }
  }
}