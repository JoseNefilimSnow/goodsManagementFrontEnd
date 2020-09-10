import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from '../utils/utils.service';
import { Observable, throwError } from 'rxjs';
import { Supplier } from '../dtos/supplier';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {


  url = environment.url;
  header: HttpHeaders = new HttpHeaders({
    Authorization: 'Basic ' + localStorage.getItem("authToken")
  });;
  constructor(private http: HttpClient, private utils: UtilsService) { }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.url + "supplier", { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getSupplier(id): Observable<Supplier> {
    return this.http.get<Supplier>(this.url + "supplier/" + id, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createSupplier(supplier) {
    return this.http.post<Supplier>(this.url + "supplier", supplier, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateSupplier(id, supplier) {
    return this.http.put<Supplier>(this.url + "supplier/" + id, supplier, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteSupplier(id) {
    return this.http.delete(this.url + "supplier/" + id, { headers: this.header }).pipe(
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
