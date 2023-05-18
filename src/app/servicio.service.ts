import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudades, Usuarios } from './model';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  url: string = 'http://localhost/apps/login/server/';

  constructor(private http: HttpClient) {}

  getDatos(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.url}leer.php`);
  }

  postDatos(datos: Usuarios): Observable<Usuarios[]> {
    return this.http.post<Usuarios[]>(`${this.url}insertar.php`, datos);
  }

  login(user: Usuarios): Observable<Usuarios[]> {
    return this.http.post<Usuarios[]>(`${this.url}login.php`, user);
  }

  postCiudad(ciudad: Ciudades): Observable<Ciudades> {
    console.log(ciudad);
    return this.http.post<Ciudades>(`${this.url}insertarciudad.php`, ciudad);
  }
  getCiudad(ciudad: Ciudades): Observable<Ciudades> {
    
    return this.http.post<Ciudades>(`${this.url}leerciudad.php`, {
      ciudad: ciudad.ciudad,
    });
  }
  getCiudades(): Observable<Ciudades[]> {
    return this.http.get<Ciudades[]>(`${this.url}leerciudades.php`);
  }
}
