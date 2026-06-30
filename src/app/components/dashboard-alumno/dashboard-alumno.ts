import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface InformacionCarrera {
  objetivo: string;
  perfil: string;
}

@Component({
  selector: 'app-dashboard-alumno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-alumno.html',  // 👈 Apunta a tu archivo dashboard-alumno.html sin el ".component"
  styleUrls: ['./dashboard-alumno.scss']     // 👈 Apunta a tu archivo dashboard-alumno.scss sin el ".component"
})
export class DashboardAlumnoComponent implements OnInit {
  
  nombreAlumno: string = 'Alumno'; 
  carreraAlumno: string = 'Ingeniería en Computación';
  
  objetivoCarrera: string = '';
  perfilEgreso: string = '';

  // Datos lógicos del Tutor (Requisito del manual SIGATAA)
  nombreTutor: string = 'Ing. José María Arellanes Moreno';
  edificioTutor: string = 'Edificio Alfa';
  cuboTutor: string = 'Cubo 12';

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
      objetivo: 'Formar especialistas en la exploración, extracción y aprovechamiento eficiente de los recursos petroleros y energéticos.',
      perfil: 'Egresado capacitado para participar en proyectos de exploración, perforación, producción y gestión de hidrocarburos con enfoque técnico y sostenible.'
    },
    'Ingeniería en Energías Renovables': {
      objetivo: 'Formar profesionales capaces de desarrollar e implementar soluciones energéticas sostenibles basadas en fuentes renovables.',
      perfil: 'Especialista en diseño, operación y evaluación de sistemas de energía solar, eólica y otras tecnologías limpias para la transición energética.'
    },
    'Ingeniería Química': {
      objetivo: 'Formar ingenieros capaces de transformar materias primas en productos útiles mediante procesos químicos seguros y eficientes.',
      perfil: 'Profesional con competencias en diseño, control y optimización de procesos industriales químicos, considerando aspectos económicos y ambientales.'
    },
    'Licenciatura en Matemáticas Aplicadas': {
      objetivo: 'Formar profesionales con sólida preparación matemática para modelar, analizar y resolver problemas en ciencia, tecnología e industria.',
      perfil: 'Egresado capaz de aplicar métodos matemáticos, estadísticos y computacionales en la investigación y solución de problemas complejos.'
    },
    'Ingeniería en Diseño': {
      objetivo: 'Formar profesionales capaces de crear productos, servicios y experiencias funcionales, innovadoras y centradas en el usuario.',
      perfil: 'Diseñador con habilidades para desarrollar soluciones creativas e integrando estética, funcionalidad, tecnología y sostenibilidad.'
    }
  };

  ngOnInit() {
    this.recuperarUsuario();
    this.cargarInformacionDeCarrera();
  }

  recuperarUsuario() {
    const usuarioGuardado = localStorage.getItem('nombreUsuario');
    if (usuarioGuardado) {
      const limpio = usuarioGuardado.trim();
      if (!isNaN(Number(limpio))) {
        this.nombreAlumno = 'Angel Adair';
      } else {
        this.nombreAlumno = limpio.split(' ')[0];
      }
    } else {
      this.nombreAlumno = 'Angel Adair';
    }
  }

  cargarInformacionDeCarrera() {
    const carreraGuardada = localStorage.getItem('carreraUsuario');
    if (carreraGuardada) {
      this.carreraAlumno = carreraGuardada;
    }

    const datos = this.infoCarreras[this.carreraAlumno];
    if (datos) {
      this.objetivoCarrera = datos.objetivo;
      this.perfilEgreso = datos.perfil;
    } else {
      this.objetivoCarrera = 'Formar profesionales de excelencia adaptados a las demandas del sector tecnológico y productivo regional.';
      this.perfilEgreso = 'Profesional competente con visión innovadora, ética y herramientas analíticas aplicadas a su área de especialización.';
    }

    // Asignación lógica de tutor según la carrera
    if (this.carreraAlumno.includes('Industrial')) {
      this.nombreTutor = 'Dra. María Elena López';
      this.edificioTutor = 'Edificio Beta';
      this.cuboTutor = 'Cubo 5';
    } else if (this.carreraAlumno.includes('Diseño')) {
      this.nombreTutor = 'M.C. Roberto Gómez';
      this.edificioTutor = 'Edificio Gamma';
      this.cuboTutor = 'Cubo 8';
    } else {
      // Computación por defecto
      this.nombreTutor = 'Ing. José María Arellanes Moreno';
      this.edificioTutor = 'Edificio Alfa';
      this.cuboTutor = 'Cubo 12';
    }
  }
}