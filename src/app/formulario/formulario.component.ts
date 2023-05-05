import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServicioService } from '../servicio.service';
import { Usuarios } from '../usuarios';
import { ValidateCustom } from './passwordMatch.validator';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  newloginForm!: FormGroup;
  newlogin!: Usuarios;
  @Output()
  propagar = new EventEmitter<any>();

  constructor(
    private servicioService: ServicioService,
    private fb: FormBuilder
  ) {
    this.newloginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repite: ['',[Validators.required]]
    },
    {
      validators: ValidateCustom.passwordMatchValidator('password', 'repite')
    });
  }

  get email() {
    return this.newloginForm.get('email');
  }

  get password() {
    return this.newloginForm.get('password');
  }

  get repite() {
    return this.newloginForm.get('repite');
  }


  entradalogin() {
    if (this.newloginForm.invalid) {
      console.log(this.newloginForm.status);
    } else {
      this.newlogin = this.newloginForm.value;
      this.servicioService.postDatos(this.newlogin)
      .subscribe(() => (this.propagar.emit(this.servicioService.getDatos())));
    }
  }
}
