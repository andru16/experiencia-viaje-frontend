import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasoService } from '../Services/paso.service';
import { ValidadorPasosService } from '../Services/validador-pasos.service';
import { PresupuestoService } from '../Services/presupuesto.service';
import { HistorialBusquedaService } from '../Services/Api/historial-busqueda.service';

@Component({
  selector: 'botones-navegacion',
  standalone: true,
  imports: [],
  template: `
    <div class="mt-5">
      @if(paso == 1){
        <div class="d-flex justify-content-end align-items-end">
          <button type="button" class="btn btn-sm btn-siguiente fs-6" (click)="siguientePaso()">Siguiente</button>
        </div>
      }

      @if (paso == 2) {
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-sm btn-atras border-1 fs-6" (click)="anteriorPaso()">Atrás</button>
          <button type="button" class="btn btn-sm btn-siguiente" (click)="siguientePaso()">Siguiente</button>
        </div>
      }

      @if (paso == 3) {
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-sm btn-atras fs-6" (click)="anteriorPaso()">Atrás</button>
          <button type="button" class="btn btn-sm btn-siguiente fs-6" (click)="siguientePaso()">Volver al inicio</button>
        </div>
      }
    </div>

  `,
  styles: `
    .btn-siguiente {
      color: #007bff;
      border: 1px !important;
      border-color: #007bff !important;
      border-style: solid !important;
    }

    .btn-siguiente:hover {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff !important;
    }

    .btn-atras {
      color: #6c757d;
      border: 1px !important;
      border-color: #6c757d !important;
      border-style: solid !important;
    }

    .btn-atras:hover {
      color: #fff;
      background-color: #6c757d;
      border-color: #6c757d;
    }
  `
})
export class BotonesNavegacionComponent {
  paso!: number;

  constructor
  (
    private router:Router,
    private pasoService: PasoService,
    private validadorPasos: ValidadorPasosService,
    private presupuestoService: PresupuestoService,
    private historialBusquedaService: HistorialBusquedaService,
  ){}

  ngOnInit(): void {
    this.pasoService.pasoActual.subscribe(paso => this.paso = paso);
  }

  siguientePaso() {
    this.validadorPasos.pasoActualData.subscribe(datosPasos => {

      if (!datosPasos['paso1'].completado) {
        console.log(`No puedes avanzar al siguiente paso hasta que completes`);
        return;
      }

      this.pasoService.userHasClicked(); // Indicamos que el usuario ha hecho clic
      let siguientePaso = this.pasoService.incrementarPaso();
      this.navegarPaso(siguientePaso);

    })
  }

  anteriorPaso() {
    this.pasoService.userHasClicked(); // Indicamos que el usuario ha hecho clic
    let pasoAnterior = this.pasoService.decrementarPaso();
    this.navegarPaso(pasoAnterior);
  }


  navegarPaso(paso: number) {


    switch(paso) {
      case 1:
        this.router.navigate(['paises-ciudades/inicio']);
        break;
      case 2:
        this.router.navigate(['paises-ciudades/presupuesto']);
        break;
      case 3:
        let id_pais = this.validadorPasos.obtenerDatos()['paso1']['data']['pais']['id'];
        let id_ciudad = this.validadorPasos.obtenerDatos()['paso1']['data']['ciudad']['id'];
        let presupuesto = this.presupuestoService.getPresupuesto();

        this.historialBusquedaService.registrarDato(id_pais, id_ciudad, presupuesto);

        this.router.navigate(['paises-ciudades/resumen-viaje']);
        break;
      default:
        this.router.navigate(['paises-ciudades/inicio']);
    }
  }
}

