import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisesCiudadesComponent } from './paises-ciudades.component';

describe('PaisesCiudadesComponent', () => {
  let component: PaisesCiudadesComponent;
  let fixture: ComponentFixture<PaisesCiudadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisesCiudadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaisesCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
