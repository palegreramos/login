import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Usuarios } from '../model';
import { ServicioService } from '../servicio.service';
import { ValidateCustom } from './passwordMatch.validator';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  newregisterForm!: FormGroup;
  newregister!: Usuarios;
  resultado!: object;
  @Output()
  propagar = new EventEmitter<Observable<Usuarios[]>>();

  constructor(
    private servicioService: ServicioService,
    private fb: FormBuilder
  ) {
    this.newregisterForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(16),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
        repite: ['', [Validators.required]],
      },
      {
        validators: ValidateCustom.passwordMatchValidator('password', 'repite'),
      }
    );
  }

  get email() {
    return this.newregisterForm.get('email');
  }

  get password() {
    return this.newregisterForm.get('password');
  }

  get repite() {
    return this.newregisterForm.get('repite');
  }

  entradaregister() {
    if (this.newregisterForm.invalid) {
      console.log(this.newregisterForm.status);
    } else {
      this.newregister = this.newregisterForm.value;
      this.servicioService.postDatos(this.newregister).subscribe({
        next: (res) => (this.resultado = res),
        error: (err) => console.log('error', err),
        complete: () => this.propagar.emit(this.servicioService.getDatos()),
      });
    }
  }
}
