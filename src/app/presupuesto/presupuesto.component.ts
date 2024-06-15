import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import AutoNumeric from 'autonumeric';
import { ValidadorPasosService } from '../Services/validador-pasos.service';
import { fromEvent } from 'rxjs';
import { PresupuestoService } from '../Services/presupuesto.service';

@Component({
  selector: 'app-presupuesto',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="presupuesto" #presupuesto [(ngModel)]="presupuestoViaje" (input)="onInput()">
      <label for="presupuesto">Presupuesto</label>
    </div>
  `,
  styles: ``
})
export class PresupuestoComponent implements AfterViewInit {

  @ViewChild('presupuesto') presupuesto!: ElementRef;
  presupuestoViaje: string = ''

  constructor
  (
    private presupuestoService: PresupuestoService,
  ){}

  ngAfterViewInit(){
    new AutoNumeric(this.presupuesto.nativeElement, {
      decimalCharacter : ',',
      digitGroupSeparator : '.',
      modifyValueOnWheel: false,
      emptyInputBehavior: '0',
      decimalPlaces: 2
    });
  }


  onInput() {
    this.presupuestoService.setPresupuesto(this.presupuestoViaje);
  }

}
