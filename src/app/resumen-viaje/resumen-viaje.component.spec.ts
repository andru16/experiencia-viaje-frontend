import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenViajeComponent } from './resumen-viaje.component';

describe('ResumenViajeComponent', () => {
  let component: ResumenViajeComponent;
  let fixture: ComponentFixture<ResumenViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenViajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
