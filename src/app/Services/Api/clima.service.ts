import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValidadorPasosService } from '../validador-pasos.service';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {


  private API_KEY = '0e8e69e0b1e2f98d010e96e7b0014a50';
  private API_URL = 'http://api.openweathermap.org/data/2.5/weather?q=';

  constructor
  (
    private http: HttpClient,
  ) { }

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.API_URL}${city}&units=metric&appid=${this.API_KEY}`);
  }

}
