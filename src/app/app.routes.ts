import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { DashboardAlumnoComponent } from './components/dashboard-alumno/dashboard-alumno';

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
  { path: '', 
    redirectTo: '/login', pathMatch: 'full' 
  }
];
