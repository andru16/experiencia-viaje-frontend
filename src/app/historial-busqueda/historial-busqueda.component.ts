import { Component } from '@angular/core';
import { HistorialBusquedaService } from '../Services/Api/historial-busqueda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-busqueda',
  standalone: true,
  imports: [],
  template: `
    <table class="table table-striped ">
      <thead>
        <tr>
          <th scope="col">País</th>
          <th scope="col">Ciudad</th>
          <th scope="col">Presupuesto</th>
          <th scope="col">Fecha de la Búsqueda</th>
        </tr>
      </thead>
      <tbody>
      @for(busqueda of historialBusquedas; track busqueda.id){
        <tr>
          <td>{{ busqueda.pais }}</td>
          <td>{{ busqueda.ciudad }}</td>
          <td>{{ busqueda.presupuesto }}</td>
          <td>{{ busqueda.fecha }}</td>
      </tr>
      }
      </tbody>
    </table>

  `,
  styles: ``
})
export class HistorialBusquedaComponent {

  historialBusquedas: any;

  constructor
  (
    private historialBusquedaService:HistorialBusquedaService,
    private router: Router,
  ){}

  ngOnInit(): void {

    this.historialBusquedaService.consultarDatos().then(datos => {
      this.historialBusquedas = datos;
      console.log(this.historialBusquedas);
    });

    this.currentRoute
  }

  get currentRoute() {
    console.log(this.router.url);

    return this.router.url;
  }

  volverInicio(){
    this.router.navigate(['paises-ciudades/resumen-viaje']);
  }
}
