import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from './usuarios';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  url: string = 'http://localhost/apps/login/server/';

  constructor(private http: HttpClient) {}

  getDatos(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.url}leer.php`);
  }

  postDatos(datos:Usuarios): Observable<Usuarios[]> {
    return this.http.post<Usuarios[]>(`${this.url}insertar.php`,datos);
  }
}
