import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { DashboardAlumnoComponent } from './components/dashboard-alumno/dashboard-alumno';
import { MenuProfesoresComponent } from './components/menu-profesores/menu-profesores.component';
import { AgendarFechaComponent } from './components/agendar-fecha/agendar-fecha.component';
import { DashboardProfesorComponent } from './components/dashboard-profesor/dashboard-profesor.component';
import { authGuard } from './auth.guard'; 

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
    component: DashboardAlumnoComponent,
    canActivate: [authGuard] 
  },
  {
    path: 'menu-profesores',
    component: MenuProfesoresComponent,
    canActivate: [authGuard]
  },
  {
    path: 'agendar-fecha',
    component: AgendarFechaComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard-profesor',
    component: DashboardProfesorComponent,
    canActivate: [authGuard]
  },

  { 
    path: '**', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  }
];