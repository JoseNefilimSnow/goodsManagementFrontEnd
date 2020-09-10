import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from '../utils/utils.service';
import { Observable, throwError } from 'rxjs';
import { Report } from '../dtos/report';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  url = environment.url;
  header: HttpHeaders = new HttpHeaders({
    Authorization: 'Basic ' + localStorage.getItem("authToken")
  });;
  constructor(private http: HttpClient, private utils: UtilsService) { }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.url + "report", { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getReport(id): Observable<Report> {
    return this.http.get<Report>(this.url + "report/" + id, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createReport(report) {
    return this.http.post<Report>(this.url + "report", report, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateReport(id, report) {
    return this.http.put<Report>(this.url + "report/" + id, report, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteReport(id) {
    return this.http.delete(this.url + "report/" + id, { headers: this.header }).pipe(
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
