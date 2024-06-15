import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BotonesNavegacionComponent } from './botones-navegacion/botones-navegacion.component';
import { PasoService } from './Services/paso.service';
import { RouteService } from './Services/route.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BotonesNavegacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pasoActual: number = 0;

  constructor
  (
    private pasosService:PasoService,
    private router:Router,
    private routeService: RouteService
  ){}

  ngOnInit(): void {

    this.pasosService.pasoActual.subscribe(paso => {
      this.pasoActual = paso;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateButtonVisibility();
      }
    });
  }

  historialBusqueda(){
    this.router.navigate(['paises-ciudades/historial-busquedas']);
  }

  updateButtonVisibility(): void {
    const isVisible =!this.isCurrentRouteBlocked();
  }


  isCurrentRouteBlocked(): boolean {
    const currentUrl = this.routeService.getCurrentUrl();
    // Define las rutas que quieres bloquear
    const blockedRoutes = ['/paises-ciudades/historial-busquedas'];
    return blockedRoutes.includes(currentUrl);
  }


}
