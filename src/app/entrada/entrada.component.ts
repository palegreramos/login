import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudades } from '../model';
import { ServicioService } from '../servicio.service';
@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss'],
})
export class EntradaComponent {
  email: string | null;
  ciudadForm!: any;
  ciudades$!: Observable<Ciudades[]>;
  repetida: boolean = false;

  constructor(private servicioService: ServicioService) {
    this.email = sessionStorage.getItem('usuario');
    this.ciudades$ = this.servicioService.getCiudades();
  }

  crear(ciudadForm: any) {
    this.servicioService
      .postCiudad(ciudadForm.value)
      .subscribe(() => (this.ciudades$ = this.servicioService.getCiudades()));
  }

  comprobar(ciudadForm: any) {
    this.servicioService.getCiudad(ciudadForm.value).subscribe((data) => {
      if (Object.entries(data).length === 0) {
        this.repetida = false;
      } else {
        this.repetida = true;
      }
    });
  }
}
