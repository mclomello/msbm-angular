import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = "http://localhost:3001/products"

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 8000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  fetch(): Observable<Product[]> {
    return this.http.get<Product[]>
      (this.baseUrl)
  }

  fetchById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>
      (url)
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>
      (this.baseUrl, product)
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>
      (url, product)
  }

  delete(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.delete<Product>
      (url)
  }
}
