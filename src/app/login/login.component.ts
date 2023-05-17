import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios } from '../model';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  newloginForm!: FormGroup;
  newlogin!: Usuarios;
  entrada: boolean = false;
  fallo: boolean = false;
  constructor(
    private servicioService: ServicioService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.newloginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.newloginForm.get('email');
  }

  get password() {
    return this.newloginForm.get('password');
  }
  entradalogin() {
    this.newlogin = this.newloginForm.value;
    this.servicioService.login(this.newlogin).subscribe((data) => {
      console.log(data);
      if (data.length > 0) {
        sessionStorage.setItem('usuario', data[0].email);
        this.router.navigateByUrl('entrada');
      } else {
        this.fallo = true;
      }
    });
  }
}
