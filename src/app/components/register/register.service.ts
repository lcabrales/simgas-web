import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user/user.model';
import { UserResponse } from 'src/app/models/user/user.response';
import { baseUrl } from 'src/app/common/constants';
import { RegisterRequest } from 'src/app/models/register/register.request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  register(request: RegisterRequest) {
    let url = baseUrl + '/User';

    let body = request;
    
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
    return throwError(errorMessage);
 }
}
