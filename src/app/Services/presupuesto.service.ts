import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  private presupuestoSubject = new BehaviorSubject<string>('');
  presupuesto$ = this.presupuestoSubject.asObservable();

  setPresupuesto(presupuesto: string) {
    this.presupuestoSubject.next(presupuesto);
    console.log(presupuesto);

  }

  getPresupuesto(): string {
    return this.presupuestoSubject.value;
  }


}
