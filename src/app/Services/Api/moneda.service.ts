import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  private apiKey = 'TU_API_KEY';
  private url = `https://openexchangerates.org/api/currencies.json?app_id=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  // obtenerCodigoMonedaPorNombre(nombre: string): Observable<string> {
  //   return this.http.get<{ [key: string]: string }>(this.url).pipe(
  //     map((data: { [key: string]: string }) => {
  //       // Mapear nombres de países a códigos de moneda
  //       const codigosCiudadMap= {
  //         'Dinamarca': 'DKK',
  //         'Inglaterra': 'GBP',
  //         'India': 'INR',
  //         'Japón': 'JPY'
  //       };

  //       // const code = codigosCiudadMap[nombre];
  //       // return code ? code : 'Código de moneda no encontrado';
  //     })
  //   );
  // }

}
