import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentServicesService } from '../services/student-services.service';
import { Student } from '../models/Student';
import { catchError, tap } from 'rxjs/operators';
import {  Router } from '@angular/router';

 
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
  details$: Observable<Student[]>;

  constructor(private studentService: StudentServicesService,
              private _router: Router) { }

  toSubjectPage(studentName: string, studentId: number): void{
    // this._router.navigate(['/subject', this.student.studentId], {
    //   queryParams: { 'searchTerm': this.}
    console.log(studentId);
    this._router.navigate(['/subjects'], { state: { stName: studentName, stId: studentId } })
  }            

  ngOnInit(): void {
    this.details$ = this.studentService.fetchAll();
    console.log("Ng is 2", this.details$);
  }

  // this.getData("url").subscribe(Response => { console.log(Response)})

  fetchAll(): Observable<Student[]> { 
    return this.studentService.fetchAll();
  }
  

  post(sn: Partial<Student>): void {
    const studentName = (<string>sn).trim();
    if (!studentName) return;
    console.log  (studentName);

    this.details$ = this.studentService 
      .post({ studentName })
      .pipe(tap(() => (this.details$ = this.fetchAll())));
  }

  update(studentId: number, newStudent: Partial<Student>): void {
    const studentName = (<string>newStudent).trim();
    if (!studentName) return;
    console.log (studentName);

    const newSd: Student = {
      studentId,
      studentName, 
    };

    this.details$ = this.studentService
      .update(newSd)
      .pipe(tap(() => (this.details$ = this.fetchAll())));
  }

  delete(studentId: number): void {
    this.details$ = this.studentService
      .delete(studentId)
      .pipe(tap(() => (this.details$ = this.fetchAll())));
  }

}
