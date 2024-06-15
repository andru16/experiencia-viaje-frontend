import { Component } from '@angular/core';
import { ClimaComponent } from '../clima/clima.component';
import { PresupuestoService } from '../Services/presupuesto.service';
import { CambioMonedaService } from '../Services/Api/cambio-moneda.service';
import { ValidadorPasosService } from '../Services/validador-pasos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen-viaje',
  standalone: true,
  imports: [ CommonModule, ClimaComponent],
  templateUrl: './resumen-viaje.component.html',
  styleUrl: './resumen-viaje.component.css'
})
export class ResumenViajeComponent {

  pais: any;
  ciudad: any;
  codigoMoneda: any;
  datosTasaDeCambio: any;
  informacionMoneda: any;
  presupuestoEnPesos: any = 0;
  presupuestoConvertido: any = 0;

  private codigosCiudadMap: { [key: string]: string } = {
    'Dinamarca': 'DKK',
    'Inglaterra': 'GBP',
    'India': 'INR',
    'Japón': 'JPY'
  };

  constructor(
    private informacion: ValidadorPasosService,
    private presupuestoService: PresupuestoService,
    private cambioMonedaService: CambioMonedaService,
  ) {}

  ngOnInit(): void {

    this.pais = this.informacion.obtenerDatos()['paso1']['data']['pais']['nombre'];
    this.ciudad = this.informacion.obtenerDatos()['paso1']['data']['ciudad']['nombre'];
    this.codigoMoneda = this.codigosCiudadMap[this.pais];
    this.presupuestoEnPesos = this.presupuestoService.getPresupuesto();

    this.obtenerTasaDeCambioYInformacionMoneda().then(() => {
      this.convertirPresupuesto();
    });

  }

  async obtenerTasaDeCambioYInformacionMoneda(): Promise<void> {
    try {
      const respuestaTasaDeCambio = await this.cambioMonedaService.obtenerTasaDeCambio('COP').toPromise();
      this.datosTasaDeCambio = respuestaTasaDeCambio.conversion_rates[this.codigoMoneda];

      this.informacionMoneda = await this.cambioMonedaService.obtenerInformacionMoneda(this.codigoMoneda).toPromise();
      console.log(this.informacionMoneda);

    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  convertirPresupuesto(): void {

    let presupuesto = this.presupuestoEnPesos;
    presupuesto = presupuesto.replace(/\./g, '').replace(/,/g, '.');
    presupuesto = parseFloat(presupuesto);

    let presupuestoMonedaLocal = presupuesto * this.datosTasaDeCambio;

    this.presupuestoConvertido = presupuestoMonedaLocal.toLocaleString('de-DE', {minimumFractionDigits: 2})

  }

}
