import { Student } from './../models/Student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'   
})
export class StudentServicesService {

  private url = "http://localhost:3000/student";
 
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
 
  constructor(private errorHandlerService: ErrorHandlerService, private http: HttpClient) { }
  
  fetchAll(): Observable<Student[]>{
    return this.http.get<Student[]>(this.url, { responseType: "json"})
    .pipe(tap((_) => console.log ('Fetched Students')));
    // catchError (
    //   this.errorHandlerService.handleError<Student[]>("FeatchALL", [])
    // )
  } 
 
  post(sname: Partial<Student>): Observable<any> {
    console.log 
    return this.http
      .post<Partial<Student>>(this.url, sname, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  } 
  
  update(sn: Student): Observable<any> {
    return this.http
      .put<Student>(this.url, sn, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }
 
  delete(studentId: number): Observable<any> {
    const url = `http://localhost:3000/student/${studentId}`;

    return this.http
      .delete<Student>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}