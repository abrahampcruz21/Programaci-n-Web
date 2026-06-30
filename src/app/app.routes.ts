import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { DashboardAlumnoComponent } from './components/dashboard-alumno/dashboard-alumno';
import { MenuProfesoresComponent } from './components/menu-profesores/menu-profesores.component';
import { AgendarFechaComponent } from './components/agendar-fecha/agendar-fecha.component';
// 🔥 NUEVA IMPORTACIÓN DEL PANEL DE PROFESOR:
import { DashboardProfesorComponent } from './components/dashboard-profesor/dashboard-profesor.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'dashboard-alumno', 
    component: DashboardAlumnoComponent
  },
  {
    path: 'menu-profesores',
    component: MenuProfesoresComponent
  },
  {
    path: 'agendar-fecha',
    component: AgendarFechaComponent
  },
  // 🔥 NUEVA RUTA CONECTADA PARA EL PROFESOR:
  {
    path: 'dashboard-profesor',
    component: DashboardProfesorComponent
  },
  { 
    path: '**', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  }
];