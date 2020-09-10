import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../dtos/user';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilsService } from '../utils/utils.service';
import { environment } from '../../environments/environment';
import { Product } from '../dtos/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.url;
  header: HttpHeaders = new HttpHeaders({
    Authorization: 'Basic ' + localStorage.getItem("authToken")
  });;
  constructor(private http: HttpClient, private utils: UtilsService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + "product", { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getProduct(id): Observable<Product> {
    return this.http.get<Product>(this.url + "product/" + id, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createProduct(product) {
    return this.http.post<Product>(this.url + "product", product, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateProduct(id, product) {
    return this.http.put<Product>(this.url + "product/" + id, product, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteProduct(id) {
    return this.http.delete(this.url + "product/" + id, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Error del Front
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error desde el Back
      errorMessage = `||Codigo de Error: ${error.status}\n||Mensaje: ${error.message}`;
    }
    this.utils.presentAlert(
      'Error',
      error.message,
      [{ text: "Entendido" }]
    );
    return throwError(errorMessage);
  }
}
