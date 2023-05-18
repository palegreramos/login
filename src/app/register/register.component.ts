import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../model';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  usuariosiniciales!: Usuarios[];
  usuariosactuales$!: Observable<Usuarios[]>;

  constructor(private servicioService: ServicioService) {
    this.servicioService
      .getDatos()
      .subscribe((datosquevienen) => (this.usuariosiniciales = datosquevienen));
    this.usuariosactuales$ = this.servicioService.getDatos();
  }
  procesa(datos: Observable<Usuarios[]>) {
    console.log(datos);
    this.usuariosactuales$ = datos;
  }
}
