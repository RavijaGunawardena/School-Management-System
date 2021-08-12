import { Subject } from '../models/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// import { ErrorHandlerService } from './error-handler.service';

@Injectable({ 
  providedIn: 'root'
})
export class SubjectService {

  // subjectName: Partial<Subject>

  private url = "http://localhost:3000/subject";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) { }

  fetchAll(): Observable<Subject[]>{ 
    console.log ("Came to fetch")
    return this.http.get<Subject[]>(this.url, { responseType: "json"})  
    .pipe(tap((_) => console.log ('Fetched Subjects')));

     
  }  
   
  post(subName: Partial<Subject>): Observable<any> {
    console.log ("Came", subName)
    console.log (this.url, subName, this.httpOptions)
    return this.http
      .post<Partial<Subject>>(this.url, subName, this.httpOptions)
        .pipe(tap(() => console.log ('Over now')));
        
  }  

  delete(subjectId: number): Observable<any> {
    const url = `http://localhost:3000/subject/${subjectId}`;
    console.log ("Came to delete SS", subjectId);
    console.log ("Came to delete URL", url);
    return this.http
      .delete<Subject>(url, this.httpOptions)
      // .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }
 
}