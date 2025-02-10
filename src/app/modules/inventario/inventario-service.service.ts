import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, of } from 'rxjs';

const httpOptions = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`  // Asegúrate de enviar el token en el formato correcto
  })
});
@Injectable({
  providedIn: 'root'
})


export class InventarioServiceService {

   apiInventario = `${environment.URL_SERVICIOS}/productoAlmacen`;
   constructor(private http: HttpClient) { }

   public getInventarioAll(): Observable<any> {
    const token = sessionStorage.getItem('token');
    console.log('Token usado:', token);
    if (token) {
      return this.http.get<any>(this.apiInventario, httpOptions(token));
    } else {
     return of()
    }
  }


  crearAjuste(ajusteData:any): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.post<any>(this.apiInventario, ajusteData, httpOptions(token));
    } else {
      return of(ajusteData);
    }
  }
    
}
