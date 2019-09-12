import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user/user.model';
import { UserResponse } from 'src/app/models/user/user.response';
import { baseUrl } from 'src/app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private LOGGED_USER_KEY = 'currentUser';

  public loggedUser: User;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let url = baseUrl + '/Session/login';

    let body = {
      Username: username,
      Password: password, 
    };
    
    return this.http.post<UserResponse>(url, body, this.httpOptions)    
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  // Error handling
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

  setUserLoggedIn(user: User) {
    this.loggedUser = user;
    localStorage.setItem(this.LOGGED_USER_KEY, JSON.stringify(user));
  }

  getUserLoggedIn() {
    this.loggedUser = JSON.parse(localStorage.getItem(this.LOGGED_USER_KEY));
    return this.loggedUser;
  }
}