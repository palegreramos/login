import { Component } from '@angular/core';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss']
})
export class EntradaComponent {
email:string|null;

constructor() {
  this.email=sessionStorage.getItem('usuario');
}
}
