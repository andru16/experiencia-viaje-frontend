import { Component } from '@angular/core';
import { ClimaService } from '../Services/Api/clima.service';
import { ValidadorPasosService } from '../Services/validador-pasos.service';

@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [],
  template: `

  <div class="d-flex" >
    <div>
      <p class="fw-bold fs-3" style="line-height: 16px;">{{ datosPaso1.paso1.data.pais.nombre }},</p>
      <p class="fw-bold fs-3" style="line-height: 2px;">{{ datosPaso1.paso1.data.ciudad.nombre }}</p>
      <p class="fw-semibold fs-6">{{ datos.main.temp }}°C</p>
    </div>

    <!-- Aquí está el separador vertical -->
    <div style="border-left:1px solid black;height:80px; margin-left: 20px; margin-right: 20px;"></div>

    <div class="mr-5">
      <p style="line-height: 2px;">Humedad: <strong>{{ datos.main.humidity }} </strong></p>
      <p style="line-height: 2px;">Viento: <strong>{{ datos.wind.speed }}</strong></p>
      <p style="line-height: 2px;">Visibilidad: <strong>{{ datos.visibility }}</strong></p>
      <p style="line-height: 2px;">{{ datos.weather[0].description }}</p>
    </div>
  </div>



  `,
  styles: ``
})
export class ClimaComponent {
  datos: any;
  datosPaso1: any;

  constructor
  (
    private climaService: ClimaService,
    private informacion: ValidadorPasosService
  ) { }

  ngOnInit(): void {

    let ciudad  = this.informacion.obtenerCiudad();

    this.climaService.getWeather(ciudad).subscribe(data => {
      this.datos = data;
    });

    this.datosPaso1 = this.informacion.obtenerDatos();


  }
}
