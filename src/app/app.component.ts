import { Component} from '@angular/core';
import { Usuarios } from './usuarios';
import { ServicioService } from './servicio.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login';
  usuariosiniciales!:Usuarios[];
  usuariosactuales$!: Observable<Usuarios[]>;

  constructor(private servicioService: ServicioService) {
    servicioService.getDatos().subscribe(datosquevienen=>this.usuariosiniciales=datosquevienen);
    this.usuariosactuales$=servicioService.getDatos();
  }
  procesa(datos: Observable<Usuarios[]>) {
    this.usuariosactuales$=datos;
  }
}
