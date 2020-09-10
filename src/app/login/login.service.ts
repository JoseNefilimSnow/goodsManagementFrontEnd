import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../dtos/user';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilsService } from '../utils/utils.service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  route = environment.url;
  header: HttpHeaders;
  constructor(private http: HttpClient, private utils: UtilsService) { }

  logIn(username, password) {
    this.header = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ":" + password), username: username
    });
    return this.http.get<User>(this.route + "login", { headers: this.header }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  setTokens(id, username, password, permission) {
    localStorage.setItem("authToken", btoa(username + ":" + password))
    localStorage.setItem("currentUserToken", JSON.stringify({ id: id, username: username, permission: permission }));

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
    switch (error.status) {
      case 0: {
        this.utils.presentAlert(
          'Error',
          'Ha ocurrido un fallo con la conexion al servidor',
          [{ text: "Entendido" }]
        );
        break;
      }
      case 401: {
        this.utils.presentAlert(
          'Error',
          'Los datos no corresponden a ningún usuario',
          [{ text: "Entendido" }]
        );
      }
    }
    return throwError(errorMessage);
  }


}
