import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CambioMonedaService {

  private apiUrl = 'http://127.0.0.1:8000/api'; // Ajusta esto según la configuración de tu proxy o entorno de producción

  constructor(private http: HttpClient) { }

  obtenerTasaDeCambio(baseCurrency: string): Observable<any> {
    const url = `${this.apiUrl}/tasa-de-cambio/${baseCurrency}`;
    return this.http.get(url);
  }

  obtenerInformacionMoneda(code: string): Observable<any> {
    const url = `${this.apiUrl}/informacion-moneda/${code}`;
    return this.http.get(url);
  }
}
