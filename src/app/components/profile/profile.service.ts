import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UserResponse } from 'src/app/models/user/user.response';
import { baseUrl } from 'src/app/common/constants';
import { ProfileRequest } from 'src/app/models/profile/profile.request';
import { UserListResponse } from 'src/app/models/user/user.list.response';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  get(userId: string) {
    let url = `${baseUrl}/User?UserId=${userId}`;
    
    return this.http.get<UserListResponse>(url, this.httpOptions)    
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  update(request: ProfileRequest) {
    let url = baseUrl + '/User';

    let body = request;
    
    return this.http.put<UserResponse>(url, body, this.httpOptions)    
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
