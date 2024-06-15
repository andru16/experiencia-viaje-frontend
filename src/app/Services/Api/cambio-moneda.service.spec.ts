import { TestBed } from '@angular/core/testing';

import { CambioMonedaService } from './cambio-moneda.service';

describe('CambioMonedaService', () => {
  let service: CambioMonedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioMonedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
