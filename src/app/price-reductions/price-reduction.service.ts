import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from '../utils/utils.service';
import { Observable, throwError } from 'rxjs';
import { PriceReduction } from '../dtos/price-reduction';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceReductionService {


  url = environment.url;
  header: HttpHeaders = new HttpHeaders({
    Authorization: 'Basic ' + localStorage.getItem("authToken")
  });;
  constructor(private http: HttpClient, private utils: UtilsService) { }

  getPriceReductions(): Observable<PriceReduction[]> {
    return this.http.get<PriceReduction[]>(this.url + "priceReduction", { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getPriceReduction(id): Observable<PriceReduction> {
    return this.http.get<PriceReduction>(this.url + "priceReduction/" + id, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createPriceReduction(priceReduction) {
    return this.http.post<PriceReduction>(this.url + "priceReduction", priceReduction, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }
  checkDates(priceReductions) {
    return this.http.post<PriceReduction>(this.url + "checkDates", priceReductions, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updatePriceReduction(id, priceReduction) {
    return this.http.put<PriceReduction>(this.url + "priceReduction/" + id, priceReduction, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deletePriceReduction(id) {
    return this.http.delete(this.url + "priceReduction/" + id, { headers: this.header }).pipe(
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
