import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidadorPasosService {

  private datosPasos = new BehaviorSubject<{
    [key: string]: { completado: boolean, data: any } }>
    ({
      paso1: {completado: false, data:null},

  })

  pasoActualData = this.datosPasos.asObservable();

  constructor() { }

  actualizarDataPasos(paso: string, completado: boolean, data: any){
    let dataPaso = this.datosPasos.value;
    dataPaso[paso] = {completado, data};

    this.datosPasos.next(dataPaso)
  }

  obtenerCiudad() {
    const datosActuales = this.datosPasos.value;
    let ciudad: string = '';

    for (let paso in datosActuales) {

      ciudad = datosActuales[paso].data.ciudad.nombre;

    }

    return ciudad;
  }

  obtenerDatos(){
    return this.datosPasos.value
  }
}
