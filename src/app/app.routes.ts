import { Routes } from '@angular/router';
import { PaisesCiudadesComponent } from './paises-ciudades/paises-ciudades.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { ResumenViajeComponent } from './resumen-viaje/resumen-viaje.component';
import { HistorialBusquedaComponent } from './historial-busqueda/historial-busqueda.component';

export const routes: Routes = [
  { path: '', redirectTo: 'paises-ciudades/inicio', pathMatch: 'full' },
  { path: 'paises-ciudades/inicio', component: PaisesCiudadesComponent },
  { path: 'paises-ciudades/presupuesto', component: PresupuestoComponent },
  { path: 'paises-ciudades/resumen-viaje', component: ResumenViajeComponent },
  { path: 'paises-ciudades/historial-busquedas', component: HistorialBusquedaComponent },
];
