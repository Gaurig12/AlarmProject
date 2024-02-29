// alarm.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Alarm } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  private apiUrl = 'http://localhost:3000/readData';

  constructor(private http: HttpClient) { }

  getAlarms(): Observable<Alarm[]> {
    return this.http.get<Alarm[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error getting alarms:', error);
        return throwError(error);
      })
    );
  }

  getAlarmById(id: number): Observable<Alarm> {
    return this.http.get<Alarm>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error getting alarm with id ${id}:`, error);
        return throwError(error);
      })
    );
  }

  addAlarm(alarm: Alarm): Observable<Alarm> {
    return this.http.post<Alarm>(this.apiUrl, alarm).pipe(
      catchError(error => {
        console.error('Error creating alarm:', error);
        return throwError(error);
      })
    );
  }

  updateAlarm(alarm: Alarm): Observable<Alarm> {
    return this.http.put<Alarm>(`${this.apiUrl}/${alarm.id}`, alarm).pipe(
      catchError(error => {
        console.error(`Error updating alarm with id ${alarm.id}:`, error);
        return throwError(error);
      })
    );
  }


  deleteAlarm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting alarm with id ${id}:`, error);
        return throwError(error);
      })
    );
  }
}