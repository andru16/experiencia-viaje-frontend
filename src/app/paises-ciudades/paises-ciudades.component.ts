import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import axios from 'axios';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ValidadorPasosService } from '../Services/validador-pasos.service';


@Component({
  selector: 'app-paises-ciudades',
  standalone: true,
  imports: [ NgSelectModule, HttpClientModule, FormsModule],
  templateUrl: './paises-ciudades.component.html',
  styleUrl: './paises-ciudades.component.css'
})
export class PaisesCiudadesComponent implements OnInit, OnChanges{

  paises: any[] = [];
  paisSeleccionado !: '';

  ciudades: any[] = [];
  ciudadSeleccionada !: '';

  constructor(private http: HttpClient, private validadorPasos: ValidadorPasosService) {}

  ngOnInit() {
    this.validadorPasos.pasoActualData.subscribe();

    // Cargar los paisis inicialmente
    this.obtenerPaises('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paisSeleccionado']) {
      this.obtenerCiudades(this.paisSeleccionado);
    }


  }

  obtenerPaises(query: string) {

    axios.get<any[]>('http://127.0.0.1:8000/api/paises/obtener')
    .then(response => {
      this.paises = response.data;

    })
    .catch(error => {
      console.log('Error');
    })

  }

  obtenerCiudades(pais: string){
    this.ciudadSeleccionada = '';

    axios.get<any[]>(`http://127.0.0.1:8000/api/ciudades/obtener/${pais}`)
    .then(response => {
      this.ciudades = response.data;
    })
    .catch(error => {
      console.log('Error');
    })

  }

  actualizarDatosPaso(){
    let pais = this.paises.find(pais => pais.id == this.paisSeleccionado);
    let ciudad = this.ciudades.find(ciudad => ciudad.id == this.ciudadSeleccionada)
    this.validadorPasos.actualizarDataPasos(
      'paso1',
      !!this.paisSeleccionado && !!this.ciudadSeleccionada,
      {
        pais: pais,
        ciudad: ciudad
      })
  }


}
