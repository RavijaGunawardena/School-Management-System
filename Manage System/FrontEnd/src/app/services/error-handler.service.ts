import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError<T>(operations = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log ('${operation} failed:');
      return of (result as T);
    }
  }
}

