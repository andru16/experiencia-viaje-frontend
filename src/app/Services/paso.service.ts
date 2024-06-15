import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasoService {
  private pasoSource = new BehaviorSubject(1);
  pasoActual = this.pasoSource.asObservable();

  // Variable de control para saber si el usuario ha hecho clic en el botón
  private userClicked = false;

  constructor() { }

  incrementarPaso() {
  // Solo incrementamos el paso si el usuario ha hecho clic en el botón
  if (this.userClicked) {
    let siguientePaso = this.pasoSource.value + 1;
    if (siguientePaso > 3) {
        siguientePaso = 1;
    }
    this.pasoSource.next(siguientePaso);
    this.userClicked = false; // Reseteamos la variable de control
    return siguientePaso;
  }
  // Si el usuario no ha hecho clic en el botón, devolvemos el paso actual
  return this.pasoSource.value;
  }

  decrementarPaso() {
    // Solo decrementamos el paso si el usuario ha hecho clic en el botón
    if (this.userClicked) {
      let pasoAnterior = this.pasoSource.value - 1;
      this.pasoSource.next(pasoAnterior);
      this.userClicked = false; // Reseteamos la variable de control
      return pasoAnterior;
    }
    // Si el usuario no ha hecho clic en el botón, devolvemos el paso actual
    return this.pasoSource.value;
  }


  getPasoActual() {
    return this.pasoSource.value;
  }

  // Método para indicar que el usuario ha hecho clic en el botón
  userHasClicked() {
    this.userClicked = true;
  }
}
