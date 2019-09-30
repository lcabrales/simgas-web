import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { baseUrl } from 'src/app/common/constants';
import { SensorListResponse } from 'src/app/models/sensor/sensor.list.response';
import { DailyAverageResponse } from 'src/app/models/daily-average/daily-average.response';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAll() {
    let url = `${baseUrl}/Sensor`;
    
    return this.http.get<SensorListResponse>(url, this.httpOptions)    
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getSensor(sensorId: string) {
    let url = `${baseUrl}/Sensor?SensorId=${sensorId}`;
    
    return this.http.get<SensorListResponse>(url, this.httpOptions)    
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getDailyAverageData(sensorId: string) {
    let url = `${baseUrl}/SensorReading/Daily/SensorId/${sensorId}`;
    
    return this.http.get<DailyAverageResponse>(url, this.httpOptions)    
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
