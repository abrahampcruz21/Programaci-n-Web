import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardAlumnoComponent } from './dashboard-alumno'; // Ruta corregida

describe('DashboardAlumnoComponent', () => {
  let component: DashboardAlumnoComponent;
  let fixture: ComponentFixture<DashboardAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAlumnoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAlumnoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});