import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from '../utils/utils.service';
import { Observable, throwError } from 'rxjs';
import { User } from '../dtos/user';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  url = environment.url;
  header: HttpHeaders = new HttpHeaders({
    Authorization: 'Basic ' + localStorage.getItem("authToken")
  });;
  constructor(private http: HttpClient, private utils: UtilsService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "user", { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.url + "user/" + id, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  createUser(user) {
    return this.http.post<User>(this.url + "user", user, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  updateUser(id, user) {
    return this.http.put<User>(this.url + "user/" + id, user, { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteUser(id) {
    return this.http.delete(this.url + "user/" + id, { headers: this.header }).pipe(
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
