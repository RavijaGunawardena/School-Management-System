import { Subject } from './../models/Subject';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllSubjectsService {

  private url = "http://localhost:3200/tbsubjects";
 
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
 
  constructor(private http: HttpClient) { }
  
  fetchAll(): Observable<Subject[]>{
    return this.http.get<Subject[]>(this.url, { responseType: "json"})
    .pipe(tap((_) => console.log ('Fetched All Subjects')));
  } }
 