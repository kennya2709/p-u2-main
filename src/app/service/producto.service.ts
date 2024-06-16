import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = "http://localhost:5000/api/product"; // backend

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  addProduct(product: any): Observable<Producto> {
    return this.http.post<Producto>(this.url, product);
  }

  editProduct(product: any): Observable<Producto> {
    return this.http.patch<Producto>(this.url, product);
  }

  delete(id: string): Observable<Producto> {
    return this.http.delete<Producto>(`${this.url}/${id}`);
  }
}
