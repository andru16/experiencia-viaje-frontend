import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HistorialBusquedaService {

  private apiUrl = 'http://127.0.0.1:8000/api/historial-busqueda';
  datos: any;


  constructor() { }


  async registrarDato(id_pais: number, id_ciudad: number, presupuesto:any){
    axios.post(`${this.apiUrl}/registrar-busqueda`, {
      id_pais: id_pais,
      id_ciudad: id_ciudad,
      presupuesto: presupuesto
    })
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);

    })
  }

  // Método para consultar datos
  async consultarDatos() {
    return axios.get(`${this.apiUrl}/listar-historial`,)
      .then( res => {
        this.datos = res.data;
        return this.datos; // Devuelve los datos aquí
      })
      .catch( err => {
          console.log('error', err)
      })
  }
}
